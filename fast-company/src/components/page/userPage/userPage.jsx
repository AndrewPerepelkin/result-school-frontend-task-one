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
  // const handleReturn = () => history.push('/users');
  const handleEdit = () => history.push(history.location.pathname + '/edit');

  return (
    <div className='container'>
      <div className='row gutters-sm'>
        {user ? (
          <div className='col-md-4 mb-3'>
            <div className='card mb-3'>
              <div className='card-body'>
                <div className='d-flex flex-column align-items-center text-center position-relative'>
                  <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                      Math.random() + 1
                    )
                      .toString(36)
                      .substring(7)}.svg`}
                    className='rounded-circle shadow-1-strong me-3'
                    alt='avatar'
                    width='65'
                    height='65'
                  />
                  <div className='mt-3'>
                    <h4>{user.name}</h4>
                    <p className='text-secondary mb-1'>
                      {user.profession.name}
                    </p>
                    <div className='text-muted'>
                      <i
                        className='bi bi-caret-down-fill text-primary'
                        role='button'
                      ></i>
                      <i
                        className='bi bi-caret-up text-secondary'
                        role='button'
                      ></i>
                      <span className='ms-2'>{user.rate}</span>
                    </div>
                  </div>
                </div>
                <button
                  className='position-absolute top-0 end-0 btn btn-light btn-sm'
                  onClick={() => handleEdit()}
                >
                  <i className='bi bi-gear'></i>
                </button>
              </div>

              {/* <button
                className='btn btn-secondary m-2'
                onClick={() => handleReturn()}
              >
                Все пользователи
              </button> */}
            </div>
            <div className='card mt-3'>
              <div className='card-body d-flex flex-column justify-content-center text-center'>
                <h5 className='card-title'>
                  <span>Qualities</span>
                </h5>
                <p className='card-text'>
                  {<Qualities qualities={user.qualities} />}
                </p>
              </div>
            </div>
            <div className='card mt-3'>
              <div className='card-body d-flex flex-column justify-content-center text-center'>
                <h5 className='card-title'>
                  <span>Completed meetings</span>
                </h5>
                <h1 className='display-1'>{user.completedMeetings}</h1>
              </div>
            </div>
          </div>
        ) : (
          <div className='m-3'>Loading...</div>
        )}
      </div>
    </div>
  );
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
