import { isAuthenticated, getCurrentUser } from '../auth.js';
import { userAPI, recommendationsAPI } from '../api.js';
import { navigate } from '../router.js';

export async function renderDashboard() {
  const container = document.getElementById('page-container');
  if (!container) return;
  
  if (!isAuthenticated()) {
    navigate('/login');
    return;
  }
  
  // Load CSS
  if (!document.querySelector('link[href*="dashboard.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/dashboard.css';
    document.head.appendChild(link);
  }
  
  if (!document.querySelector('link[href*="browse.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/browse.css';
    document.head.appendChild(link);
  }
  
  container.innerHTML = '<div class="spinner"></div>';
  
  try {
    const [progress, recommendationsData] = await Promise.all([
      userAPI.getProgress(),
      recommendationsAPI.getRecommendations()
    ]);
    
    const user = getCurrentUser();
    const recommendations = recommendationsData.recommendations || [];
    const goals = user?.goals || [];
    
    container.innerHTML = `
      <div class="dashboard">
        <div class="container">
          <h1 class="page-title">My Dashboard</h1>
          <p class="dashboard-subtitle">Welcome back, ${user?.username || 'User'}!</p>

          <div class="dashboard-stats">
            <div class="stat-card">
              <div class="stat-icon">✅</div>
              <div class="stat-content">
                <h3>${progress?.totalCompleted || 0}</h3>
                <p>Asanas Completed</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⏱️</div>
              <div class="stat-content">
                <h3>${Math.round((progress?.totalDuration || 0) / 60)}</h3>
                <p>Minutes Practiced</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">📊</div>
              <div class="stat-content">
                <h3>${Object.keys(progress?.byCategory || {}).length}</h3>
                <p>Categories Explored</p>
              </div>
            </div>
          </div>

          <div class="dashboard-section">
            <div class="section-header">
              <h2>Your Goals</h2>
              <button id="edit-goals-btn" class="btn btn-outline btn-small">Edit Goals</button>
            </div>
            
            <div id="goals-display">
              ${goals.length > 0 ? goals.map(goal => {
                const goalInfo = getGoalInfo(goal);
                return goalInfo ? `<span class="goal-badge">${goalInfo.icon} ${goalInfo.label}</span>` : '';
              }).join('') : '<p class="no-goals">No goals set. Click "Edit Goals" to add some!</p>'}
            </div>
            
            <div id="goals-selector" style="display: none;">
              ${getAllGoals().map(goal => `
                <button class="goal-button ${goals.includes(goal.value) ? 'active' : ''}" 
                        data-goal="${goal.value}">
                  <span class="goal-icon">${goal.icon}</span>
                  <span>${goal.label}</span>
                </button>
              `).join('')}
            </div>
          </div>

          ${recommendations.length > 0 ? `
            <div class="dashboard-section">
              <h2>✨ Personalized Recommendations</h2>
              <p class="section-description">
                Based on your goals: ${goals.length > 0 ? goals.join(', ') : 'all goals'}
              </p>
              <div class="recommendations-grid">
                ${recommendations.map(asana => createAsanaCard(asana)).join('')}
              </div>
            </div>
          ` : ''}

          ${progress?.completedAsanas && progress.completedAsanas.length > 0 ? `
            <div class="dashboard-section">
              <h2>Recently Completed</h2>
              <div class="completed-list">
                ${progress.completedAsanas.slice(0, 5).map(item => {
                  if (item.asanaId) {
                    return `
                      <div class="completed-item">
                        <a href="/asana/${item.asanaId._id}" class="completed-link" data-link>
                          <span class="completed-name">${item.asanaId.name}</span>
                          <span class="completed-date">${new Date(item.completedAt).toLocaleDateString()}</span>
                        </a>
                      </div>
                    `;
                  }
                  return '<div class="completed-item">Asana removed</div>';
                }).join('')}
              </div>
              ${progress.completedAsanas.length > 5 ? `
                <a href="/browse" class="view-all-link" data-link>View All Completed →</a>
              ` : ''}
            </div>
          ` : ''}

          ${progress?.byCategory && Object.keys(progress.byCategory).length > 0 ? `
            <div class="dashboard-section">
              <h2>Progress by Category</h2>
              <div class="category-progress">
                ${Object.entries(progress.byCategory).map(([category, count]) => `
                  <div class="category-item">
                    <span class="category-name">${category}</span>
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: ${(count / progress.totalCompleted) * 100}%"></div>
                    </div>
                    <span class="category-count">${count}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    
    // Add event handlers
    setupGoalHandlers(goals);
  } catch (error) {
    container.innerHTML = `
      <div class="container">
        <div class="error-message">Error loading dashboard: ${error.message}</div>
      </div>
    `;
  }
}

function createAsanaCard(asana) {
  const difficultyClass = asana.difficulty || 'beginner';
  const imageHtml = asana.imageUrl 
    ? `<img src="${asana.imageUrl}" alt="${asana.name}" class="asana-image" />`
    : `<div class="asana-image-placeholder"><span class="placeholder-icon">🧘</span></div>`;
  
  return `
    <a href="/asana/${asana._id}" class="asana-card" data-link>
      <div class="asana-image-container">
        ${imageHtml}
        <div class="difficulty-badge ${difficultyClass}">${asana.difficulty || 'beginner'}</div>
      </div>
      <div class="asana-content">
        <h3 class="asana-name">${asana.name}</h3>
        ${asana.sanskritName ? `<p class="asana-sanskrit">${asana.sanskritName}</p>` : ''}
        <p class="asana-description">${asana.description || ''}</p>
        <div class="asana-tags">
          <span class="category-tag">${asana.category || 'general'}</span>
        </div>
      </div>
    </a>
  `;
}

function getAllGoals() {
  return [
    { value: 'flexibility', label: 'Flexibility', icon: '🤸' },
    { value: 'stress-relief', label: 'Stress Relief', icon: '😌' },
    { value: 'strength', label: 'Strength', icon: '💪' },
    { value: 'balance', label: 'Balance', icon: '⚖️' },
    { value: 'relaxation', label: 'Relaxation', icon: '🧘' }
  ];
}

function getGoalInfo(goalValue) {
  return getAllGoals().find(g => g.value === goalValue);
}

function setupGoalHandlers(currentGoals) {
  const editBtn = document.getElementById('edit-goals-btn');
  const goalsDisplay = document.getElementById('goals-display');
  const goalsSelector = document.getElementById('goals-selector');
  const goalButtons = goalsSelector.querySelectorAll('.goal-button');
  
  let selectedGoals = [...currentGoals];
  
  editBtn.addEventListener('click', () => {
    const isEditing = goalsSelector.style.display !== 'none';
    goalsSelector.style.display = isEditing ? 'none' : 'flex';
    goalsDisplay.style.display = isEditing ? 'flex' : 'none';
    editBtn.textContent = isEditing ? 'Edit Goals' : 'Done';
  });
  
  goalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const goal = btn.dataset.goal;
      if (selectedGoals.includes(goal)) {
        selectedGoals = selectedGoals.filter(g => g !== goal);
        btn.classList.remove('active');
      } else {
        selectedGoals.push(goal);
        btn.classList.add('active');
      }
    });
  });
  
  // Save goals when done
  const originalEditHandler = editBtn.onclick;
  editBtn.addEventListener('click', async () => {
    if (goalsSelector.style.display === 'none') {
      // Saving
      try {
        await userAPI.updateGoals(selectedGoals);
        // Update user in localStorage
        const user = getCurrentUser();
        if (user) {
          user.goals = selectedGoals;
          localStorage.setItem('user', JSON.stringify(user));
        }
        // Reload dashboard
        renderDashboard();
      } catch (error) {
        alert('Failed to update goals: ' + error.message);
      }
    }
  });
}

