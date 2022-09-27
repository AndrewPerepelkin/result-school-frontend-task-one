import React, { useEffect, useState } from 'react';
import api from './api';
import Users from './components/users';

const App = () => {
  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (id) =>
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  const handleToggeleBookMark = (id) =>
    setUsers(
      users.map((user) =>
        user._id === id ? { ...user, bookmark: !user.bookmark } : user
      )
    );
  return (
    <>
      {users && (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookMark={handleToggeleBookMark}
        />
      )}
    </>
  );
};

export default App;
