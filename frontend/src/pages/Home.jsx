import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">Sunshine Stretch</span>
          </h1>
          <p className="hero-subtitle">
            Discover the art of yoga asanas, find your balance, and transform your practice
          </p>
          <div className="hero-buttons">
            <Link to="/browse" className="btn btn-primary btn-large">
              Explore Asanas
            </Link>
            {!isAuthenticated && (
              <Link to="/register" className="btn btn-secondary btn-large">
                Start Your Journey
              </Link>
            )}
            {isAuthenticated && (
              <Link to="/dashboard" className="btn btn-secondary btn-large">
                My Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Sunshine Stretch?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🧘‍♀️</div>
              <h3>Comprehensive Library</h3>
              <p>Browse through various yoga asanas with detailed instructions, images, and benefits</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Your Progress</h3>
              <p>Monitor your yoga journey and see how far you've come with our progress dashboard</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>AI Recommendations</h3>
              <p>Get personalized asana recommendations based on your goals and preferences</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Goal-Oriented</h3>
              <p>Focus on flexibility, strength, stress relief, or balance - we've got you covered</p>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2 className="section-title">Explore by Category</h2>
          <div className="categories-grid">
            <Link to="/browse?category=standing" className="category-card">
              <div className="category-icon">🏃</div>
              <h3>Standing</h3>
              <p>Build strength and stability</p>
            </Link>
            <Link to="/browse?category=seated" className="category-card">
              <div className="category-icon">🧘</div>
              <h3>Seated</h3>
              <p>Find your center</p>
            </Link>
            <Link to="/browse?category=balance" className="category-card">
              <div className="category-icon">⚖️</div>
              <h3>Balance</h3>
              <p>Improve focus and stability</p>
            </Link>
            <Link to="/browse?category=relaxation" className="category-card">
              <div className="category-icon">😌</div>
              <h3>Relaxation</h3>
              <p>Restore and rejuvenate</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

