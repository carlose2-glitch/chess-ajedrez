import axios from 'axios';

const userApi = axios.create({
  baseURL: import.meta.env.VITE_URL_API_LOCAL,
});

export { userApi };
