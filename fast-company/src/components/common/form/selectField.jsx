import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
  label,
  id,
  name,
  value,
  onChange,
  defaultOption,
  options,
  error
}) => {
  const getSelectClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : ' mb-4');
  };
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          _id: options[optionName]._id
        }))
      : options;
  return (
    <>
      <label
        htmlFor={id}
        className='form-label'
      >
        {label}
      </label>
      <select
        name={name}
        id={id}
        className={getSelectClasses()}
        value={value}
        onChange={onChange}
      >
        <option
          disabled
          value=''
          key={'123'}
        >
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option
              key={option._id}
              value={option._id}
            >
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className='invalid-feedback mb-4'>{error}</div>}
    </>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  error: PropTypes.string
};

export default SelectField;
