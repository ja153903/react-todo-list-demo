import React from "react";

import Todos from "./components/Todos";
import { TodosProvider } from "./contexts/Todos";

import "./App.css";

function App() {
  return (
    <div className="App">
      <TodosProvider>
        <Todos />
      </TodosProvider>
    </div>
  );
}

export default App;
