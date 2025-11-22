import { asanasAPI } from '../api.js';
import { navigate } from '../router.js';

export async function renderBrowse() {
  const container = document.getElementById('page-container');
  if (!container) return;
  
  // Load CSS
  if (!document.querySelector('link[href*="browse.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/browse.css';
    document.head.appendChild(link);
  }
  
  // Get URL params
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get('category') || 'all';
  const difficulty = urlParams.get('difficulty') || 'all';
  const search = urlParams.get('search') || '';
  
  container.innerHTML = `
    <div class="browse">
      <div class="container">
        <h1 class="page-title">Browse Asanas</h1>
        
        <div class="filters">
          <div class="filter-group">
            <label>Category</label>
            <select id="category-filter" class="filter-select">
              <option value="all" ${category === 'all' ? 'selected' : ''}>All Categories</option>
              <option value="standing" ${category === 'standing' ? 'selected' : ''}>Standing</option>
              <option value="seated" ${category === 'seated' ? 'selected' : ''}>Seated</option>
              <option value="balance" ${category === 'balance' ? 'selected' : ''}>Balance</option>
              <option value="relaxation" ${category === 'relaxation' ? 'selected' : ''}>Relaxation</option>
              <option value="backbend" ${category === 'backbend' ? 'selected' : ''}>Backbend</option>
              <option value="forward-fold" ${category === 'forward-fold' ? 'selected' : ''}>Forward Fold</option>
              <option value="twist" ${category === 'twist' ? 'selected' : ''}>Twist</option>
              <option value="inversion" ${category === 'inversion' ? 'selected' : ''}>Inversion</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Difficulty</label>
            <select id="difficulty-filter" class="filter-select">
              <option value="all" ${difficulty === 'all' ? 'selected' : ''}>All Levels</option>
              <option value="beginner" ${difficulty === 'beginner' ? 'selected' : ''}>Beginner</option>
              <option value="intermediate" ${difficulty === 'intermediate' ? 'selected' : ''}>Intermediate</option>
              <option value="advanced" ${difficulty === 'advanced' ? 'selected' : ''}>Advanced</option>
            </select>
          </div>

          <div class="filter-group search-group">
            <label>Search</label>
            <input
              type="text"
              id="search-input"
              placeholder="Search asanas..."
              value="${search}"
              class="search-input"
            />
          </div>
        </div>

        <div id="asanas-container">
          <div class="spinner"></div>
        </div>
      </div>
    </div>
  `;
  
  // Load asanas
  await loadAsanas();
  
  // Add filter handlers
  document.getElementById('category-filter').addEventListener('change', applyFilters);
  document.getElementById('difficulty-filter').addEventListener('change', applyFilters);
  document.getElementById('search-input').addEventListener('input', debounce(applyFilters, 300));
}

async function loadAsanas() {
  const container = document.getElementById('asanas-container');
  if (!container) return;
  
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const filters = {};
    
    if (urlParams.get('category') && urlParams.get('category') !== 'all') {
      filters.category = urlParams.get('category');
    }
    if (urlParams.get('difficulty') && urlParams.get('difficulty') !== 'all') {
      filters.difficulty = urlParams.get('difficulty');
    }
    if (urlParams.get('search')) {
      filters.search = urlParams.get('search');
    }
    
    const asanas = await asanasAPI.getAll(filters);
    
    if (asanas.length === 0) {
      container.innerHTML = '<div class="no-results"><p>No asanas found. Try adjusting your filters.</p></div>';
      return;
    }
    
    container.innerHTML = `
      <div class="asanas-grid">
        ${asanas.map(asana => createAsanaCard(asana)).join('')}
      </div>
    `;
  } catch (error) {
    container.innerHTML = `<div class="error-message">Error loading asanas: ${error.message}</div>`;
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
          ${asana.benefits && asana.benefits.length > 0 
            ? `<span class="benefits-count">${asana.benefits.length} benefits</span>` 
            : ''}
        </div>
      </div>
    </a>
  `;
}

function applyFilters() {
  const category = document.getElementById('category-filter').value;
  const difficulty = document.getElementById('difficulty-filter').value;
  const search = document.getElementById('search-input').value;
  
  const params = new URLSearchParams();
  if (category !== 'all') params.set('category', category);
  if (difficulty !== 'all') params.set('difficulty', difficulty);
  if (search) params.set('search', search);
  
  const queryString = params.toString();
  navigate(`/browse${queryString ? '?' + queryString : ''}`);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

