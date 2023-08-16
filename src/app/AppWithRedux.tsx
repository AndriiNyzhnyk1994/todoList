import React from 'react';
import './App.css';
import {  TaskType } from '../api/todoListAPI';
import { TodoListsList } from '../features/TodoListsList/TodoListsList';


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  return (
    <div className="App">
      <TodoListsList/>
    </div>
  );
}


export default AppWithRedux;
