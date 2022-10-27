import React, {useEffect, useState} from 'react';
import {paginate} from '../utils/paginate';
import Pagination from './pagination';
import api from '../api';
import SearchStatus from './searchStatus';
import GroupList from './groupList';
import UsersTable from './usersTable';
import _ from 'lodash';
import PropTypes from 'prop-types';
import TextField from './textField';

const UsersList = () => {
  const [users, setUsers] = useState();
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({path: 'name', order: 'asc'});
  const [searchValue, setSearchValue] = useState('');

  const handleProfessionSelect = (item) => setSelectedProf(item);
  const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
  const handleProfessionReset = () => setSelectedProf();
  const handleOnSort = (item) => setSortBy(item);
  const handleSearch = (e) => setSearchValue(e.target.value);

  const handleDelete = (id) =>
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  const handleToggeleBookMark = (id) =>
    setUsers(
      users.map((user) =>
        user._id === id ? {...user, bookmark: !user.bookmark} : user
      )
    );
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
    setSearchValue('');
  }, [selectedProf]);

  const handleToggleInputSearch = () => {
    setSelectedProf();
  };

  if (users) {
    let filteredUsers = users;
    if (searchValue) {
      filteredUsers = users.filter((user) => {
        const regExp = new RegExp(searchValue, 'gmi');
        return user.name.match(regExp);
      });
    }
    if (selectedProf) {
      filteredUsers = users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      );
    }

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <>
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
            <TextField
              placeholder={'Поиск...'}
              value={searchValue}
              onInput={handleSearch}
              onFocus={handleToggleInputSearch}
            />
            {!!count && (
              <UsersTable
                users={usersCrop}
                onSort={handleOnSort}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onToggleBookMark={handleToggeleBookMark}
              />
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
      </>
    );
  }
  return 'loading...';
};

UsersList.propTypes = {
  users: PropTypes.array
};

export default UsersList;
