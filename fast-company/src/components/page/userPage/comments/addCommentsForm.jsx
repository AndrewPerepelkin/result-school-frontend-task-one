import React, {useState, useEffect} from 'react';
import api from '../../../../api';
import {validator} from '../../../../utils/validator';
import SelectField from '../../../common/form/selectField';
import TextAreaField from '../../../common/form/textAreaField';
import PropTypes from 'prop-types';

const initialData = {userId: '', content: ''};

const AddCommentsForm = ({onSubmit}) => {
  const [usersNames, setUsersNames] = useState([]);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(initialData);

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      const usersNamesList = data.map((user) => ({
        label: user.name,
        value: user._id
      }));
      setUsersNames(usersNamesList);
    });
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({...prevState, [target.name]: target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    setData(initialData);
    setErrors({});
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'Обязательно выберите пользователя'
      }
    },
    content: {
      isRequired: {
        message: 'Текст комментария не должен быть пустым'
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          name={'userId'}
          value={data.userId}
          onChange={handleChange}
          defaultOption='Выберите пользователя'
          options={usersNames}
          error={errors.userId}
        />
        <TextAreaField
          name='content'
          label='Сообщение'
          value={data.content}
          onChange={handleChange}
          rowsSize='3'
          error={errors.content}
        />
        <div className='d-flex justify-content-end'>
          <button
            type='submit'
            className='btn btn-primary mt-2'
          >
            Опубликовать
          </button>
        </div>
      </form>
    </>
  );
};

AddCommentsForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddCommentsForm;
