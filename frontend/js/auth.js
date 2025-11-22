import { authAPI } from './api.js';

// Get current user from localStorage
export function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

// Get auth token
export function getToken() {
  return localStorage.getItem('token');
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!getToken();
}

// Login user
export async function login(email, password) {
  try {
    const data = await authAPI.login(email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Register user
export async function register(username, email, password, goals = []) {
  try {
    const data = await authAPI.register(username, email, password, goals);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Logout user
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}

