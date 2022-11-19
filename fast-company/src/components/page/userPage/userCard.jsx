import React from 'react';
import {useHistory} from 'react-router-dom';
import CardWrapper from '../../common/Card';
import PropTypes from 'prop-types';

const UserCard = ({userName, professionName, rate}) => {
  const history = useHistory();
  const handleEdit = () => history.push(history.location.pathname + '/edit');

  return (
    <CardWrapper>
      <div className='d-flex flex-column align-items-center text-center position-relative'>
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`}
          className='rounded-circle shadow-1-strong me-3'
          alt='avatar'
          width='65'
          height='65'
        />
        <div className='mt-3'>
          <h4>{userName}</h4>
          <p className='text-secondary mb-1'>{professionName}</p>
          <div className='text-muted'>
            <i
              className='bi bi-caret-down-fill text-primary'
              role='button'
            ></i>
            <i
              className='bi bi-caret-up text-secondary'
              role='button'
            ></i>
            <span className='ms-2'>{rate}</span>
          </div>
        </div>
      </div>
      <button
        className='position-absolute top-0 end-0 btn btn-light btn-sm'
        onClick={() => handleEdit()}
      >
        <i className='bi bi-gear'></i>
      </button>
    </CardWrapper>
  );
};

UserCard.propTypes = {
  userName: PropTypes.string,
  professionName: PropTypes.string,
  rate: PropTypes.number
};

export default UserCard;
