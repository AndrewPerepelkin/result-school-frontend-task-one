import React from 'react';
const BookMark = ({status, onToggelBookMark, id}) => {
  return (
    <button onClick={() => onToggelBookMark(id)}>
      {status
        ? <i className='bi bi-bookmark-check-fill'></i>
        : <i className='bi bi-bookmark'></i>
      }
    </button>    
  );
}
export default BookMark;