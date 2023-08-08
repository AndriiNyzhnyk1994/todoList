import { v1 } from "uuid"
import { FilterValuesType, TaskType, TodoListType } from "../App"

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    newTodoListId: string
    newTitle: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todoListId: string
    newTitle: string
}
type ChangeFilterActionType = {
    type: 'CHANGE-FILTER'
    todoListId: string
    value: FilterValuesType
}

type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeFilterActionType
    | ChangeTodoListTitleActionType

export const todoListReducer = (state: Array<TodoListType> = [], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.todoListId !== action.todoListId)
        }
        case "ADD-TODOLIST": {
            const stateCopy = [...state]
            const newTodoList: TodoListType = {
                todoListId: action.newTodoListId,
                title: action.newTitle,
                filter: "all"
            }
            return [newTodoList, ...stateCopy]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => {
                if(tl.todoListId === action.todoListId) {
                    return {...tl, title: action.newTitle}
                }
                return tl
            })
        }
        case "CHANGE-FILTER": {
            return state.map(tl => {
                if(tl.todoListId === action.todoListId) {
                    return {...tl, filter: action.value}
                }
                return tl
            })
        }
        default: return state
    }
}


export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return { type: "REMOVE-TODOLIST", todoListId }
}
export const addTodoListAC = (newTitle: string): AddTodoListActionType => {
    return { type: "ADD-TODOLIST", newTodoListId: v1(), newTitle }
}
export const changeTodoListTitleAC = (todoListId: string, newTitle: string): ChangeTodoListTitleActionType => {
    return { type: "CHANGE-TODOLIST-TITLE", todoListId, newTitle }
}
export const changeTodoListFilterAC = (todoListId: string, value: FilterValuesType): ChangeFilterActionType => {
    return { type: "CHANGE-FILTER", todoListId, value }
}