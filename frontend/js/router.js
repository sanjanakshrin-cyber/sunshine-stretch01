import { renderNavbar } from './components/navbar.js';
import { renderHome } from './pages/home.js';
import { renderBrowse } from './pages/browse.js';
import { renderAsanaDetail } from './pages/detail.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderLogin } from './pages/login.js';
import { renderRegister } from './pages/register.js';

// Route configuration
const routes = {
  '/': renderHome,
  '/browse': renderBrowse,
  '/asana/:id': renderAsanaDetail,
  '/dashboard': renderDashboard,
  '/login': renderLogin,
  '/register': renderRegister
};

// Get current path
function getCurrentPath() {
  return window.location.pathname;
}

// Match route
function matchRoute(path) {
  // Exact match
  if (routes[path]) {
    return { handler: routes[path], params: {} };
  }
  
  // Parameter match (e.g., /asana/:id)
  for (const [route, handler] of Object.entries(routes)) {
    if (route.includes(':')) {
      const routeParts = route.split('/');
      const pathParts = path.split('/');
      
      if (routeParts.length === pathParts.length) {
        const params = {};
        let matches = true;
        
        for (let i = 0; i < routeParts.length; i++) {
          if (routeParts[i].startsWith(':')) {
            params[routeParts[i].substring(1)] = pathParts[i];
          } else if (routeParts[i] !== pathParts[i]) {
            matches = false;
            break;
          }
        }
        
        if (matches) {
          return { handler, params };
        }
      }
    }
  }
  
  return null;
}

// Navigate to route
export function navigate(path) {
  if (typeof path === 'number') {
    // Browser back/forward
    window.history.go(path);
    return;
  }
  window.history.pushState({}, '', path);
  handleRoute();
}

// Handle route
function handleRoute() {
  const path = getCurrentPath();
  const match = matchRoute(path);
  
  if (match) {
    match.handler(match.params);
  } else {
    // 404 - redirect to home
    navigate('/');
  }
}

// Initialize router
export function initRouter() {
  // Handle initial load
  handleRoute();
  
  // Handle browser back/forward
  window.addEventListener('popstate', handleRoute);
  
  // Handle link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href) {
        navigate(href);
      }
    }
  });
  
  // Render navbar
  renderNavbar();
}

