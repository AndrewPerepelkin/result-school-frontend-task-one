import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {Link} from 'react-router-dom';

const TableBody = ({data, columns}) => {
  const renderComponent = (item, column) => {
    const component = columns[column].component;
    const link = columns[column].link;
    if (component) {
      if (typeof component === 'function') {
        return component(item);
      }
      return component;
    }
    if (link) {
      const title = _.get(item, columns[column].path);
      return <Link to={`/users/${item._id}`}>{title}</Link>;
    }
    return _.get(item, columns[column].path);
  };
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((column) => (
            <td key={column}>{renderComponent(item, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableBody;
