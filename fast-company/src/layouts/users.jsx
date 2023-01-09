import React, {useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import UserPageEdit from '../components/page/userPageEdit';
import {UsersProvider} from '../hooks/useUsers';
import {useAuth} from '../hooks/useAuth';
import {useDispatch, useSelector} from 'react-redux';
import {getDataLoadingStatus, loadUsersList} from '../store/users';

const Users = () => {
  const {userId, edit} = useParams();
  const {currentUser} = useAuth();
  const dispatch = useDispatch();
  const dataStatus = useSelector(getDataLoadingStatus());

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, []);

  if (!dataStatus) return 'Загрузка...';

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
