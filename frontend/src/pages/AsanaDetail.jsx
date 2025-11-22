import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AsanaDetail.css';

const AsanaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [asana, setAsana] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [duration, setDuration] = useState(30);

  useEffect(() => {
    fetchAsana();
  }, [id]);

  const fetchAsana = async () => {
    try {
      const response = await axios.get(`/api/asanas/${id}`);
      setAsana(response.data);
    } catch (error) {
      console.error('Error fetching asana:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/users/complete-asana', {
        asanaId: id,
        duration: duration
      });
      setCompleted(true);
      alert('Asana marked as completed! 🎉');
    } catch (error) {
      console.error('Error completing asana:', error);
      alert('Failed to mark asana as completed');
    }
  };

  if (loading) {
    return (
      <div className="asana-detail">
        <div className="container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!asana) {
    return (
      <div className="asana-detail">
        <div className="container">
          <p>Asana not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="asana-detail">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <div className="asana-detail-content">
          <div className="asana-detail-image">
            {asana.imageUrl ? (
              <img src={asana.imageUrl} alt={asana.name} />
            ) : (
              <div className="image-placeholder-large">
                <span className="placeholder-icon">🧘</span>
              </div>
            )}
          </div>

          <div className="asana-detail-info">
            <div className="asana-header">
              <h1>{asana.name}</h1>
              {asana.sanskritName && (
                <p className="sanskrit-name">{asana.sanskritName}</p>
              )}
              <div className="asana-meta">
                <span className={`difficulty-badge detail ${asana.difficulty}`}>
                  {asana.difficulty}
                </span>
                <span className="category-badge">{asana.category}</span>
                <span className="duration-badge">Duration: {asana.duration}s</span>
              </div>
            </div>

            <div className="asana-section">
              <h2>Description</h2>
              <p>{asana.description}</p>
            </div>

            {asana.benefits && asana.benefits.length > 0 && (
              <div className="asana-section">
                <h2>Benefits</h2>
                <ul className="benefits-list">
                  {asana.benefits.map((benefit, index) => (
                    <li key={index}>✨ {benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="asana-section">
              <h2>Instructions</h2>
              <ol className="instructions-list">
                {asana.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            {isAuthenticated && (
              <div className="complete-section">
                <h2>Track Your Practice</h2>
                <div className="duration-input-group">
                  <label>Practice Duration (minutes):</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                    className="duration-input"
                  />
                </div>
                <button
                  onClick={handleComplete}
                  className={`btn ${completed ? 'btn-secondary' : 'btn-primary'}`}
                  disabled={completed}
                >
                  {completed ? '✓ Completed' : 'Mark as Completed'}
                </button>
              </div>
            )}

            {!isAuthenticated && (
              <div className="auth-prompt">
                <p>Sign in to track your progress and get personalized recommendations!</p>
                <button
                  onClick={() => navigate('/login')}
                  className="btn btn-primary"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsanaDetail;

