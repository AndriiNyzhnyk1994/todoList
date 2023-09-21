import axios from "axios"

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a2db3bdd-9ae5-4fe8-ae61-677aa64cba58'
    }
})

// API
export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todo-lists')
    },
    addTodoList(newTitle: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>('todo-lists', { title: newTitle })
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    changeTodoListTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title })
    }
}
export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    addTask(todolistId: string, newTaskTitle: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, { title: newTaskTitle })
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

// TYPES

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}
export type TodoListType = {
    addedDate: string
    id: string
    title: string
    order: number
}
export type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}
export type UpdateTaskModelType = {
    title: string
    description: string
    startDate: string
    deadline: string
    status: TaskStatuses
    priority: TaskPriorities
}
// we need UpdateTaskModelType to doing put requests with entire object (task model)
// it seems like TaskType bot shorter then it. In task model we have just 
// necessary properties for our request
// Now we can use one method: TasksAPI.updateTask for 2 cases (change title, change status)
// instead of creating two similar methods separately for title and status  

export type ResponseType<T = {}> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}
// T - это тип-параметр. В нашем случае data может быть разная,
// поэтому мы свойство data не конкретизируем, а вешаем на неё параметр
// В дальшейшем, когда будет вешать типизацию ResponseType на респонс, то укажем
// тот тип, что встанет на место T, это будет значением свойства data для конкретного респонса
// пример: axios.post<ResponseType<{item: TodoListType}>>(...)
// то есть, для этого конкретного запроса будет своя версия типа ResponseType, где data -
// это обьект {item: TodoListType}. То есть, это работает как параметры и аргументы функций
// для других случаев можем задавать другие аргументы внутрь ResponseType и эти данные
// станут значением date
// <T = {}> - это значение по умолчанию. Если мы ничего не передаем при типизации респонса,
// то свойство data автоматически присвоит себе пустой обьект (по умолчанию)

