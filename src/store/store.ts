import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { todoListReducer } from "./todoListsReducer";
import { tasksReducer } from "./tasksReducer";
import { useDispatch } from "react-redux";
import thunk, {ThunkDispatch} from 'redux-thunk'

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})


type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkDispatchType>()

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store