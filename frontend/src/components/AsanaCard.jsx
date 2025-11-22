import { Link } from 'react-router-dom';
import './AsanaCard.css';

const AsanaCard = ({ asana }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return '#4CAF50';
      case 'intermediate':
        return '#FF9800';
      case 'advanced':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  return (
    <Link to={`/asana/${asana._id}`} className="asana-card">
      <div className="asana-image-container">
        {asana.imageUrl ? (
          <img src={asana.imageUrl} alt={asana.name} className="asana-image" />
        ) : (
          <div className="asana-image-placeholder">
            <span className="placeholder-icon">🧘</span>
          </div>
        )}
        <div 
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor(asana.difficulty) }}
        >
          {asana.difficulty}
        </div>
      </div>
      <div className="asana-content">
        <h3 className="asana-name">{asana.name}</h3>
        {asana.sanskritName && (
          <p className="asana-sanskrit">{asana.sanskritName}</p>
        )}
        <p className="asana-description">{asana.description}</p>
        <div className="asana-tags">
          <span className="category-tag">{asana.category}</span>
          {asana.benefits && asana.benefits.length > 0 && (
            <span className="benefits-count">{asana.benefits.length} benefits</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AsanaCard;

