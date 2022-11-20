import React from 'react';
import PropTypes from 'prop-types';

const index = (props) => {
  return (
    <button
      style={{ bgColor: props.bgColor, borderRadius: props.borderRadius, color: props.color }}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

index.propTypes = {
  children: PropTypes.node,
  bgColor: PropTypes.string,
  borderRadius: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default index;
