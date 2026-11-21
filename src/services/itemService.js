import axios from 'axios';

const API_URL = 'https://zyro-backend-wsml.onrender.com/api/items';

export const getAllItems = () => axios.get(API_URL);
export const createItem = (itemData) => axios.post(API_URL, itemData);
export const getItemById = (id) => axios.get(`${API_URL}/${id}`);
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`);
