import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import userService from '../services/userService';
import {toast} from 'react-toastify';

const UsersContext = React.createContext();

export const useUsers = () => useContext(UsersContext);

const UsersProvider = ({children}) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  const getUsers = async () => {
    try {
      const {content} = await userService.get();
      setUsers(content);
      setIsLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  const errorCatcher = (error) => {
    const {message} = error.response.data;
    setError(message);
  };

  return (
    <UsersContext.Provider value={{users}}>
      {!isLoading ? children : 'Загрузка...'}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
export default UsersProvider;
