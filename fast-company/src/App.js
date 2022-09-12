import React, {useState} from 'react';
import api from './api';
import UsersData from './components/usersData';
import SearchStatus from './components/searchStatus';

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  
  const handleDelete = (id) => setUsers(prevState => prevState.filter(user => user._id !== id))

  return (
    <>
      <SearchStatus usersNumber={users.length} />

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

export default App;