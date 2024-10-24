import axios from 'axios';

//android's localhost : 10.0.2.2 
const BASEURL = "http://10.0.2.2:3001/";


const axiosInstance = axios.create({
  baseURL: BASEURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(config.url)
    return config
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;