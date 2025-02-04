import React from "react";
import PropTypes from "prop-types";

import Memo from "./Memo.js";

export default function MemoList({
  memos,
  selectedId,
  handleAdd,
  handleClick,
}) {
  return (
    <ul className="memo-list">
      {memos.map((memo) => (
        <li
          key={memo.id}
          className={selectedId === memo.id ? "selected-text" : "text-list"}
        >
          <Memo memo={memo} handleClick={handleClick} />
        </li>
      ))}
      <div className="add-memo" onClick={handleAdd}>
        +
      </div>
    </ul>
  );
}

MemoList.propTypes = {
  memos: PropTypes.array,
  selectedId: PropTypes.string,
  handleAdd: PropTypes.func,
  handleClick: PropTypes.func,
};
