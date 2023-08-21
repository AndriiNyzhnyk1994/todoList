import { Dispatch } from "redux"
import { TodoListType, todoListAPI } from "../../api/todoListAPI"
import { SetErrorType, SetStatusType, setErrorAC, setStatusAC } from "../../app/app-reducer"



export const todoListReducer = (state: Array<TodoListDomainType> = [], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": return state.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST": return [{ ...action.todoList, filter: 'all' }, ...state]
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
        case "SET-TODOLISTS": return action.todoLists.map(tl => ({ ...tl, filter: 'all' }))
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

// THUNKS
export const getTodosTC = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setStatusAC("succeded"))
        })
}
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todoListAPI.deleteTodoList(todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListId))
            }
            else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                }
                else {
                    dispatch(setErrorAC('Some error occured'))
                }
            }
            dispatch(setStatusAC("idle"))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todoListAPI.addTodoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
            }
            else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                }
                else {
                    dispatch(setErrorAC('Some error occured'))
                }
            }
            dispatch(setStatusAC("idle"))
        })
}
export const changeTodoListTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusAC("loading"))
    todoListAPI.changeTodoListTitle(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todoListId, title))
            }
            else {
                if(res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                }
                else {
                    dispatch(setErrorAC('Some error occured'))
                }
            }
            dispatch(setStatusAC("idle"))
        })
}


// TYPES
export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}
// & сверху служит оператором склеивания типов 

export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>

type ActionType =
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoListsAC>
    | SetStatusType
    | SetErrorType