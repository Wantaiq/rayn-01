import { Button, FormInput } from '@/components';
import { useForm } from 'react-hook-form';
import useAxios from '@/hooks/useAxios';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/context';
import { User } from '@/types';

type LoginFormFields = {
  username: string;
  password: string;
};

const Register = () => {
  const { response, fetchData, error } = useAxios<User>();
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    reValidateMode: 'onSubmit',
  });

  const onSubmit = handleSubmit(async (data) => {
    await fetchData(axios, {
      url: '/auth/login',
      data,
      method: 'post',
      withCredentials: true,
    });
  });

  useEffect(() => {
    if (response?.status === 200) {
      const { id, username, token } = response;
      updateUser({ id, username, token });
      navigate('/');
    }
  }, [response]);

  return (
    <div className='flex flex-col absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col space-y-3 items-center'>
        <FormInput<LoginFormFields>
          name='username'
          label='Username'
          placeholder='John'
          errors={errors}
          register={register}
          rules={{
            required: {
              value: true,
              message: 'Username is required.',
            },
          }}
        />
        <FormInput<LoginFormFields>
          name='password'
          label='Password'
          placeholder='********'
          type='password'
          errors={errors}
          register={register}
          rules={{
            required: {
              value: true,
              message: 'Password is required.',
            },
          }}
        />
        <Button
          className='font-semibold'
          size='large'
          as='button'>
          Login
        </Button>
        <div className='h-5'>
          {error && (
            <p className='text-red-500 text-sm'>
              {error.response
                ? error.response.data.message
                : error.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
