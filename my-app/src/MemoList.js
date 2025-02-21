import React from "react";
import PropTypes from "prop-types";

import Memo from "./Memo.js";
import { useLoginStatus } from "./useLoginStatus.js";

export default function MemoList({
  memos,
  selectedId,
  handleAdd,
  handleClick,
}) {
  const { isLoggedIn } = useLoginStatus();

  return (
    <ul className="memo-list">
      {memos.map((memo) => (
        <li
          key={memo.id}
          className={selectedId === memo.id ? "selected-title" : "title-list"}
        >
          <Memo memo={memo} handleClick={handleClick} />
        </li>
      ))}
      {isLoggedIn && (
        <div className="plus-sign" onClick={handleAdd}>
          +
        </div>
      )}
    </ul>
  );
}

MemoList.propTypes = {
  memos: PropTypes.array,
  selectedId: PropTypes.string,
  handleAdd: PropTypes.func,
  handleClick: PropTypes.func,
};
