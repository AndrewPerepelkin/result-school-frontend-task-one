import React, {useState, useEffect} from 'react';
import api from '../../../api';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import Qualities from '../../ui/qualities';

const UserPage = ({id}) => {
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  const history = useHistory();
  const handleReturn = () => history.push('/users');
  const handleEdit = () => history.push(history.location.pathname + '/edit');

  return (
    <div className='m-3'>
      {user ? (
        <div className='mb-3'>
          <h2>{user.name}</h2>
          <h4>Профессия: {user.profession.name}</h4>
          <div>{<Qualities qualities={user.qualities} />}</div>
          <div>Встретился {user.completedMeetings} раз</div>
          <div>Оценка: {user.rate}</div>
        </div>
      ) : (
        <div className='m-3'>Loading...</div>
      )}
      <button
        className='btn btn-secondary m-2'
        onClick={() => handleReturn()}
      >
        Все пользователи
      </button>
      <button
        className='btn btn-primary'
        onClick={() => handleEdit()}
      >
        Изменить
      </button>
    </div>
  );
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
