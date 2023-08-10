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
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    changeTodoListTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, { title })
    }
}
type TodoListResponseType = {    
    addedDate: string
    id: string
    title: string
    order: number
}

type ResponseType<T = {}> = {
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
    data: T
}
// T - это тип-параметр. В нашем случае data может быть разная,
// поэтому мы свойство data не конкретизируем, а вераем на неё параметр
// В дальшейшем, когда будет вешать типизацию ResponseType на респонс, то укажем 
// тот тип, что встанет на место T, это будет значением свойства data для конкретного респонса
// пример: axios.post<ResponseType<{item: TodoListType}>>(...)
// то есть, для этого конкретного запроса будет своя версия типа ResponseType, где data - 
// это обьект {item: TodoListType}. То есть, это работает как параметры и аргументы функций
// для других случаев можем задавать другие аргументы внутрь ResponseType и эти данные 
// станут значением date
// <T = {}> - это значение по умолчанию. Если мы ничего не передаем при типизации респонса,
// то свойство data автоматически присвоит себе пустой обьект (по умолчанию)

