import axios from "axios";
import { message } from "ant-design-vue";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") || "Empty token value"}`,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch (error.response.status) {
        case 400:
          // Bad Request
          return Promise.resolve(error.response.data);
        case 401:
          // Unauthorized
          return Promise.resolve(error.response.data);
        default:
          // Other errors
          message.error(error.message);
          break;
      }

      // 统一的错误处理逻辑
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made but no response was received
      message.error(error.message);
      console.error(error.request);
      return Promise.reject(error);
    } else {
      // Something happened in setting up the request that triggered an Error
      message.error(error.message);
      return Promise.reject(error);
    }
  },
);

export default instance;
