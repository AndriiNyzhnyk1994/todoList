import { Dispatch } from "redux"
import { setErrorAC, setStatusAC } from "../app/app-reducer"

export const handleServerNetworkError = (dispatch: Dispatch, e: {message: string}) => {
    dispatch(setErrorAC(e.message))
    dispatch(setStatusAC('failed'))
}