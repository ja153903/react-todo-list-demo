import React, { useState } from "react";

import Todo from "../Todos";
import {
  addTodo,
  deleteTodo,
  modifyTodo,
  useTodosStore
} from "../../contexts/Todos";

import "./TodosList.css";

function TodosList() {
  const {
    state: { todos },
    dispatch
  } = useTodosStore();

  const [todo, updateTodo] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addTodo(todo));
    updateTodo("");
  };

  const renderTodos = () => {
    if (todos.length === 0) {
      return <h2>You have no Todos</h2>;
    }

    return (
      <ul>
        {todos.map(({ todo }, index) => (
          <Todo
            index={index}
            key={index}
            todo={todo}
            onDelete={() => dispatch(deleteTodo(index))}
            onModify={modTodo => dispatch(modifyTodo(modTodo, index))}
          />
        ))}
      </ul>
    );
  };

  const renderAddTodos = () => (
    <div className="todos-add">
      <form onSubmit={handleSubmit}>
        <p>Enter a todo: </p>
        <input
          name="add-todo"
          value={todo}
          onChange={e => updateTodo(e.target.value)}
        />
        <button name="add-todo-btn">Add Todo</button>
      </form>
    </div>
  );

  return (
    <div className="todos">
      <div className="todos-render">
        <h1>Here are your todos</h1>
        {renderTodos()}
      </div>
      {renderAddTodos()}
    </div>
  );
}

export default TodosList;