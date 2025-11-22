import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import AsanaCard from '../components/AsanaCard';
import './Browse.css';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [asanas, setAsanas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'standing', label: 'Standing' },
    { value: 'seated', label: 'Seated' },
    { value: 'balance', label: 'Balance' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'backbend', label: 'Backbend' },
    { value: 'forward-fold', label: 'Forward Fold' },
    { value: 'twist', label: 'Twist' },
    { value: 'inversion', label: 'Inversion' }
  ];

  const difficulties = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  useEffect(() => {
    fetchAsanas();
  }, [selectedCategory, selectedDifficulty, searchTerm]);

  const fetchAsanas = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== 'all') params.category = selectedCategory;
      if (selectedDifficulty !== 'all') params.difficulty = selectedDifficulty;
      if (searchTerm) params.search = searchTerm;

      const response = await axios.get('/api/asanas', { params });
      setAsanas(response.data);
    } catch (error) {
      console.error('Error fetching asanas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="browse">
      <div className="container">
        <h1 className="page-title">Browse Asanas</h1>
        
        <div className="filters">
          <div className="filter-group">
            <label>Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select"
            >
              {difficulties.map(diff => (
                <option key={diff.value} value={diff.value}>{diff.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-group search-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search asanas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : asanas.length === 0 ? (
          <div className="no-results">
            <p>No asanas found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="asanas-grid">
            {asanas.map(asana => (
              <AsanaCard key={asana._id} asana={asana} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;

