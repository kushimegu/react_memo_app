import { React, useState } from 'react';
import PropTypes from 'prop-types';

import './App.css';

function Memo({ memo, handleClick }) {
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
  key: PropTypes.string,
};

function MemoList({ memos, handleAdd, handleClick }) {
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

function SelectedMemoBar({
  contents,
  isEditing,
  handleSubmit,
  handleChange,
  handleDelete,
}) {
  return (
    <div className="selectedMemoBar">
      {isEditing && (
        <div className="selectedMemoDetail">
          <form onSubmit={handleSubmit}>
            <textarea
              value={contents}
              onChange={handleChange}
            />
            <button type="submit" className="edit-btn">
              編集
            </button>
          </form>
          <button type="delete" className="delete-btn" onClick={handleDelete}>
            削除
          </button>
        </div>
      )}
    </div>
  );
}
SelectedMemoBar.propTypes = {
  contents: PropTypes.array,
  isEditing: PropTypes.bool,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default function App() {
  const [memos, setMemos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [contents, setContents] = useState('新規メモ');
  const [isEditing, setIsEditing] = useState(false);

  function handleClick(id) {
    setSelectedId(id);
    const memo = memos.find((memo) => memo.id === id);
    setContents(memo.contents.join('\n'));
    setIsEditing(true);
  }

  function handleAdd() {
    setSelectedId(null);
    setContents('新規メモ');
    setIsEditing(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newContents = contents.split('\n');
    const newId = crypto.randomUUID();
    setMemos((prevMemos) => {
      const memoExists = prevMemos.some((memo) => memo.id === selectedId);
      let updatedMemos;
      if (memoExists) {
        updatedMemos = prevMemos.map((memo) =>
          memo.id === selectedId ? { ...memo, contents: newContents } : memo
        );
      } else {
        updatedMemos = [...prevMemos, { id: newId, contents: newContents }];
        setSelectedId(newId);
      }
      return updatedMemos;
    });
    if (!selectedId) {
      localStorage.setItem(newId, JSON.stringify(newContents));
    } else {
      localStorage.setItem(selectedId, JSON.stringify(newContents));
    }
  }

  function handleChange(e) {
    setContents(e.target.value);
  }

  function handleDelete() {
    localStorage.removeItem(selectedId);
    if (selectedId) {
      setMemos((prevMemos) => {
        const updatedMemos = prevMemos.filter((memo) => memo.id !== selectedId);
        return updatedMemos;
      });
    }
    setIsEditing(false);
  }

  return (
    <>
      <div className="memoDetails">
        <MemoList
          memos={memos}
          handleAdd={handleAdd}
          handleClick={handleClick}
        />
        <SelectedMemoBar
          contents={contents}
          isEditing={isEditing}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}
