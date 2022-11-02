import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import api from '../../api/';
import {useHistory} from 'react-router-dom';

const UpdateForm = ({user}) => {
  const getDefaultQualities = (data) => {
    const QualitiesList = Object.keys(data).map((optionName) => ({
      label: data[optionName].name,
      value: data[optionName]._id,
      color: data[optionName].color
    }));
    return QualitiesList;
  };

  const getDefaultProfession = (data) => {
    return data._id;
  };

  const [data, setData] = useState({
    email: user.email,
    name: user.name,
    profession: getDefaultProfession(user.profession),
    sex: user.sex,
    qualities: getDefaultQualities(user.qualities)
  });
  const [professions, setProfessions] = useState([]);
  const [qualities, setQualities] = useState([]);
  const history = useHistory();

  useEffect(() => {
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

  const handleChange = (target) => {
    setData((prevState) => ({...prevState, [target.name]: target.value}));
  };

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return {_id: prof.value, name: prof.label};
      }
    }
  };

  const getQualities = (elements) => {
    const qualitiesArray = [];
    for (const elem of elements) {
      for (const qual in qualities) {
        if (elem.value === qualities[qual].value) {
          qualitiesArray.push({
            _id: qualities[qual].value,
            name: qualities[qual].label,
            color: qualities[qual].color
          });
        }
      }
    }
    return qualitiesArray;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const {profession, qualities} = data;
    const updatedData = {
      ...user,
      ...data,
      profession: getProfessionById(profession),
      qualities: getQualities(qualities)
    };
    api.users.update(user._id, updatedData);
    history.push(`/users/${user._id}`);
  };

  const handleCancel = () => {
    history.replace(`/users/${user._id}`);
  };

  return (
    <form onSubmit={handleUpdate}>
      <TextField
        label={'Имя:'}
        name={'name'}
        value={data.name}
        onChange={handleChange}
        // error={errors.email}
      />
      <TextField
        label={'Электронная почта:'}
        name={'email'}
        value={data.email}
        onChange={handleChange}
        // error={errors.email}
      />
      <SelectField
        label='Выберите профессию:'
        name='profession'
        value={data.profession}
        defaultOption='Выберите профессию...'
        onChange={handleChange}
        options={professions}
        // error={errors.profession}
      />
      <RadioField
        options={[
          {name: 'Муж', value: 'male'},
          {name: 'Жен', value: 'female'}
        ]}
        value={data.sex}
        name='sex'
        onChange={handleChange}
        label='Укажите Ваш пол:'
      />
      <MultiSelectField
        name='qualities'
        options={qualities}
        onChange={handleChange}
        label='Выберите качества:'
        defaultValue={data.qualities}
      />
      <div className='d-flex flex-column align-items-center'>
        <button
          type='submit'
          // disabled={!isValid}
          className='btn btn-primary w-100 mx-auto mb-2'
        >
          Обновить
        </button>
        <button
          type='button'
          className='btn btn-secondary w-100 mx-auto mb-2'
          onClick={handleCancel}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};

UpdateForm.propTypes = {
  user: PropTypes.object
};

export default UpdateForm;
