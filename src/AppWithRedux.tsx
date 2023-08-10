import React, { useCallback, useState } from 'react';
import './App.css';
import { TodoList } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store/store';
import { useDispatch } from 'react-redux';
import { addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC } from './store/todoListsReducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './store/tasksReducer';
import { Counter } from './SuperTest';
import { TestComponent } from './TestComponent';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TodoListType = {
  todoListId: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithRedux() {

  const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const dispatch = useDispatch()
  
  const addTodoList = useCallback((newTodoListTitle: string) => {
    const action = addTodoListAC(newTodoListTitle)
    dispatch(action)
  },[])

  const removeTodoList = useCallback((todoListId: string) => {
    const action = removeTodoListAC(todoListId)
    dispatch(action)  
  }, [])

  const removeTask = useCallback((todoListId: string, taskId: string) => {
    const action = removeTaskAC(todoListId, taskId)
    dispatch(action)
  },[])

  const changeFilterValue = useCallback((todoListId: string, value: FilterValuesType) => {
    const action = changeTodoListFilterAC(todoListId, value)
    dispatch(action)
  },[])
  const addTask = useCallback((todoListId: string, newTaskTitle: string) => {
    const action = addTaskAC(todoListId, newTaskTitle)
    dispatch(action)
  },[])
  const changeTaskStatus = useCallback((todoListId: string, taskId: string, value: boolean) => {
    const action = changeTaskStatusAC(todoListId, taskId, value)
    dispatch(action)
  },[])
  const changeTaskTitle = useCallback((todoListId: string, taskId: string, value: string) => {
    const action = changeTaskTitleAC(todoListId, taskId, value)
    dispatch(action)
  },[])
  const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
    const action = changeTodoListTitleAC(todoListId, newTitle)
    dispatch(action)
  },[])

  return (
    <div className="App">
      <TestComponent/>
      <AddItemForm addItem={addTodoList} />
      {todoLists.map(tl => {
        
        return (
          <TodoList
            key={tl.todoListId}
            id={tl.todoListId}
            title={tl.title}
            filter={tl.filter}
            tasks={tasks[tl.todoListId]}
            addTask={addTask}
            removeTask={removeTask}
            removeTodoList={removeTodoList}
            changeFilterValue={changeFilterValue}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}
          />
        )
      })}

    </div>
  );
}

export default AppWithRedux;
