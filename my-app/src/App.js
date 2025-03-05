import { React, useState, useEffect } from "react";
import { ulid } from "ulid";

import "./App.css";
import { LoginProvider } from "./useLoginStatus.js";
import LoginButton from "./LoginButton.js";
import MemoList from "./MemoList.js";
import SelectedMemoBar from "./SelectedMemoBar.js";

export default function App() {
  const [memos, setMemos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const allMemos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const contents = JSON.parse(localStorage.getItem(key));
      allMemos.push({ id: key, contents });
    }
    allMemos.sort((memo1, memo2) => (memo1.id < memo2.id ? -1 : 1));
    setMemos(allMemos);
  }, []);

  const selectedMemo = memos.find((memo) => memo.id === selectedId);

  function handleAdd() {
    setSelectedId(ulid());
  }

  function handleClick(id) {
    setSelectedId(id);
  }

  const handleSubmit = (e, content) => {
    e.preventDefault();
    const newContents = content.split("\n");
    setMemos((prevMemos) => {
      const memoExists = prevMemos.some((memo) => memo.id === selectedId);
      const updatedMemos = memoExists
        ? prevMemos.map((memo) =>
            memo.id === selectedId ? { ...memo, contents: newContents } : memo,
          )
        : [...prevMemos, { id: selectedId, contents: newContents }];
      return updatedMemos;
    });
    localStorage.setItem(selectedId, JSON.stringify(newContents));
  };

  function handleDelete() {
    setMemos((previousMemos) => {
      const updatedMemos = previousMemos.filter(
        (memo) => memo.id !== selectedId,
      );
      return updatedMemos;
    });
    localStorage.removeItem(selectedId);
    setSelectedId(null);
  }

  return (
    <LoginProvider>
      <div className="memo-app">
        <LoginButton />
        <div className="memo-details">
          <MemoList
            memos={memos}
            selectedId={selectedId}
            handleAdd={handleAdd}
            handleClick={handleClick}
          />
          {selectedId && (
            <SelectedMemoBar
              key={selectedId}
              selectedMemo={selectedMemo}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </LoginProvider>
  );
}
