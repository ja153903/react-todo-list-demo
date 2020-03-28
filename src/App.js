import React from "react";

import TodosList from "./components/TodosList";
import { TodosProvider } from "./contexts/Todos";

import "./App.css";

function App() {
  return (
    <div className="App">
      <TodosProvider>
        <TodosList />
      </TodosProvider>
    </div>
  );
}

export default App;
