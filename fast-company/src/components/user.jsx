import React from 'react';
import Qualitie from './qualitie';
import BookMark from './bookmark';
const User = (props) => {
  return (
    props.users.map(user => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td><Qualitie qualities={user.qualities} /></td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td><BookMark 
          status={user.bookmark} 
          onToggelBookMark={props.onToggelBookMark}
          id={user._id} />
        </td>
        <td><button className='btn btn-danger btn-sm' onClick={() => props.onDelete(user._id)}>Удалить</button></td>
      </tr>
      )
    )     
  )
};

export default User;