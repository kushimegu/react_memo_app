import React from 'react';
import PropTypes from 'prop-types';

export default function SelectedMemoBar({
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
