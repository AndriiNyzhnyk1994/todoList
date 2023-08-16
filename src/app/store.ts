import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import thunk, {ThunkDispatch} from 'redux-thunk'
import { useSelector } from "react-redux";
import { todoListReducer } from "../features/TodoListsList/todoListsReducer";
import { tasksReducer } from "../features/TodoListsList/tasksReducer";

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})


type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store