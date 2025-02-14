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
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const selectedMemo = memos.find((memo) => memo.id === selectedId);
  const selectedMemoContent = selectedId
    ? selectedMemo.contents.join("\n")
    : "新規メモ";

  function handleAdd() {
    setSelectedId(null);
    setIsEditing(true);
  }

  function handleClick(id) {
    setSelectedId(id);
    setIsEditing(true);
  }

  const handleSubmit = (e, content) => {
    e.preventDefault();
    const newContent = content.split("\n");
    const newId = ulid();
    if (selectedId) {
      setMemos((previousMemos) => {
        const updatedMemos = previousMemos.map((memo) =>
          memo.id === selectedId ? { ...memo, contents: newContent } : memo,
        );
        return updatedMemos;
      });
      localStorage.setItem(selectedId, JSON.stringify(newContent));
    } else {
      setMemos((previousMemos) => [
        ...previousMemos,
        { id: newId, contents: newContent },
      ]);
      localStorage.setItem(newId, JSON.stringify(newContent));
      setSelectedId(newId);
    }
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
    setIsEditing(false);
  }

  return (
    <div className="memo-app">
      <MemoList
        memos={memos}
        selectedId={selectedId}
        handleAdd={handleAdd}
        handleClick={handleClick}
      />
      {isEditing && (
        <SelectedMemoBar
          key={selectedId}
          initialMemoContent={selectedMemoContent}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
}
