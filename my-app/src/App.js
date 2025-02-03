import { React, useState } from 'react';

import './App.css';

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
        <ul className="memoList">
          {memos.map((memo) => (
            <li key={memo.id}>
              <div
                onClick={() => {
                  handleClick(memo.id);
                }}
              >
                {memo.contents[0]}
              </div>
            </li>
          ))}
          <div className="addMemo" onClick={handleAdd}>
            +
          </div>
        </ul>
        <div className="selectedMemoBar">
          {isEditing && (
            <div className="selectedMemoDetail">
              <form onSubmit={handleSubmit}>
                <textarea
                  type="text"
                  name="memo"
                  value={contents}
                  onChange={handleChange}
                />
                <button type="submit" className="edit">
                  編集
                </button>
              </form>
              <button type="delete" className="delete" onClick={handleDelete}>
                削除
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
