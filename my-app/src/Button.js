import React from "react";
import PropTypes from "prop-types";

export default function Button({ type, className, onClick, children }) {
  return (
    <>
        <button type={type} className={className} onClick={onClick}>
          {children}
        </button>
    </>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};
