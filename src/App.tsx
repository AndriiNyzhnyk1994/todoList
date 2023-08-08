import React, { useState } from 'react';
import './App.css';
import { TodoList } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

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

function App() {

  const todoListId_01 = v1()
  const todoListId_02 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { todoListId: todoListId_01, title: 'Games', filter: 'all' },
    { todoListId: todoListId_02, title: 'Technoligies', filter: 'all' },
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListId_01]: [
      { id: v1(), title: 'Baldur`s Gate 3', isDone: false },
      { id: v1(), title: 'Hitman Absolution', isDone: true },
      { id: v1(), title: 'GTA 5', isDone: false },
      { id: v1(), title: 'RDR 2', isDone: true },
    ],
    [todoListId_02]: [
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: true },
      { id: v1(), title: 'Axios', isDone: false },
      { id: v1(), title: 'TypeScript', isDone: true },
    ],
  }
  )

  const addTodoList = (newTodoListTitle: string) => {
    const newTodoListId = v1()
    const newTodoList: TodoListType = {
      todoListId: newTodoListId,
      title: newTodoListTitle,
      filter: 'all'
    }
    setTodoLists([newTodoList, ...todoLists])
    setTasks({ ...tasks, [newTodoListId]: [] })
  }
  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter(tl => tl.todoListId !== todoListId))
    delete tasks[todoListId]
  }

  const removeTask = (todoListId: string, taskId: string) => {
    const todoListTasks = tasks[todoListId]
    tasks[todoListId] = todoListTasks.filter(t => t.id !== taskId)
    setTasks({ ...tasks })
  }

  const changeFilterValue = (todoListId: string, value: FilterValuesType) => {
    const todoList = todoLists.find(tl => tl.todoListId === todoListId)
    if (todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  }
  const addTask = (todoListId: string, newTaskTitle: string) => {
    const newTask: TaskType = { id: v1(), title: newTaskTitle, isDone: false }
    const todoListTasks = tasks[todoListId]
    tasks[todoListId] = [newTask, ...todoListTasks]
    setTasks({ ...tasks })
  }
  const changeTaskStatus = (todoListId: string, taskId: string, value: boolean) => {
    const todoListTasks = tasks[todoListId]
    tasks[todoListId] = todoListTasks.map(t => {
      if (t.id === taskId) {
        t.isDone = value
      }
      return t
    })
    setTasks({ ...tasks })
  }
  const changeTaskTitle = (todoListId: string, taskId: string, value: string) => {
    const todoListTasks = tasks[todoListId]
    tasks[todoListId] = todoListTasks.map(t => {
      if (t.id === taskId) {
        t.title = value
      }
      return t
    })
    setTasks({ ...tasks })
  }
  const changeTodoListTitle = (todoListId: string, newTitle: string) => {
    let todoList = todoLists.find(tl => tl.todoListId === todoListId)
    if(todoList) {
      todoList.title = newTitle
    }
    setTodoLists([...todoLists])
  }


  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />

      {todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.todoListId]
        if (tl.filter === 'active') {
          tasksForTodoList = tasks[tl.todoListId].filter((t) => !t.isDone)
        }
        if (tl.filter === 'completed') {
          tasksForTodoList = tasks[tl.todoListId].filter((t) => t.isDone)
        }
        return (
          <TodoList
            key={tl.todoListId}
            id={tl.todoListId}
            title={tl.title}
            filter={tl.filter}
            tasks={tasksForTodoList}
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

export default App;
