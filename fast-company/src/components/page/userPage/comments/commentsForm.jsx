import React from 'react';
// import PropTypes from 'prop-types';
import CardWrapper from '../../../common/Card';

const CommentsForm = (props) => {
  return (
    <CardWrapper>
      <div>
        <h2>New comment</h2>
        <div className='mb-4'>
          <select
            className='form-select'
            name='userId'
            value=''
          >
            <option
              disabled
              value=''
              selected
            >
              Выберите пользователя
            </option>

            <option>Доктор</option>
            <option>Тусер</option>
          </select>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='exampleFormControlTextarea1'
            className='form-label'
          >
            Сообщение
          </label>
          <textarea
            className='form-control'
            id='exampleFormControlTextarea1'
            rows='3'
          ></textarea>
        </div>
      </div>
    </CardWrapper>
  );
};

CommentsForm.propTypes = {};

export default CommentsForm;
