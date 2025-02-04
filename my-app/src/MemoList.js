import React from 'react';
import PropTypes from 'prop-types';

import Memo from './Memo.js'

export default function MemoList({ memos, handleAdd, handleClick }) {
  return (
    <ul>
      {memos.map((memo) => (
        <li key={memo.id}>
          <Memo memo={memo} handleClick={handleClick} />
        </li>
      ))}
      <div className="addMemo" onClick={handleAdd}>
        +
      </div>
    </ul>
  );
}

MemoList.propTypes = {
  memos: PropTypes.array,
  handleAdd: PropTypes.func,
  handleClick: PropTypes.func,
};
