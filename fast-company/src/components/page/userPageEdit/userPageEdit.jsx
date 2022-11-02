import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import UpdateForm from '../../ui/updateForm';
import {useHistory} from 'react-router-dom';

const UserPageEdit = ({userId}) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  const handleUpate = (id, data) => {
    // api.users.update(id, data);
    history.push(`/users/${userId}`);
  };

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 shadow p-4'>
            {user ? (
              <>
                <h3 className='text-center mb-4'>
                  Изменение данных пользователя
                </h3>

                <UpdateForm user={user} />
                <div className='d-flex flex-column align-items-center'>
                  <button
                    role='button'
                    onClick={handleUpate}
                    className='btn btn-primary w-100 mx-auto mb-2'
                  >
                    Обновить
                  </button>
                </div>
              </>
            ) : (
              <div className='text-center mb-4'>Загрузка...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

UserPageEdit.propTypes = {
  userId: PropTypes.string
};

export default UserPageEdit;
