import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import UpdateForm from '../../ui/updateForm';
import {useUsers} from '../../../hooks/useUsers';
import {useQualities} from '../../../hooks/useQualities';
import {useProfession} from '../../../hooks/useProfession';

const UserPageEdit = ({userId}) => {
  const [isLoading, setIsLoading] = useState(true);

  const {getUserById} = useUsers();
  const user = getUserById(userId);

  const {qualities, isLoading: isLoadingQual} = useQualities();
  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id,
    color: qual.color
  }));
  const {professions, isLoading: isLoadingProf} = useProfession();
  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id
  }));

  useEffect(() => {
    if (!isLoadingQual && !isLoadingProf && user?._id) setIsLoading(false);
  }, [isLoadingQual, isLoadingProf, user]);

  return (
    <>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 offset-md-3 shadow p-4'>
            {!isLoading && professions.length > 0 ? (
              <>
                <h3 className='text-center mb-4'>
                  Изменение данных пользователя
                </h3>

                <UpdateForm
                  user={user}
                  professions={professionsList}
                  qualities={qualitiesList}
                />
              </>
            ) : (
              <div className='text-center mb-4'>Загрузка...</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

UserPageEdit.propTypes = {
  userId: PropTypes.string
};

export default UserPageEdit;
