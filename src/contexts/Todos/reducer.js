import { ADD_TODO, DELETE_TODO, MODIFY_TODO } from "./constants";

function reducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [...state.todos, { todo: action.todo }]
      };
    case MODIFY_TODO:
      return {
        todos: state.todos.map((value, index) => {
          if (index === action.key) {
            return {
              ...value,
              todo: action.todo
            };
          }

          return value;
        })
      };
    case DELETE_TODO:
      return {
        todos: state.todos.filter((_, index) => index !== action.key)
      };
    default:
      return state;
  }
}

export { reducer };
