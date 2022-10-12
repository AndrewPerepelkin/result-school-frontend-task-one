import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../api';
import PropTypes from 'prop-types';
import QualitiesList from './qualitiesList';

const UserPage = ({ id }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  api.users.getById(id).then((data) => setUser(data)); // refactor!
  const handleReturn = () => {
    history.push('/users');
  };
  return (
    <>
      {user
        ? (<>
            <h2>{user.name}</h2>
            <h4>Профессия: {user.profession.name}</h4>
            <div>{<QualitiesList qualities={user.qualities} />}</div>
            <div>Встретился {user.completedMeetings} раз</div>
            <div>Оценка: {user.rate}</div>
          </>)
        : (
        <div>Loading...</div>
          )}
      <button
        className='btn btn-secondary mt-2'
        onClick={() => handleReturn()}
      >
        Все пользователи
      </button>
    </>
  );
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
