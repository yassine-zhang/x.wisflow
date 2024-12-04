import axios from "axios";
import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
          toast({
            title: "Network request failed",
            description: error.message,
            variant: "destructive",
          });
          break;
      }

      // 统一的错误处理逻辑
      return Promise.reject(error);
    } else if (error.request) {
      // The request was made but no response was received
      toast({
        title: "Network request failed",
        description: error.message,
        variant: "destructive",
      });
      console.error(error.request);
      return Promise.reject(error);
    } else {
      // Something happened in setting up the request that triggered an Error
      toast({
        title: "Network request failed",
        description: error.message,
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  },
);

export default instance;
