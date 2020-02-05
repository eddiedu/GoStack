import React from 'React';

import PropTypes from 'prop-types';

function TechListItem({ tech, onDelete }) {
  return (
    <li>
      {tech}
      <button type="button" onClick={onDelete}>X</button>
    </li>
  );
}

TechListItem.defaultProps = {
  tech: 'Oculto',
};

TechListItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};


export default TechListItem;
