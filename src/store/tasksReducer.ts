import { TasksStateType } from "../AppWithRedux"
import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType, tasksAPI } from "../api/todoListAPI"
import { Dispatch } from "redux"
import { AppRootStateType } from "./store"
import { AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType, addTodoListAC, removeTodoListAC, setTodoListsAC } from "./todoListsReducer"



type ActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTasksAC>
    | RemoveTodoListActionType 
    | AddTodoListActionType
    | SetTodoListsActionType

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
        case "UPDATE-TASK": {
            // let stateCopy = { ...state }
            // let todoListTasks = stateCopy[action.todoListId]
            // stateCopy[action.todoListId] = todoListTasks.map(t => {
            //     if (t.id === action.taskId) {
            //         return { ...t, title: action.newTitle }
            //     }
            //     return t
            // })
            // return stateCopy

            let todoListTasks = state[action.todoListId]
            let NewTasksArray = todoListTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            state[action.todoListId] = NewTasksArray
            return {...state}
        }
        case "ADD-TODOLIST": {
            let stateCopy = { ...state }
            return { [action.todoList.id]: [], ...stateCopy }
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = { ...state }
            delete stateCopy[action.todoListId]
            return stateCopy
        }
        case "SET-TODOLISTS": {
            let stateCopy = { ...state }
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS": {
            return { ...state, [action.todoListId]: action.tasks }
        }
        default: return state
    }
}

// ACTIONS
export const removeTaskAC = (todoListId: string, taskId: string) => {
    return { type: "REMOVE-TASK", todoListId, taskId } as const
}
export const addTaskAC = (todoListId: string, task: TaskType) => {
    return { type: "ADD-TASK", todoListId, task } as const
}
export const updateTaskAC = (todoListId: string, taskId: string, model: UpdateTaskModelType) => {
    return { type: "UPDATE-TASK", todoListId, taskId, model } as const
}
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
    return { type: "SET-TASKS", todoListId, tasks } as const
}

// THUNCKS
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

export type UpdateDomainTaskModelType = {
    deadline?: string
    description?: string
    priority?: TaskPriorities
    startDate?: string
    status?: TaskStatuses
    title?: string
}
export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoId].find((t) => t.id === taskId)
        // getState - второй параметр thunk функции. 
        // Это метод, который возвращает весь rootState (тудулисты и таски)
        if (task) {
            const model: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...domainModel
            }
            tasksAPI.updateTask(todoId, taskId, model)
                .then(res => {
                    dispatch(updateTaskAC(todoId, taskId, model))
                })
        }
    }
