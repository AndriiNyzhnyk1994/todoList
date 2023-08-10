import axios from "axios"


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a2db3bdd-9ae5-4fe8-ae61-677aa64cba58'
    }
})

export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodoListResponseType[]>('todo-lists')
    },
    addTodoList(newTitle: string) {
        return instance.post<ResponseType<{item: TodoListResponseType}>>('todo-lists', { title: newTitle })
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
    },
    changeTodoListTitle(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, { title })
    }
}
type TodoListResponseType = {    
    addedDate: string
    id: string
    title: string
    order: number
}

type ResponseType<T> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}
