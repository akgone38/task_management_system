import axios from 'axios';
const axiosInstance= axios.create({
  // baseURL:'http://localhost:8080/api', //replace backendapi url here
  baseURL:'https://tmsbackend.vercel.app/api',
});
export default axiosInstance;
