import axios from 'axios';

const AUTH_URL = 'https://zyro-backend-wsml.onrender.com/api/auth';

export const registerUser = (userData) => axios.post(`${AUTH_URL}/register`, userData);
export const loginUser = (credentials) => axios.post(`${AUTH_URL}/login`, credentials);
