import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({children, name, value, onChange}) => {
  const handleChange = () => {
    onChange({name, value: !value});
  };
  return (
    <div className='form-check'>
      <input
        className='form-check-input'
        type='checkbox'
        checked={value}
        id={name}
        onChange={handleChange}
      />
      <label
        className='form-check-label'
        htmlFor={name}
      >
        {children}
      </label>
    </div>
  );
};

CheckBoxField.propTypes = {
  children: PropTypes.oneOfType(
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ),
  name: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func
};

export default CheckBoxField;
