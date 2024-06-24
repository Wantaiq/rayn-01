import { Button, FormInput } from '@/components';
import { useForm } from 'react-hook-form';
import useAxios from '@/hooks/useAxios';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type RegistrationFormFields = {
  username: string;
  password: string;
};

const Register = () => {
  const { response, fetchData, error } = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormFields>({
    reValidateMode: 'onSubmit',
  });

  const onSubmit = handleSubmit(async (data) => {
    await fetchData(axios, {
      url: '/auth/register',
      data,
      method: 'post',
    });
  });

  useEffect(() => {
    if (response?.status === 200) {
      navigate('/login');
    }
  }, [response]);

  return (
    <div className='flex flex-col absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <form
        onSubmit={onSubmit}
        className='flex flex-col space-y-3 items-center'>
        <FormInput<RegistrationFormFields>
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
        <FormInput<RegistrationFormFields>
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
            minLength: {
              value: 8,
              message:
                'Password has to contain at least 8 characters.',
            },
            pattern: {
              value:
                /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/,
              message:
                'Password has to contain at least one uppercase letter, one number and one special character.',
            },
          }}
        />
        <Button
          className='font-semibold'
          size='large'
          as='button'>
          Register
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
