import { isAuthenticated, getCurrentUser, logout } from '../auth.js';

export function renderNavbar() {
  const navbarContainer = document.getElementById('navbar-container');
  if (!navbarContainer) return;
  
  const user = getCurrentUser();
  const authenticated = isAuthenticated();
  
  navbarContainer.innerHTML = `
    <nav class="navbar">
      <div class="navbar-container">
        <a href="/" class="navbar-logo" data-link>
          <span class="logo-icon">🧘</span>
          <span class="logo-text">Sunshine Stretch</span>
        </a>
        
        <div class="navbar-menu">
          <a href="/" class="navbar-link" data-link>Home</a>
          <a href="/browse" class="navbar-link" data-link>Browse Asanas</a>
          
          ${authenticated ? `
            <a href="/dashboard" class="navbar-link" data-link>Dashboard</a>
            <div class="navbar-user">
              <span class="user-name">Hello, ${user?.username || 'User'}</span>
              <button class="btn btn-outline btn-small" id="logout-btn">Logout</button>
            </div>
          ` : `
            <div class="navbar-auth">
              <a href="/login" class="btn btn-outline btn-small" data-link>Login</a>
              <a href="/register" class="btn btn-primary btn-small" data-link>Sign Up</a>
            </div>
          `}
        </div>
      </div>
    </nav>
  `;
  
  // Add logout handler
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
}

