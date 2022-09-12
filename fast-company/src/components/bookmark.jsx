import React from 'react';
const BookMark = (props) => {
  const {status, onToggelBookMark, id} = props;
  return (
    <button onClick={() => onToggelBookMark(id)}>
      {status ? 
        <i className="bi bi-bookmark-check-fill"></i> :
        <i className='bi bi-bookmark'></i>
      }
    </button>
    
  );
}
export default BookMark;