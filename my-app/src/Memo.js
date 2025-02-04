import React from "react";
import PropTypes from "prop-types";

export default function Memo({ memo, handleClick }) {
  return (
    <div
      onClick={() => {
        handleClick(memo.id);
      }}
    >
      {memo.contents[0]}
    </div>
  );
}

Memo.propTypes = {
  memo: PropTypes.object,
  handleClick: PropTypes.func,
};
