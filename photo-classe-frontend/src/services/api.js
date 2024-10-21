import axios from 'axios';

// Base URL de l'API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// valide le code d'accès
export const validateAccessCode = async (codeAcces) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/classes/access`, { codeAcces });
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Erreur lors de la validation du code';
  }
};

// soumet une commande
export const submitOrder = async (orderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/classes/order`, orderData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Erreur lors de la soumission de la commande';
  }
};
