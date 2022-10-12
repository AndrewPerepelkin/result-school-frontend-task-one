import React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import QualitiesList from './qualitiesList';

const UserPage = ({user}) => {
  const history = useHistory();
  const handleReturn = () => history.push('/users');

  return (
    <>
      {user ? (
        <>
          <h2>{user.name}</h2>
          <h4>Профессия: {user.profession.name}</h4>
          <div>{<QualitiesList qualities={user.qualities} />}</div>
          <div>Встретился {user.completedMeetings} раз</div>
          <div>Оценка: {user.rate}</div>
        </>
      ) : (
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
  user: PropTypes.object
};

export default UserPage;
