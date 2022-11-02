import React from 'react';
import PropTypes from 'prop-types';

const UpdateForm = ({user}) => {
  return <div>{user.name}</div>;
};

UpdateForm.propTypes = {
  user: PropTypes.object
};

export default UpdateForm;
