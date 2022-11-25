import React from 'react';
import PropTypes from 'prop-types';
import {useProfession} from '../../hooks/useProfession';

const Profession = ({id}) => {
  const {isLoading, getProfession} = useProfession();

  const prof = getProfession(id);

  return <>{!isLoading ? <p>{prof.name}</p> : <p>loading...</p>}</>;
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
