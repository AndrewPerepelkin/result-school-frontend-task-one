import React from 'react';
import PropTypes from 'prop-types';
import {useQualities} from '../../../hooks/useQualities';
const Qualitie = ({id}) => {
  const {isLoading, getQuality} = useQualities();
  const qual = getQuality(id);
  return (
    <>
      {!isLoading ? (
        <span className={`badge m-1 bg-${qual.color}`}>{qual.name}</span>
      ) : (
        <span>загрузка...</span>
      )}
    </>
  );
};

Qualitie.propTypes = {
  id: PropTypes.string
};

export default Qualitie;
