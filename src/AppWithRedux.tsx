import React, { useCallback, useEffect } from 'react';
import './App.css';
import { TodoList } from './Todolist';
import { AddItemForm } from './AddItemForm';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from './store/store';
import { FilterValuesType, TodoListDomainType, addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, getTodosTC, removeTodoListAC, setTodoListsAC } from './store/todoListsReducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, getTasksTC, removeTaskAC } from './store/tasksReducer';
import { TaskStatuses, TaskType} from './api/todoListAPI';


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const dispatch = useAppDispatch()
  
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
  const changeTaskStatus = useCallback((todoListId: string, taskId: string, status: TaskStatuses) => {
    const action = changeTaskStatusAC(todoListId, taskId, status)
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

  useEffect(() => {
    dispatch(getTodosTC())
  }, [])

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {todoLists.map(tl => {
        return (
          <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            filter={tl.filter}
            tasks={tasks[tl.id]}
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
