import React from 'react';
import PropTypes from 'prop-types';
const BookMark = ({ status, onToggleBookMark, id }) => {
  return (
    <button onClick={() => onToggleBookMark(id)}>
      {status
        ? (<i className='bi bi-bookmark-check-fill'></i>)
        : (<i className='bi bi-bookmark'></i>)
      }
    </button>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default BookMark;
