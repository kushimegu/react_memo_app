import { React, useState } from "react";
import PropTypes from "prop-types";

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

  return (
    <div className="selected-memo-bar">
      <div>
        <form onSubmit={onSubmit}>
          <textarea value={content} onChange={handleChange} />
          <button type="submit" className="edit-btn">
            編集
          </button>
        </form>
        <button type="delete" className="delete-btn" onClick={handleDelete}>
          削除
        </button>
      </div>
    </div>
  );
}

SelectedMemoBar.propTypes = {
  initialMemoContent: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleDelete: PropTypes.func,
};
