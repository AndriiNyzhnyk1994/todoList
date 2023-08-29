import { Dispatch } from "redux"
import { TodoListType, todoListAPI } from "../../api/todoListAPI"
import { RequestStatusType, SetErrorType, SetStatusType, setErrorAC, setStatusAC } from "../../app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"
import { AxiosError } from "axios"



export const todoListReducer = (state: Array<TodoListDomainType> = [], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": return state.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST": return [
            { ...action.todoList, filter: 'all', entityStatus: 'idle' },
            ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => {
                if (tl.id === action.todoListId) {
                    return { ...tl, title: action.newTitle }
                }
                return tl
            })
        case "CHANGE-FILTER":
            return state.map(tl => {
                if (tl.id === action.todoListId) {
                    return { ...tl, filter: action.value }
                }
                return tl
            })
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
        case "SET-ENTITY-STATUS":
            return state.map(tl => {
                if (tl.id === action.todoListId) {
                    return { ...tl, entityStatus: action.entityStatus }
                }
                return tl
            })
        default: return state
    }
}

// ACTION
export const removeTodoListAC = (todoListId: string) => {
    return { type: "REMOVE-TODOLIST", todoListId } as const
}
export const addTodoListAC = (todoList: TodoListType) => {
    return { type: "ADD-TODOLIST", todoList } as const
}
export const changeTodoListTitleAC = (todoListId: string, newTitle: string) => {
    return { type: "CHANGE-TODOLIST-TITLE", todoListId, newTitle } as const
}
export const changeTodoListFilterAC = (todoListId: string, value: FilterValuesType) => {
    return { type: "CHANGE-FILTER", todoListId, value } as const
}
export const setTodoListsAC = (todoLists: TodoListType[]) => {
    return { type: "SET-TODOLISTS", todoLists } as const
}
export const setEntityStatusAC = (todoListId: string, entityStatus: RequestStatusType) => {
    return { type: "SET-ENTITY-STATUS", todoListId, entityStatus } as const
}


// THUNKS
export const getTodosTC = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setStatusAC("succeded"))
        })
}

export enum ResultCode {
    OK = 0,
    Error = 1,
    Captcha = 10
}
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    dispatch(setEntityStatusAC(todoListId, "loading"))
    todoListAPI.deleteTodoList(todoListId)
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(removeTodoListAC(todoListId))
                dispatch(setStatusAC("succeded"))
            }
            else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e: AxiosError) => {
            dispatch(setErrorAC(e.message))
            dispatch(setStatusAC('failed'))
            dispatch(setEntityStatusAC(todoListId, 'failed'))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todoListAPI.addTodoList(title)
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setStatusAC("succeded"))
            }
            else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((e: AxiosError) => {
            handleServerNetworkError(dispatch, e.message)
        })
}
export const changeTodoListTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todoListAPI.changeTodoListTitle(todoListId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.OK) {
                dispatch(changeTodoListTitleAC(todoListId, title))
                dispatch(setStatusAC("succeded"))
            }
            else {
                handleServerAppError(res.data, dispatch)
            }
        })
}

// TYPES
export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
// & сверху служит оператором склеивания типов 

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type SetEntityStatusActionType = ReturnType<typeof setEntityStatusAC>

type ActionType =
    | RemoveTodoListActionType
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoListsAC>
    | SetStatusType
    | SetErrorType
    | SetEntityStatusActionType