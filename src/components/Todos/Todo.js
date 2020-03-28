import React, { useState } from "react";

function Todo({ todo, index, onDelete, onModify }) {
  const [edited, updateEdited] = useState("");
  const [editMode, updateEditMode] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    onModify(edited);
    updateEditMode(false);
  };

  const renderTodo = () => {
    if (editMode) {
      return (
        <form onSubmit={handleSubmit}>
          <input
            name="editMode-input"
            value={edited}
            onChange={e => updateEdited(e.target.value)}
          />
          <button name="editMode-btn">Modify</button>
        </form>
      );
    }

    return <p>{todo}</p>;
  };

  return (
    <li name={index} key={index}>
      {renderTodo()}
      <button name="remove-button" onClick={() => onDelete(index)}>
        Delete
      </button>
      <button
        name="edit-button"
        onClick={() => updateEditMode(true)}
        disabled={editMode}
      >
        Edit
      </button>
    </li>
  );
}

export default Todo;
