import React, { useContext } from "react";
import PropTypes from "prop-types";

import Button from "./Button.js";
import { LoginContext } from "./App.js";

export default function SelectedMemoBar({
  contents,
  isEditing,
  handleSubmit,
  handleChange,
  handleDelete,
}) {
  const login = useContext(LoginContext);
  return (
    <div className="selected-memo-bar">
      {login ? (
        isEditing ? (
          <div>
            <form onSubmit={handleSubmit}>
              <textarea value={contents} onChange={handleChange} />
              <Button type="submit" className="edit-btn">
                編集
              </Button>
            </form>
            <Button type="delete" className="delete-btn" onClick={handleDelete}>
              削除
            </Button>
          </div>
        ) : (
          ""
        )
      ) : isEditing ? (
        <textarea value={contents}></textarea>
      ) : (
        ""
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
