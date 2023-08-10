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
        return instance.post<AddTodoListResponseType>('todo-lists', { title: newTitle })
    },
    deleteTodoList(todolistId: string) {
        return instance.delete<DeleteTodoListResponseType>(`todo-lists/${todolistId}`)
    },
    changeTodoListTitle(todolistId: string, title: string) {
        return instance.put<UpdateTodoListResponseType>(`todo-lists/${todolistId}`, { title })
    }
}



type TodoListResponseType = {    
    title: string
    id: string
    addedDate: string
    order: number
}

type UpdateTodoListResponseType = {
    data: {}
    fieldsErrors: []
    messages: string[]
    resultCode: number
}

type AddTodoListResponseType = {
    data: {item: TodoListResponseType}
    fieldsErrors: []
    messages: string[]
    resultCode: number
}

type DeleteTodoListResponseType = {
    data: {}
    fieldsErrors: []
    messages: string[]
    resultCode: number
}