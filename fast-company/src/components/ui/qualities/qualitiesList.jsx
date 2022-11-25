import React from 'react';
import PropTypes from 'prop-types';
import Qualitie from './qualitie';

const QualitiesList = ({qualities}) => {
  return (
    <>
      {qualities.map((q) => (
        <Qualitie
          key={q}
          id={q}
        />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string)
};

export default QualitiesList;
