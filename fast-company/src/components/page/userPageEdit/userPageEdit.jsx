import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import UpdateForm from '../../ui/updateForm';

const UserPageEdit = ({userId}) => {
  const [user, setUser] = useState({});
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then((data) => setUser(data));

    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }));
      setProfessions(professionsList);
    });

    api.qualities.fetchAll().then((data) => {
      const QualitiesList = Object.keys(data).map((optionName) => ({
        label: data[optionName].name,
        value: data[optionName]._id,
        color: data[optionName].color
      }));
      setQualities(QualitiesList);
    });
  }, []);
  useEffect(() => {
    if (user?._id) setIsLoading(false);
  }, [user]);

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
                  professions={professions}
                  qualities={qualities}
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
