import { v1 } from "uuid"
import { TodoListType, todoListAPI } from "../api/todoListAPI"
import { Dispatch } from "redux"

export type FilterValuesType = 'all' | 'active' | 'completed'


export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}
// & служит оператором склеивания типов 

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
export type SetTodoListsActionType = {
     type: "SET-TODOLISTS",
      todoLists: TodoListType[] }

type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeFilterActionType
    | ChangeTodoListTitleActionType
    | SetTodoListsActionType

export const todoListReducer = (state: Array<TodoListDomainType> = [], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.todoListId)
        }
        case "ADD-TODOLIST": {
            const stateCopy = [...state]
            const newTodoList: TodoListDomainType = {
                id: action.newTodoListId,
                title: action.newTitle,
                filter: "all",
                addedDate: '',
                order: 0
            }
            return [newTodoList, ...stateCopy]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => {
                if(tl.id === action.todoListId) {
                    return {...tl, title: action.newTitle}
                }
                return tl
            })
        }
        case "CHANGE-FILTER": {
            return state.map(tl => {
                if(tl.id === action.todoListId) {
                    return {...tl, filter: action.value}
                }
                return tl
            })
        }
        case "SET-TODOLISTS": {
             return action.todoLists.map(tl => ({...tl, filter: 'all' }))
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
export const setTodoListsAC = (todoLists: TodoListType[]): SetTodoListsActionType => {
    return { type: "SET-TODOLISTS", todoLists } as const
}


export const getTodosThunk = (dispatch: Dispatch) => {
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })    
}

