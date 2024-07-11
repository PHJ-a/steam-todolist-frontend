import axios from 'axios';

const BASE_URL =
  'http://steam-todo-deploy-test-env.eba-fhqdybsp.ap-northeast-2.elasticbeanstalk.com/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;
