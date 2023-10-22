import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ITodo } from "~Types/Todo.Type";
import { RootState } from "~Store";

import { TodoStoreState } from "./types";

const initialState: TodoStoreState = {
    todos: [],
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<ITodo[]>) => {
            state.todos = [...action.payload]
        },
    },
    extraReducers: (builder) => {

    },
});

export const { setTodos } = todoSlice.actions;

export default todoSlice.reducer;

export const getTodoById = (state: RootState, id: string) => {
    return state.todo.todos.find(todo => todo.id === id);
};