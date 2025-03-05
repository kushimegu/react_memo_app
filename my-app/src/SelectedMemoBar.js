import { React, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useLoginStatus } from "./useLoginStatus.js";
import Button from "./Button.js";

export default function SelectedMemoBar({
  initialMemoContent,
  handleSubmit,
  handleDelete,
}) {
  const [content, setContent] = useState(initialMemoContent);
  const { isLoggedIn } = useLoginStatus();

  useEffect(() => {
    if (!isLoggedIn && content !== initialMemoContent) {
      setContent(initialMemoContent);
    }
  }, [isLoggedIn]);

  const onSubmit = (e) => {
    handleSubmit(e, content);
  };

  function handleChange(e) {
    setContent(e.target.value);
  }

  return (
    <div className="selected-memo-bar">
      {isLoggedIn ? (
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
        <textarea value={content} readOnly></textarea>
      )}
    </div>
  );
}

SelectedMemoBar.propTypes = {
  initialMemoContent: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleDelete: PropTypes.func,
};
