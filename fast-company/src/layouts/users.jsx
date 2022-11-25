import React from 'react';
import {useParams} from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import UserPageEdit from '../components/page/userPageEdit';
import UsersProvider from '../hooks/useUsers';

const Users = () => {
  const {userId, edit} = useParams();

  return (
    <>
      <UsersProvider>
        {userId ? (
          edit ? (
            <UserPageEdit userId={userId} />
          ) : (
            <UserPage id={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersProvider>
    </>
  );
};

export default Users;
