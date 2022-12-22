import React from 'react';
import {Redirect, useParams} from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import UserPageEdit from '../components/page/userPageEdit';
import {UsersProvider} from '../hooks/useUsers';
import {useAuth} from '../hooks/useAuth';

const Users = () => {
  const {userId, edit} = useParams();
  const {currentUser} = useAuth();

  return (
    <>
      <UsersProvider>
        {userId ? (
          edit ? (
            userId === currentUser._id ? (
              <UserPageEdit userId={userId} />
            ) : (
              <Redirect to={`/users/${currentUser._id}/edit`} />
            )
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
