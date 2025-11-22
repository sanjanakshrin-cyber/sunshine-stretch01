import { isAuthenticated } from '../auth.js';
import { navigate } from '../router.js';

export function renderHome() {
  const container = document.getElementById('page-container');
  if (!container) return;
  
  const authenticated = isAuthenticated();
  
  // Load CSS
  if (!document.querySelector('link[href*="home.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'css/home.css';
    document.head.appendChild(link);
  }
  
  container.innerHTML = `
    <div class="home">
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            Welcome to <span class="gradient-text">Sunshine Stretch</span>
          </h1>
          <p class="hero-subtitle">
            Discover the art of yoga asanas, find your balance, and transform your practice
          </p>
          <div class="hero-buttons">
            <a href="/browse" class="btn btn-primary btn-large" data-link>Explore Asanas</a>
            ${!authenticated ? `
              <a href="/register" class="btn btn-secondary btn-large" data-link>Start Your Journey</a>
            ` : `
              <a href="/dashboard" class="btn btn-secondary btn-large" data-link>My Dashboard</a>
            `}
          </div>
        </div>
      </section>

      <section class="features">
        <div class="container">
          <h2 class="section-title">Why Choose Sunshine Stretch?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">🧘‍♀️</div>
              <h3>Comprehensive Library</h3>
              <p>Browse through various yoga asanas with detailed instructions, images, and benefits</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">📊</div>
              <h3>Track Your Progress</h3>
              <p>Monitor your yoga journey and see how far you've come with our progress dashboard</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">✨</div>
              <h3>AI Recommendations</h3>
              <p>Get personalized asana recommendations based on your goals and preferences</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">🎯</div>
              <h3>Goal-Oriented</h3>
              <p>Focus on flexibility, strength, stress relief, or balance - we've got you covered</p>
            </div>
          </div>
        </div>
      </section>

      <section class="categories">
        <div class="container">
          <h2 class="section-title">Explore by Category</h2>
          <div class="categories-grid">
            <a href="/browse?category=standing" class="category-card" data-link>
              <div class="category-icon">🏃</div>
              <h3>Standing</h3>
              <p>Build strength and stability</p>
            </a>
            <a href="/browse?category=seated" class="category-card" data-link>
              <div class="category-icon">🧘</div>
              <h3>Seated</h3>
              <p>Find your center</p>
            </a>
            <a href="/browse?category=balance" class="category-card" data-link>
              <div class="category-icon">⚖️</div>
              <h3>Balance</h3>
              <p>Improve focus and stability</p>
            </a>
            <a href="/browse?category=relaxation" class="category-card" data-link>
              <div class="category-icon">😌</div>
              <h3>Relaxation</h3>
              <p>Restore and rejuvenate</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}

