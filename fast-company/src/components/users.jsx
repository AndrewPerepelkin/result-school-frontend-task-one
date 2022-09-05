import React, {useState} from "react";
import api from "../api";
import UsersData from "./usersData";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const renderSumUsersMessage = () => {
    const setMessage = (n) => {
      if (n === 0) {
        return 'Никто с тобой не тусанет';
      } else if (String(n).endsWith('1')) {
        return n + ' человек тусанет с тобой сегодня';
      } else if ((n < 10 || n > 20) && (String(n).endsWith('2') || String(n).endsWith('3') || String(n).endsWith('4'))) {
        return n + ' человека тусанет с тобой сегодня';
      } else {
        return n + ' человек тусанет с тобой сегодня';
      }
    }

    return (
      <h1>
        <span className={(users.length === 0) ? 
          'badge bg-danger' : 
          'badge bg-primary'}>
          {setMessage(users.length)}
        </span>
      </h1>
    )
  }

  const handlerUserDelete = (id) => setUsers(prevState => prevState.filter(user => user !== id))

  return (
    <>
      {renderSumUsersMessage(users.length)}

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
          <UsersData users={users} deleteUser={handlerUserDelete} />
        </tbody>
      </table>
      }
    </>    
  );
};

export default Users;