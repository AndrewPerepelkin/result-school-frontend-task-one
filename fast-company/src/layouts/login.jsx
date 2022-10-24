import React from 'react';

const Login = () => {
  return (
    <form action=''>
      <div>
        <label htmlFor='email'>Электронная почта</label>
        <input
          type='text'
          id='email'
        />
      </div>
      <div>
        <label htmlFor='password'>Пароль</label>
        <input
          type='password'
          id='password'
        />
      </div>
    </form>
  );
};

export default Login;
