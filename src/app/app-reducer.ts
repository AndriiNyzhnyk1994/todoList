
export type RequestStatusType = 'idle' | 'loading' | 'succeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        default: return state
    }
}

export const setStatusAC = (status: RequestStatusType) => {
    return { type: "APP/SET-STATUS", status } as const
}

export type SetStatusType = ReturnType<typeof setStatusAC>

type ActionType = SetStatusType
