import { React, useState } from "react";

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

  const [memos, setMemos] = useState(allMemos);
  const [selectedId, setSelectedId] = useState(null);
  const [contents, setContents] = useState("新規メモ");
  const [isEditing, setIsEditing] = useState(false);

  function handleAdd() {
    setSelectedId(null);
    setContents("新規メモ");
    setIsEditing(true);
  }

  function handleClick(id) {
    setSelectedId(id);
    const memo = memos.find((memo) => memo.id === id);
    setContents(memo.contents.join("\n"));
    setIsEditing(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newContents = contents.split("\n");
    const newId = crypto.randomUUID();
    if (selectedId) {
      setMemos((previousMemos) => {
        const updatedMemos = previousMemos.map((memo) =>
          memo.id === selectedId ? { ...memo, contents: newContents } : memo,
        );
        return updatedMemos;
      });
      localStorage.setItem(selectedId, JSON.stringify(newContents));
    } else {
      setMemos((previousMemos) => [
        ...previousMemos,
        { id: newId, contents: newContents },
      ]);
      localStorage.setItem(newId, JSON.stringify(newContents));
      setSelectedId(newId);
    }
  }

  function handleChange(e) {
    setContents(e.target.value);
  }

  function handleDelete() {
    localStorage.removeItem(selectedId);
    if (selectedId) {
      setMemos((previousMemos) => {
        const updatedMemos = previousMemos.filter(
          (memo) => memo.id !== selectedId,
        );
        return updatedMemos;
      });
    }
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
      <SelectedMemoBar
        contents={contents}
        isEditing={isEditing}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleDelete={handleDelete}
      />
    </div>
  );
}
