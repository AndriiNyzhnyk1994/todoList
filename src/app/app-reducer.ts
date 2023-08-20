const initialState = {
    error: null as null | string,
    status: 'loading' as RequestStatusType
}
export const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS': return { ...state, status: action.status }
        case "APP/SET-ERROR": return {...state, error: action.error}
        default: return state
    }
}


//ACTIONS
export const setStatusAC = (status: RequestStatusType) => {
    return { type: "APP/SET-STATUS", status } as const
}
export const setErrorAC = (error: string | null) => {
    return { type: "APP/SET-ERROR", error } as const
}


//TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeded' | 'failed'
type InitialStateType = typeof initialState
export type SetStatusType = ReturnType<typeof setStatusAC>
export type SetErrorType = ReturnType<typeof setErrorAC>


type ActionType = SetStatusType | SetErrorType