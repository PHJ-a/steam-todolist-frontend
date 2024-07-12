import axios from 'axios';

const BASE_URL = 'https://api.todos-steams-project.site';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;
