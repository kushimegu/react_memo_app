import { React, useState, useContext } from "react";
import PropTypes from "prop-types";

import Button from "./Button.js";
import { LoginContext } from "./App.js";

export default function SelectedMemoBar({
  initialMemoContent,
  handleSubmit,
  handleDelete,
}) {
  const [content, setContent] = useState(initialMemoContent);

  const onSubmit = (e) => {
    handleSubmit(e, content);
  };

  function handleChange(e) {
    setContent(e.target.value);
  }

  const login = useContext(LoginContext);
  return (
    <div className="selected-memo-bar">
      {login ? (
        <div>
          <form onSubmit={onSubmit}>
            <textarea value={content} onChange={handleChange} />
            <Button type="submit" className="edit-btn">
              編集
            </Button>
          </form>
          <Button type="delete" className="delete-btn" onClick={handleDelete}>
            削除
          </Button>
        </div>
      ) : (
        <textarea value={content}></textarea>
      )}
    </div>
  );
}

SelectedMemoBar.propTypes = {
  initialMemoContent: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleDelete: PropTypes.func,
};
