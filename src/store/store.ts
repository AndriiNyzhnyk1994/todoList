import { combineReducers, legacy_createStore } from "redux";
import { todoListReducer } from "./todoListsReducer";
import { tasksReducer } from "./tasksReducer";

const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer
})


export const store = legacy_createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store