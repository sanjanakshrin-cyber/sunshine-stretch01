// Automatically detect API URL based on current hostname
// Supports: localhost, local network, and production deployment
const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
  
  // Production URL - Your deployed backend
  const PRODUCTION_API_URL = 'https://sunshine-stretch-backend-1p4j.onrender.com/api';
  
  // If on localhost, use local backend
  if (isLocal) {
    return 'http://localhost:5001/api';
  }
  
  // If accessing via IP (local network), use that IP
  if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return `http://${hostname}:5001/api`;
  }
  
  // For production/deployed frontend, use production API URL
  // TODO: Update PRODUCTION_API_URL with your actual backend URL after deployment
  return PRODUCTION_API_URL;
};

const API_BASE_URL = getApiBaseUrl();

// Get auth token from localStorage
function getAuthToken() {
  return localStorage.getItem('token');
}

// Set auth header
function getAuthHeaders() {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// API request helper
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth API
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },
  
  register: async (username, email, password, goals = []) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, goals })
    });
  }
};

// Asanas API
export const asanasAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiRequest(`/asanas?${params}`);
  },
  
  getById: async (id) => {
    return apiRequest(`/asanas/${id}`);
  },
  
  getByCategory: async (category) => {
    return apiRequest(`/asanas/category/${category}`);
  }
};

// User API
export const userAPI = {
  getProfile: async () => {
    return apiRequest('/users/profile');
  },
  
  updateGoals: async (goals) => {
    return apiRequest('/users/goals', {
      method: 'PUT',
      body: JSON.stringify({ goals })
    });
  },
  
  completeAsana: async (asanaId, duration = 0) => {
    return apiRequest('/users/complete-asana', {
      method: 'POST',
      body: JSON.stringify({ asanaId, duration })
    });
  },
  
  getProgress: async () => {
    return apiRequest('/users/progress');
  }
};

// Recommendations API
export const recommendationsAPI = {
  getRecommendations: async () => {
    return apiRequest('/recommendations');
  }
};

