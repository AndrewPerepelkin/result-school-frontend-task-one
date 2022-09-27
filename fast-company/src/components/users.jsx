import React, { useEffect, useState } from 'react';
import { paginate } from '../utils/paginate';
import Pagination from './pagination';
import User from './user';
import api from '../api';
import SearchStatus from './searchStatus';
import GroupList from './groupList';
import PropTypes from 'prop-types';

const Users = ({ users: allUsers, ...rest }) => {
  const pageSize = 2;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  const handleProfessionSelect = (item) => setSelectedProf(item);
  const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
  const handleProfessionReset = () => setSelectedProf();

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => setCurrentPage(1), [selectedProf]);

  const filteredUsers = selectedProf
    ? allUsers.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
    : allUsers;
  const count = filteredUsers.length;
  const usersCrop = paginate(filteredUsers, currentPage, pageSize);
  return (
    <div className='d-flex'>
      {professions && (
        <div className='d-flex flex-column flex-shrink-0 p-3'>
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button
            className='btn btn-secondary mt-2'
            onClick={handleProfessionReset}
          >
            Сброс фильтра
          </button>
        </div>
      )}
      <div className='d-flex flex-column'>
        <SearchStatus length={count} />
        {!!count && (
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Имя</th>
                <th scope='col'>Качества</th>
                <th scope='col'>Профессия</th>
                <th scope='col'>Встретился, раз</th>
                <th scope='col'>Оценка</th>
                <th scope='col'>Избранное</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {usersCrop.map((user) => (
                <User
                  key={user._id}
                  {...rest}
                  {...user}
                />
              ))}
            </tbody>
          </table>
        )}
        <div className='d-flex justify-content-center'>
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
