import { combineReducers } from "@reduxjs/toolkit";

import TodoReducer from './Todo';

const reducers = combineReducers({
    todo: TodoReducer,
});

export default reducers;