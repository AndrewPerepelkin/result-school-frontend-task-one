import React from 'react';
import {useParams} from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import UserPageEdit from '../components/page/userPageEdit';

const Users = () => {
  const {userId, edit} = useParams();

  return (
    <>
      {userId ? (
        edit ? (
          <UserPageEdit userId={userId} />
        ) : (
          <UserPage id={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
