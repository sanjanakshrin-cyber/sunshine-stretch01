import { asanasAPI, userAPI } from '../api.js';
import { isAuthenticated } from '../auth.js';
import { navigate } from '../router.js';

export async function renderAsanaDetail(params) {
  const container = document.getElementById('page-container');
  if (!container) return;
  
  const { id } = params;
  if (!id) {
    navigate('/browse');
    return;
  }
  
  // Load CSS
  if (!document.querySelector('link[href*="detail.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/detail.css';
    document.head.appendChild(link);
  }
  
  container.innerHTML = '<div class="spinner"></div>';
  
  try {
    const asana = await asanasAPI.getById(id);
    const authenticated = isAuthenticated();
    
    container.innerHTML = `
      <div class="asana-detail">
        <div class="container">
          <button class="back-button" id="back-btn">← Back</button>

          <div class="asana-detail-content">
            <div class="asana-detail-image">
              ${asana.imageUrl 
                ? `<img src="${asana.imageUrl}" alt="${asana.name}" />`
                : `<div class="image-placeholder-large"><span class="placeholder-icon">🧘</span></div>`
              }
            </div>

            <div class="asana-detail-info">
              <div class="asana-header">
                <h1>${asana.name}</h1>
                ${asana.sanskritName ? `<p class="sanskrit-name">${asana.sanskritName}</p>` : ''}
                <div class="asana-meta">
                  <span class="difficulty-badge detail ${asana.difficulty || 'beginner'}">${asana.difficulty || 'beginner'}</span>
                  <span class="category-badge">${asana.category || 'general'}</span>
                  <span class="duration-badge">Duration: ${asana.duration || 30}s</span>
                </div>
              </div>

              <div class="asana-section">
                <h2>Description</h2>
                <p>${asana.description || ''}</p>
              </div>

              ${asana.benefits && asana.benefits.length > 0 ? `
                <div class="asana-section">
                  <h2>Benefits</h2>
                  <ul class="benefits-list">
                    ${asana.benefits.map(benefit => `<li>✨ ${benefit}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <div class="asana-section">
                <h2>Instructions</h2>
                <ol class="instructions-list">
                  ${asana.instructions ? asana.instructions.map(instruction => `<li>${instruction}</li>`).join('') : ''}
                </ol>
              </div>

              ${authenticated ? `
                <div class="complete-section">
                  <h2>Track Your Practice</h2>
                  <div class="duration-input-group">
                    <label>Practice Duration (minutes):</label>
                    <input
                      type="number"
                      id="duration-input"
                      min="1"
                      max="60"
                      value="30"
                      class="duration-input"
                    />
                  </div>
                  <button id="complete-btn" class="btn btn-primary">Mark as Completed</button>
                </div>
              ` : `
                <div class="auth-prompt">
                  <p>Sign in to track your progress and get personalized recommendations!</p>
                  <a href="/login" class="btn btn-primary" data-link>Sign In</a>
                </div>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Add event handlers
    document.getElementById('back-btn').addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate('/browse');
      }
    });
    
    if (authenticated) {
      document.getElementById('complete-btn').addEventListener('click', () => handleComplete(id));
    }
  } catch (error) {
    container.innerHTML = `
      <div class="container">
        <div class="error-message">Error loading asana: ${error.message}</div>
        <a href="/browse" class="btn btn-primary" data-link>Back to Browse</a>
      </div>
    `;
  }
}

async function handleComplete(asanaId) {
  const duration = parseInt(document.getElementById('duration-input').value) || 0;
  const btn = document.getElementById('complete-btn');
  
  btn.disabled = true;
  btn.textContent = 'Completing...';
  
  try {
    await userAPI.completeAsana(asanaId, duration);
    btn.textContent = '✓ Completed';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-secondary');
    btn.disabled = true;
    alert('Asana marked as completed! 🎉');
  } catch (error) {
    alert('Failed to mark asana as completed: ' + error.message);
    btn.disabled = false;
    btn.textContent = 'Mark as Completed';
  }
}

