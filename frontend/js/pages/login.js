import { login } from '../auth.js';
import { navigate } from '../router.js';
import { renderNavbar } from '../components/navbar.js';

export function renderLogin() {
  const container = document.getElementById('page-container');
  if (!container) return;
  
  // Load CSS
  if (!document.querySelector('link[href*="auth.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/auth.css';
    document.head.appendChild(link);
  }
  
  container.innerHTML = `
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-card">
          <h1>Welcome Back</h1>
          <p class="auth-subtitle">Sign in to continue your yoga journey</p>

          <div id="error-message" style="display: none;" class="error-message"></div>

          <form id="login-form" class="auth-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                id="email"
                required
                placeholder="your@email.com"
              />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                required
                placeholder="••••••••"
              />
            </div>

            <button type="submit" class="btn btn-primary btn-full" id="submit-btn">
              Sign In
            </button>
          </form>

          <p class="auth-footer">
            Don't have an account? <a href="/register" data-link>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Add form handler
  document.getElementById('login-form').addEventListener('submit', handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const submitBtn = document.getElementById('submit-btn');
  const errorDiv = document.getElementById('error-message');
  
  errorDiv.style.display = 'none';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Signing in...';
  
  const result = await login(email, password);
  
  if (result.success) {
    renderNavbar();
    navigate('/dashboard');
  } else {
    errorDiv.textContent = result.error || 'Login failed';
    errorDiv.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign In';
  }
}

