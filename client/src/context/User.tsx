import useAxios from '@/hooks/useAxios';
import { User } from '@/types';
import axios from 'axios';
import {
  type ReactNode,
  createContext,
  useState,
  useEffect,
} from 'react';

type UserProviderPropsType = {
  children: ReactNode;
};

type UserContext = {
  user: User | null;
  updateUser: (args: User) => void;
  refreshToken: () => void;
};

const UserContext = createContext<UserContext>(
  {} as UserContext,
);

const UserProvider = ({
  children,
}: UserProviderPropsType) => {
  const [user, setUser] = useState<User | null>(null);
  const { response, fetchData } = useAxios<User>();

  const updateUser = (user: User) => {
    setUser(user);
  };

  const refreshToken = async () => {
    await fetchData(axios, {
      url: '/auth/refresh',
      method: 'get',
      withCredentials: true,
    });
  };

  useEffect(() => {
    if (response?.status === 200) {
      const { id, username, token } = response;
      updateUser({ id, username, token });
    }
  }, [response]);

  const contextValue = {
    user,
    updateUser,
    refreshToken,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
