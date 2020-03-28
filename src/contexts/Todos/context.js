import React, { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";

const initialState = {
  todos: []
};

const TodosContext = createContext();

const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

const useTodosStore = () => useContext(TodosContext);

export { TodosProvider, useTodosStore };
