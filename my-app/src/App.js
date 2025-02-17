import { React, useState } from "react";
import { ulid } from "ulid";

import "./App.css";
import MemoList from "./MemoList.js";
import SelectedMemoBar from "./SelectedMemoBar.js";

export default function App() {
  const allMemos = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const contents = JSON.parse(localStorage.getItem(key));
    allMemos.push({ id: key, contents });
  }
  allMemos.sort((memo1, memo2) => (memo1.id < memo2.id ? -1 : 1));

  const [memos, setMemos] = useState(allMemos);
  const [status, setStatus] = useState({
    selectedId: null,
    isEditing: false,
  });

  const selectedMemo = memos.find((memo) => memo.id === status.selectedId);
  const selectedMemoContent = status.selectedId
    ? selectedMemo.contents.join("\n")
    : "新規メモ";

  function handleAdd() {
    setStatus({ selectedId: null, isEditing: true });
  }

  function handleClick(id) {
    setStatus({ selectedId: id, isEditing: true });
  }

  const handleSubmit = (e, content) => {
    e.preventDefault();
    const newContent = content.split("\n");
    const newId = ulid();
    if (status.selectedId) {
      setMemos((previousMemos) => {
        const updatedMemos = previousMemos.map((memo) =>
          memo.id === status.selectedId
            ? { ...memo, contents: newContent }
            : memo,
        );
        return updatedMemos;
      });
      localStorage.setItem(status.selectedId, JSON.stringify(newContent));
    } else {
      setMemos((previousMemos) => [
        ...previousMemos,
        { id: newId, contents: newContent },
      ]);
      localStorage.setItem(newId, JSON.stringify(newContent));
      setStatus({ selectedId: newId, isEditing: true });
    }
  };

  function handleDelete() {
    setMemos((previousMemos) => {
      const updatedMemos = previousMemos.filter(
        (memo) => memo.id !== status.selectedId,
      );
      return updatedMemos;
    });
    localStorage.removeItem(status.selectedId);
    setStatus({ selectedId: null, isEditing: false });
  }

  return (
    <div className="memo-app">
      <MemoList
        memos={memos}
        selectedId={status.selectedId}
        handleAdd={handleAdd}
        handleClick={handleClick}
      />
      {status.isEditing && (
        <SelectedMemoBar
          key={status.selectedId}
          initialMemoContent={selectedMemoContent}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}
