import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {useAuth} from '../../../../hooks/useAuth';
import {getUserById} from '../../../../store/users';

const Comment = ({userId, created_at: time, _id, content, onRemove}) => {
  const user = useSelector(getUserById(userId));
  const {currentUser} = useAuth();

  const getCommentTime = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const now = new Date();
    const yearDif = now.getFullYear() - date.getFullYear();
    if (yearDif === 0) {
      const dayDif = now.getDate() - date.getDate();
      if (dayDif === 0) {
        const hourDif = now.getHours() - date.getHours();
        if (hourDif === 0) {
          const minutesDif = now.getMinutes() - date.getMinutes();

          if (minutesDif >= 0 && minutesDif < 5) return '1 минуту назад';
          if (minutesDif >= 5 && minutesDif < 10) return '5 минут назад';
          if (minutesDif >= 10 && minutesDif < 30) {
            return '10 минут назад';
          }
          return '30 минут назад';
        }
        return `${date.getHours()}:${date.getMinutes()}`;
      }

      return `${date.getDate()} ${date.toLocaleString('default', {
        month: 'long'
      })}`;
    }
    return (
      date.getFullYear() + '.' + (date.getMonth() + 1) + '_' + date.getDate()
    );
  };

  return (
    <div className='bg-light card-body mb-3'>
      <div className='row'>
        <div className='col'>
          <div className='d-flex flex-start '>
            <img
              src={user.image}
              className='rounded-circle shadow-1-strong me-3'
              alt='avatar'
              width='65'
              height='65'
            />
            <div className='flex-grow-1 flex-shrink-1'>
              <div className='mb-4'>
                <div className='d-flex justify-content-between align-items-center'>
                  <p className='mb-1 '>
                    {user ? user.name : ' '}
                    <span className='small'> - {getCommentTime(time)}</span>
                  </p>
                  {currentUser._id === userId && (
                    <button
                      className='btn btn-sm text-primary d-flex align-items-center'
                      onClick={() => onRemove(_id)}
                    >
                      <i className='bi bi-x-lg'></i>
                    </button>
                  )}
                </div>
                <p className='small mb-0'>{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  _id: PropTypes.string,
  userId: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  content: PropTypes.string,
  onRemove: PropTypes.func
};

export default Comment;
