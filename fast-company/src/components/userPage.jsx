import React, {useState} from 'react';
import api from '../api';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import QualitiesList from './qualitiesList';

const UserPage = ({id}) => {
  const [user, setUser] = useState();
  api.users.getById(id).then((data) => setUser(data));

  const history = useHistory();
  const handleReturn = () => history.push('/users');

  return (
    <div className='m-3'>
      {user ? (
        <>
          <h2>{user.name}</h2>
          <h4>Профессия: {user.profession.name}</h4>
          <div>{<QualitiesList qualities={user.qualities} />}</div>
          <div>Встретился {user.completedMeetings} раз</div>
          <div>Оценка: {user.rate}</div>
        </>
      ) : (
        <div className='m-3'>Loading...</div>
      )}
      <button
        className='btn btn-secondary mt-2'
        onClick={() => handleReturn()}
      >
        Все пользователи
      </button>
    </div>
  );
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
