import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';
const User = ({users, onToggelBookMark, onDelete}) => {
  return (
    users.map(user => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map(q => <Qualitie key={q._id} {...q} />)}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td><BookMark 
          status={user.bookmark} 
          onToggelBookMark={onToggelBookMark}
          id={user._id} />
        </td>
        <td><button className='btn btn-danger btn-sm' onClick={() => onDelete(user._id)}>Удалить</button></td>
      </tr>
      )
    )     
  )
};

export default User;