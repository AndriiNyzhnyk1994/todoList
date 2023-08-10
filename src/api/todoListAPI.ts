import axios from "axios"

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a2db3bdd-9ae5-4fe8-ae61-677aa64cba58'
    }
}

export const todoListAPI = {
    getTodoLists() {
       return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    addTodoList(newTitle: string) {
       return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', { title: newTitle }, settings)
    },
    deleteTodoList(todolistId: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },
    changeTodoListTitle(todolistId: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, { title }, settings)
    }
}