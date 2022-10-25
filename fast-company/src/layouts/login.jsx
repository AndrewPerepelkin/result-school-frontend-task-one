import React, {useEffect, useState} from 'react';
import TextFied from '../components/textFied';
import {validator} from '../utils/validator';

const Login = () => {
  const [data, setData] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = ({target}) => {
    setData((prevState) => ({...prevState, [target.name]: target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Это поле обязательно для заполнения'
      },
      isEmail: {
        message: 'Введен некорректный адрес электронной почты'
      }
    },
    password: {
      isRequired: {
        message: 'Это поле обязательно для заполнения'
      },
      containsCapitalCharacter: {
        message: 'Пароль должен сождержать хатя бы одну заглавную букву'
      },
      containsDigit: {
        message: 'Пароль должен сождержать хатя бы одну цифру'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow p-4'>
          <h3 className='text-center mb-4'>Вход</h3>
          <form onSubmit={handleSubmit}>
            <TextFied
              label={'Электронная почта'}
              name={'email'}
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextFied
              label={'Пароль'}
              type={'password'}
              name={'password'}
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            <button
              type='submit'
              disabled={!isValid}
              className='btn btn-primary w-100 mx-auto'
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
