import React from "react";
const UsersData = (probs) => {
  return (
    probs.users.map(user => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          {user.qualities.map(qualitie => 
            (<span 
              key={qualitie._id} 
              className={`badge m-1 bg-${qualitie.color}`}>
              {qualitie.name}
            </span>))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td><button className="btn btn-danger btn-sm" onClick={() => probs.deleteUser(user)}>Delete</button></td>
      </tr>
      )
    )     
  )
}

export default UsersData;