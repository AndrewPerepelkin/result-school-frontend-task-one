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
    const isValidate = validate();
    if (!isValidate) return;
    console.log(data);
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Это поле обязательно для заполнения'
      }
    },
    password: {
      isRequired: {
        message: 'Это поле обязательно для заполнения'
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
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
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Login;
