import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import {useSelector} from 'react-redux';
import {
  getQualitiesByIds,
  getQualitiesLoadingStatus
} from '../../../store/qualities';

const QualitiesList = ({qualities}) => {
  const isLoading = useSelector(getQualitiesLoadingStatus());
  const qualitiesList = useSelector(getQualitiesByIds(qualities));

  if (isLoading) return <span>загрузка...</span>;

  return (
    <>
      {qualitiesList.map((q) => (
        <Quality
          key={q._id}
          color={q.color}
          name={q.name}
        />
      ))}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.arrayOf(PropTypes.string)
};

export default QualitiesList;
