import React, {useState} from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const formatSumUsersMessage = () => {
    if (users.length === 0) {
      return 'Никто с тобой не тусанет';
    } else if (users.length === 1) {
      return  users.length + ' человек тусанет с тобой сегодня';
    } else if (users.length >= 2 && users.length <= 4 ) {
      return  users.length + ' человека тусанут с тобой сегодня';
    } else if (users.length > 4 ) {
      return  users.length + ' человек тусанут с тобой сегодня';
    }
  }

  const UsersData = () => {
    return (
      users.map(user => (
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
          <td><button className="btn btn-danger btn-sm" onClick={() => handlerUserDelete(user)}>Delete</button></td>
        </tr>
        )
      )     
    )
  }

  const handlerUserDelete = (id) => setUsers(prevState => prevState.filter(user => user !== id))

  return (
    <>
      <h1>
        <span className={(users.length === 0) ? 
        'badge bg-danger' : 
        'badge bg-primary'}>
        {formatSumUsersMessage()}
        </span>
      </h1>

      {(!users.length) ? 
      
      null : 
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <UsersData />
        </tbody>
      </table>
      }
    </>    
  );
};

export default Users;