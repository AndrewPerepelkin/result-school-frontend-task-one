import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {toast} from 'react-toastify';
import userService from '../services/userService';
import {setTokens} from '../services/localStorageService';

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(null);

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({email, password, ...rest}) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
    try {
      const {data} = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      createUser({
        _id: data.localId,
        email,
        rate: getRandomInt(1, 5),
        completedMeetings: getRandomInt(0, 200),
        ...rest
      });
      console.log(data);
    } catch (error) {
      errorCatcher(error);
      const {code, message} = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'Пользователь с таким email уже зарегистрирован'
          };
          throw errorObject;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const {content} = await userService.create(data);
      console.log(content);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }
  const errorCatcher = (error) => {
    const {message} = error.response.data;
    setError(message);
  };
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{signUp, currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
