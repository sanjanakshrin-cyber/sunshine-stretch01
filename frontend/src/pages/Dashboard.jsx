import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AsanaCard from '../components/AsanaCard';
import './Dashboard.css';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState(user?.goals || []);
  const [showGoalSelector, setShowGoalSelector] = useState(false);

  const availableGoals = [
    { value: 'flexibility', label: 'Flexibility', icon: '🤸' },
    { value: 'stress-relief', label: 'Stress Relief', icon: '😌' },
    { value: 'strength', label: 'Strength', icon: '💪' },
    { value: 'balance', label: 'Balance', icon: '⚖️' },
    { value: 'relaxation', label: 'Relaxation', icon: '🧘' }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      const [progressRes, recommendationsRes] = await Promise.all([
        axios.get('/api/users/progress'),
        axios.get('/api/recommendations')
      ]);
      setProgress(progressRes.data);
      setRecommendations(recommendationsRes.data.recommendations || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoalToggle = async (goal) => {
    const newGoals = goals.includes(goal)
      ? goals.filter(g => g !== goal)
      : [...goals, goal];
    
    setGoals(newGoals);
    
    try {
      await axios.put('/api/users/goals', { goals: newGoals });
      fetchDashboardData(); // Refresh recommendations
    } catch (error) {
      console.error('Error updating goals:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <h1 className="page-title">My Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back, {user?.username}!</p>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>{progress?.totalCompleted || 0}</h3>
              <p>Asanas Completed</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <h3>{Math.round((progress?.totalDuration || 0) / 60)}</h3>
              <p>Minutes Practiced</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{Object.keys(progress?.byCategory || {}).length}</h3>
              <p>Categories Explored</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Your Goals</h2>
            <button
              onClick={() => setShowGoalSelector(!showGoalSelector)}
              className="btn btn-outline btn-small"
            >
              {showGoalSelector ? 'Done' : 'Edit Goals'}
            </button>
          </div>
          
          {showGoalSelector ? (
            <div className="goals-selector">
              {availableGoals.map(goal => (
                <button
                  key={goal.value}
                  onClick={() => handleGoalToggle(goal.value)}
                  className={`goal-button ${goals.includes(goal.value) ? 'active' : ''}`}
                >
                  <span className="goal-icon">{goal.icon}</span>
                  <span>{goal.label}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="goals-display">
              {goals.length > 0 ? (
                goals.map(goal => {
                  const goalInfo = availableGoals.find(g => g.value === goal);
                  return goalInfo ? (
                    <span key={goal} className="goal-badge">
                      {goalInfo.icon} {goalInfo.label}
                    </span>
                  ) : null;
                })
              ) : (
                <p className="no-goals">No goals set. Click "Edit Goals" to add some!</p>
              )}
            </div>
          )}
        </div>

        {recommendations.length > 0 && (
          <div className="dashboard-section">
            <h2>✨ Personalized Recommendations</h2>
            <p className="section-description">
              Based on your goals: {goals.join(', ') || 'all goals'}
            </p>
            <div className="recommendations-grid">
              {recommendations.map(asana => (
                <AsanaCard key={asana._id} asana={asana} />
              ))}
            </div>
          </div>
        )}

        {progress?.completedAsanas && progress.completedAsanas.length > 0 && (
          <div className="dashboard-section">
            <h2>Recently Completed</h2>
            <div className="completed-list">
              {progress.completedAsanas.slice(0, 5).map((item, index) => (
                <div key={index} className="completed-item">
                  {item.asanaId ? (
                    <Link to={`/asana/${item.asanaId._id}`} className="completed-link">
                      <span className="completed-name">{item.asanaId.name}</span>
                      <span className="completed-date">
                        {new Date(item.completedAt).toLocaleDateString()}
                      </span>
                    </Link>
                  ) : (
                    <span>Asana removed</span>
                  )}
                </div>
              ))}
            </div>
            {progress.completedAsanas.length > 5 && (
              <Link to="/browse" className="view-all-link">
                View All Completed →
              </Link>
            )}
          </div>
        )}

        {progress?.byCategory && Object.keys(progress.byCategory).length > 0 && (
          <div className="dashboard-section">
            <h2>Progress by Category</h2>
            <div className="category-progress">
              {Object.entries(progress.byCategory).map(([category, count]) => (
                <div key={category} className="category-item">
                  <span className="category-name">{category}</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(count / progress.totalCompleted) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="category-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

