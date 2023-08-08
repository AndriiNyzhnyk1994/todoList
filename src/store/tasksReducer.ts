import { v1 } from "uuid"
import { FilterValuesType, TaskType, TasksStateType, TodoListType } from "../App"
import { AddTodoListActionType, RemoveTodoListActionType } from "./todoListsReducer"

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todoListId: string
    newTaskTitle: string
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todoListId: string
    taskId: string
    newTitle: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todoListId: string
    taskId: string
    value: boolean
}

type ActionType =
    | AddTaskActionType 
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

    export const tasksReducer = (state: TasksStateType = {}, action: ActionType) => {
        switch (action.type) {
            case "REMOVE-TASK": {
                let stateCopy = {...state}
                let todoListTasks = stateCopy[action.todoListId]
                stateCopy[action.todoListId] = todoListTasks.filter(t => t.id !== action.taskId)
                return stateCopy
            }
            case "ADD-TASK": {
                let stateCopy = {...state}
                let todoListTasks = stateCopy[action.todoListId]
                const newTask: TaskType = {id: v1(), title: action.newTaskTitle, isDone: false}
                stateCopy[action.todoListId] = [newTask, ...todoListTasks]
                return stateCopy
            }
            case "CHANGE-TASK-STATUS": {
                let stateCopy = {...state}
                let todoListTasks = stateCopy[action.todoListId]
                stateCopy[action.todoListId] = todoListTasks.map(t => {
                    if(t.id === action.taskId) {
                        return {...t, isDone: action.value}
                    }
                    return t
                })
                return stateCopy
            }
            case "CHANGE-TASK-TITLE": {
                let stateCopy = {...state}
                let todoListTasks = stateCopy[action.todoListId]
                stateCopy[action.todoListId] = todoListTasks.map(t => {
                    if(t.id === action.taskId) {
                        return {...t, title: action.newTitle}
                    }
                    return t
                })
                return stateCopy
            }
            case "ADD-TODOLIST": {
                let stateCopy = {...state}
                return {[action.newTodoListId]: [], ...stateCopy}
            }
            case "REMOVE-TODOLIST": {
                let stateCopy = {...state}
                delete stateCopy[action.todoListId]
                return stateCopy
            }
            default: return state
        }
    }


export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todoListId, taskId }
}
export const addTaskAC = (todoListId: string, newTaskTitle: string): AddTaskActionType => {
    return { type: "ADD-TASK", todoListId, newTaskTitle }
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE-TASK-TITLE", todoListId, taskId, newTitle }
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, value: boolean): ChangeTaskStatusActionType => {
    return { type: "CHANGE-TASK-STATUS", todoListId, taskId, value }
}

