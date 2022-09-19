import React from "react";
const BookMark = ({ status, onToggleBookMark, id }) => {
  return (
    <button onClick={() => onToggleBookMark(id)}>
      {status ? (
        <i className="bi bi-bookmark-check-fill"></i>
      ) : (
        <i className="bi bi-bookmark"></i>
      )}
    </button>
  );
};
export default BookMark;
