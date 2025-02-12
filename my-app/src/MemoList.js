import React, { useContext } from "react";
import PropTypes from "prop-types";

import Memo from "./Memo.js";
import { LoginContext } from "./App.js";

export default function MemoList({
  memos,
  selectedId,
  handleAdd,
  handleClick,
}) {
  const login = useContext(LoginContext);
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
      {login && (
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
