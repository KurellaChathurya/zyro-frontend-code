import axios from 'axios';

// Browser లో రన్ అవుతున్న current IP లేదా Hostname ని ఆటోమేటిక్‌గా తీసుకుంటుంది
// const BASE_IP = window.location.hostname;
const API_URL = 'https://zyro-backend-wsml.onrender.com/api/auth';

// Register User
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login User
export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data && response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;history
};

// Logout User
export const logout = () => {
  localStorage.removeItem('user');
};

// Get Current Logged-in User
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};