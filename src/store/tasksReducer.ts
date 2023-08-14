import { v1 } from "uuid"
import { AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType } from "./todoListsReducer"
import { TasksStateType } from "../AppWithRedux"
import { TaskPriorities, TaskStatuses, TaskType, tasksAPI } from "../api/todoListAPI"
import { Dispatch } from "redux"



type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    todoListId: string
    task: TaskType
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
    status: TaskStatuses
}
type SetTasksActionType = {
    type: "SET-TASKS"
    todoListId: string
    tasks: TaskType[]
}

type ActionType =
    | AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | SetTasksActionType

export type TaskDomainType = TaskType

export const tasksReducer = (state: TasksStateType = {}, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let stateCopy = { ...state }
            let todoListTasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = todoListTasks.filter(t => t.id !== action.taskId)
            return stateCopy
        }
        case "ADD-TASK": {
            // let stateCopy = { ...state }
            // let todoListTasks = stateCopy[action.todoListId]
            // stateCopy[action.todoListId] = [action.task, ...todoListTasks]
            // return stateCopy
            return {
                ...state,
                [action.todoListId]: [action.task, ...state[action.todoListId]]
            }

        }
        case "CHANGE-TASK-STATUS": {
            let stateCopy = { ...state }
            let todoListTasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = todoListTasks.map(t => {
                if (t.id === action.taskId) {
                    return { ...t, status: action.status }
                }
                return t
            })
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            let stateCopy = { ...state }
            let todoListTasks = stateCopy[action.todoListId]
            stateCopy[action.todoListId] = todoListTasks.map(t => {
                if (t.id === action.taskId) {
                    return { ...t, title: action.newTitle }
                }
                return t
            })
            return stateCopy
        }
        case "ADD-TODOLIST": {
            let stateCopy = { ...state }
            return { [action.newTodoListId]: [], ...stateCopy }
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = { ...state }
            delete stateCopy[action.todoListId]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            let stateCopy = {...state}
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            return {...state, [action.todoListId]: action.tasks}
        }    
        default: return state
    }
}


export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todoListId, taskId }
}
export const addTaskAC = (todoListId: string, task: TaskType): AddTaskActionType => {
    return { type: "ADD-TASK", todoListId, task }
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE-TASK-TITLE", todoListId, taskId, newTitle }
}
export const changeTaskStatusAC = (todoListId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return { type: "CHANGE-TASK-STATUS", todoListId, taskId, status }
}
export const setTasksAC = (todoListId: string, tasks: TaskType[]): SetTasksActionType => {
    return { type: "SET-TASKS", todoListId, tasks } as const
}


export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todoId)
        .then(res => {
            dispatch(setTasksAC(todoId, res.data.items))
        })    
}
export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todoId, taskId)
        .then(res => {
            dispatch(removeTaskAC(todoId, taskId))
        })    
}
export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.addTask(todoId, title)
        .then(res => {
            dispatch(addTaskAC(todoId, res.data.data.item))
        })    
}
export const changeTaskTitleTC = (todoId: string, taskId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.changeTask(todoId, taskId, title)
        .then(res => {
            dispatch(changeTaskTitleAC(todoId, taskId, title))
        })    
}
