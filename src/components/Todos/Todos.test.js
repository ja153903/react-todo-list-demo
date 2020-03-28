import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

import Todos from "./Todos";
import {
  useTodosStore,
  TodosProvider,
  addTodo,
  deleteTodo,
  modifyTodo
} from "../../contexts/Todos";

const wrapper = ({ children }) => <TodosProvider>{children}</TodosProvider>;

describe("TodosList UI Tests", () => {
  afterEach(cleanup);

  test("Should see <h1>Here are your todos</h1>", () => {
    const { getByText } = render(<Todos />, { wrapper });
    expect(getByText("Here are your todos")).toBeInTheDocument();
  });

  test("Should see <h2>You have no Todos</h2> since empty", () => {
    const { getByText } = render(<Todos />, { wrapper });
    expect(getByText("You have no Todos")).toBeInTheDocument();
  });

  test("If we add a Todo, we should be able to see it in an unordered list", () => {
    const { container, getByText } = render(<Todos />, { wrapper });
    const todo = container.querySelector("input[name='add-todo']");
    const submit = container.querySelector("button");

    fireEvent.change(todo, {
      target: {
        value: "Debug production directly. In and out. Just 10 minutes."
      }
    });

    fireEvent.click(submit);

    expect(
      getByText("Debug production directly. In and out. Just 10 minutes.")
    ).toBeInTheDocument();
  });

  test("Suppose we have a Todo, we should be able to click it and remove it from the list", () => {
    const { container, getByText } = render(<Todos />, { wrapper });
    const todo = container.querySelector("input[name='add-todo']");
    const submit = container.querySelector("button[name='add-todo-btn']");

    fireEvent.change(todo, {
      target: {
        value: "Debug production directly. In and out. Just 10 minutes."
      }
    });

    fireEvent.click(submit);

    expect(
      getByText("Debug production directly. In and out. Just 10 minutes.")
    ).toBeInTheDocument();

    const remove = container.querySelector(
      "li[name='0'] > button[name='remove-button']"
    );

    fireEvent.click(remove);

    expect(getByText("You have no Todos")).toBeInTheDocument();
  });

  test("Modify a Todo", () => {
    const { container, getByText } = render(<Todos />, { wrapper });
    const todo = container.querySelector("input[name='add-todo']");
    const submit = container.querySelector("button[name='add-todo-btn']");

    fireEvent.change(todo, {
      target: {
        value: "Debug production directly. In and out. Just 10 minutes."
      }
    });

    fireEvent.click(submit);

    expect(
      getByText("Debug production directly. In and out. Just 10 minutes.")
    ).toBeInTheDocument();

    const edit = container.querySelector(
      "li[name='0'] > button[name='edit-button']"
    );

    fireEvent.click(edit);

    const editModeInput = container.querySelector(
      "input[name='editMode-input']"
    );
    const editModeSubmit = container.querySelector(
      "button[name='editMode-btn']"
    );

    fireEvent.change(editModeInput, {
      target: {
        value: "Welp. We broke everything. Roll everything back."
      }
    });

    fireEvent.click(editModeSubmit);

    expect(
      getByText("Welp. We broke everything. Roll everything back.")
    ).toBeInTheDocument();
  });
});

describe("TodosList Hooks Tests", () => {
  afterEach(cleanup);

  test("Todos list should initially be empty", () => {
    const { result } = renderHook(() => useTodosStore(), { wrapper });
    expect(result.current.state.todos.length).toBe(0);
  });

  test("Todo list should add one element", () => {
    const { result } = renderHook(() => useTodosStore(), { wrapper });

    act(() => {
      result.current.dispatch(addTodo("Some event"));
    });

    expect(result.current.state.todos.length).toBe(1);
  });

  test("Todo list should remove one element", () => {
    const { result } = renderHook(() => useTodosStore(), { wrapper });

    act(() => {
      result.current.dispatch(addTodo("Some event"));
    });

    expect(result.current.state.todos.length).toBe(1);

    act(() => {
      result.current.dispatch(deleteTodo(0));
    });

    expect(result.current.state.todos.length).toBe(0);
  });

  test("Todo list should modify one element", () => {
    const { result } = renderHook(() => useTodosStore(), { wrapper });

    act(() => {
      result.current.dispatch(addTodo("Some event"));
    });

    expect(result.current.state.todos.length).toBe(1);

    act(() => {
      result.current.dispatch(modifyTodo("Some modified event", 0));
    });

    expect(result.current.state.todos.length).toBe(1);
    expect(result.current.state.todos[0].todo).toBe("Some modified event");
  });
});
