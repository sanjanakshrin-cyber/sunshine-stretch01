import { register } from '../auth.js';
import { navigate } from '../router.js';
import { renderNavbar } from '../components/navbar.js';

const availableGoals = [
  { value: 'flexibility', label: 'Flexibility', icon: '🤸' },
  { value: 'stress-relief', label: 'Stress Relief', icon: '😌' },
  { value: 'strength', label: 'Strength', icon: '💪' },
  { value: 'balance', label: 'Balance', icon: '⚖️' },
  { value: 'relaxation', label: 'Relaxation', icon: '🧘' }
];

export function renderRegister() {
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
          <h1>Start Your Journey</h1>
          <p class="auth-subtitle">Create an account to track your progress</p>

          <div id="error-message" style="display: none;" class="error-message"></div>

          <form id="register-form" class="auth-form">
            <div class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                required
                placeholder="Choose a username"
                minlength="3"
              />
            </div>

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
                minlength="6"
              />
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                required
                placeholder="••••••••"
              />
            </div>

            <div class="form-group">
              <label>Your Goals (Optional)</label>
              <div class="goals-selector" id="goals-selector">
                ${availableGoals.map(goal => `
                  <button type="button" class="goal-button" data-goal="${goal.value}">
                    <span class="goal-icon">${goal.icon}</span>
                    <span>${goal.label}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-full" id="submit-btn">
              Sign Up
            </button>
          </form>

          <p class="auth-footer">
            Already have an account? <a href="/login" data-link>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  `;
  
  // Add goal button handlers
  const goalButtons = document.querySelectorAll('.goal-button');
  const selectedGoals = [];
  
  goalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const goal = btn.dataset.goal;
      if (selectedGoals.includes(goal)) {
        selectedGoals.splice(selectedGoals.indexOf(goal), 1);
        btn.classList.remove('active');
      } else {
        selectedGoals.push(goal);
        btn.classList.add('active');
      }
    });
  });
  
  // Add form handler
  document.getElementById('register-form').addEventListener('submit', (e) => handleSubmit(e, selectedGoals));
}

async function handleSubmit(e, selectedGoals) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const submitBtn = document.getElementById('submit-btn');
  const errorDiv = document.getElementById('error-message');
  
  errorDiv.style.display = 'none';
  
  // Validation
  if (password !== confirmPassword) {
    errorDiv.textContent = 'Passwords do not match';
    errorDiv.style.display = 'block';
    return;
  }
  
  if (password.length < 6) {
    errorDiv.textContent = 'Password must be at least 6 characters';
    errorDiv.style.display = 'block';
    return;
  }
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Creating account...';
  
  const result = await register(username, email, password, selectedGoals);
  
  if (result.success) {
    renderNavbar();
    navigate('/dashboard');
  } else {
    errorDiv.textContent = result.error || 'Registration failed';
    errorDiv.style.display = 'block';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Sign Up';
  }
}

