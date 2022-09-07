import React, {useState} from "react";
import api from "../api";
import UsersData from "./usersData";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  
  const renderPhrase = (n) => {
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

  const handleDelete = (id) => setUsers(prevState => prevState.filter(user => user._id !== id))

  return (
    <>
      <h2>
        <span className={(users.length === 0) ? 
          'badge bg-danger' : 
          'badge bg-primary'}>
          {renderPhrase(users.length)}
        </span>
      </h2>

      {!!users.length && 
      
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
          <UsersData users={users} handleDelete={handleDelete} />
        </tbody>
      </table>
      }
    </>    
  );
};

export default Users;