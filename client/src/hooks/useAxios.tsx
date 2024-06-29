import { useState } from 'react';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
} from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

type ErrorType = {
  message: string;
  errorCode: number;
};

const useAxios = <T,>() => {
  const [response, setResponse] = useState<
    (T & { status: number }) | null
  >(null);
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
      const { data, status } =
        await axiosInstance<T>(requestConfig);
      setResponse({
        ...data,
        status: status,
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
