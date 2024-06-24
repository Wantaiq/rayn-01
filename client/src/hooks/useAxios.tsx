import { useState } from 'react';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

type ErrorType = {
  message: string;
  errorCode: number;
};

const useAxios = () => {
  const [response, setResponse] =
    useState<AxiosResponse | null>(null);
  const [error, setErrorMsg] =
    useState<AxiosError<ErrorType> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (
    axiosInstance: AxiosInstance,
    requestConfig: AxiosRequestConfig = {},
  ) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await axiosInstance(requestConfig);
      setResponse({
        ...res.data,
        status: res.status,
      });
    } catch (error) {
      if (axios.isAxiosError<ErrorType>(error)) {
        setErrorMsg(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    error,
    loading,
    fetchData,
  };
};

export default useAxios;
