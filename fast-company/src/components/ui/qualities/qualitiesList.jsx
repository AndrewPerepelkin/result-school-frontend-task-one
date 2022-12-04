import React from 'react';
import PropTypes from 'prop-types';
import Qualitie from './qualitie';
import {useQualities} from '../../../hooks/useQualities';

const QualitiesList = ({qualities}) => {
  const {isLoading} = useQualities();
  return (
    <>
      {!isLoading ? (
        qualities.map((q) => (
          <Qualitie
            key={q}
            id={q}
          />
        ))
      ) : (
        <span>загрузка...</span>
      )}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string)
};

export default QualitiesList;
