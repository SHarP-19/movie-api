import axios from 'axios';
import { config } from '../config/config';

const api = axios.create({
  baseURL: config.tmdbBaseUrl,
  headers: {
    Authorization: `Bearer ${config.tmdbApiKey}`,
    'Content-Type': 'application/json'
  }
});

export default api;