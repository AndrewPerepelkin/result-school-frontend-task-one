import React from 'react';
import PropTypes from 'prop-types';

const TextFied = ({label, type, name, value, onChange, error}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error}
    </div>
  );
};

TextFied.defaultProps = {
  type: 'text'
};

TextFied.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextFied;
