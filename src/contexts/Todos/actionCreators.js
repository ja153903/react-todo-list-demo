import { ADD_TODO, DELETE_TODO, MODIFY_TODO } from "./constants";

function addTodo(todo) {
  return {
    todo,
    type: ADD_TODO
  };
}

function deleteTodo(key) {
  return {
    key,
    type: DELETE_TODO
  };
}

function modifyTodo(todo, key) {
  return {
    key,
    todo,
    type: MODIFY_TODO
  };
}

export { addTodo, deleteTodo, modifyTodo };
