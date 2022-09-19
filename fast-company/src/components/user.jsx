import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';
const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onToggleBookMark
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((q) => (
          <Qualitie
            key={q._id}
            {...q}
          />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <BookMark
          status={bookmark}
          onToggleBookMark={onToggleBookMark}
          id={_id}
        />
      </td>
      <td>
        <button
          className='btn btn-danger btn-sm'
          onClick={() => onDelete(_id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default User;
