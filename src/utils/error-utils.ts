import { Dispatch } from "redux"
import { AppActionType, setErrorAC, setStatusAC } from "../app/app-reducer"
import { ResponseType } from "../api/todoListAPI"

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, e: {message: string}) => {
    dispatch(setErrorAC(e.message))
    dispatch(setStatusAC('failed'))
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    }
    else {
        dispatch(setErrorAC('Some error occured'))
    }
    dispatch(setStatusAC("idle"))
}

type ErrorUtilsDispatchType = Dispatch<AppActionType>