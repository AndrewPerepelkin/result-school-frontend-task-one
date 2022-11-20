import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import api from '../../../../api';

const Comment = ({userId, created_at: time, _id, content, onRemove}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  const getCommentTime = (timstamp) => {
    const date = new Date(parseInt(timstamp));
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
        {isLoading ? (
          'Loading...'
        ) : (
          <div className='col'>
            <div className='d-flex flex-start '>
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
              <div className='flex-grow-1 flex-shrink-1'>
                <div className='mb-4'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='mb-1 '>
                      {user ? user.name : ' '}
                      <span className='small'> - {getCommentTime(time)}</span>
                    </p>
                    <button
                      className='btn btn-sm text-primary d-flex align-items-center'
                      onClick={() => onRemove(_id)}
                    >
                      <i className='bi bi-x-lg'></i>
                    </button>
                  </div>
                  <p className='small mb-0'>{content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
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
