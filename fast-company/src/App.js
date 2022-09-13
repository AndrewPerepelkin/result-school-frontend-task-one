import React, {useState} from 'react';
import api from './api';
import Users from './components/users';
import SearchStatus from './components/searchStatus';

const App = () => {
  const [users, setUsers] = useState(() => api.users.fetchAll());
  const handleDelete = (id) => setUsers(prevState => prevState.filter(user => user._id !== id));
  const handleToggelBookMark = (id) => setUsers(users.map(user => user._id === id ? {...user, bookmark: !user.bookmark} : user));
  return (
    <>
      <SearchStatus usersNumber={users.length} />
      <Users 
        users={users} 
        onDelete={handleDelete} 
        onToggelBookMark={handleToggelBookMark}
      />
    </>    
  );
};

export default App;