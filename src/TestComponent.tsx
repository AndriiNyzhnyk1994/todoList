import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { todoListAPI } from "./api/todoListAPI";

type TodoListResponseType = {
    id: string
    title: string
    addedDate: string
    order: number
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'a2db3bdd-9ae5-4fe8-ae61-677aa64cba58'
    }
}


export const TestComponent = () => {
    const [state, setState] = useState<Array<TodoListResponseType>>([])
    const [count, setCount] = useState<Object>({})
    const [title, setTitle] = useState('')
    const [todoListId, setTodoListId] = useState('')



    useEffect(() => {
        const promise = todoListAPI.getTodoLists()
        promise.then((res) => {
            setState(res.data)
        })
    }, [count])

    const addTodoListRequest = (newTitle: string) => {
        const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', { title: newTitle }, settings)
        promise.then(() => {
            setCount({})
            setTitle('')
        })
    }
    const delTodoListRequest = (todolistId: string) => {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        promise.then((res) => {
            setCount({})
            setTodoListId('')
        })
            .catch((err) => { console.log(err.data) })
    }
    const changeTodoListRequest = (todolistId: string, title: string) => {
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, { title }, settings)
        promise.then((res) => {
            setCount({})
            setTitle('')
            setTodoListId('')
            console.log(res.data);

        })
            .catch((err) => { console.log(err.data) })
    }


    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onChangeIDHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoListId(e.currentTarget.value)
    }

    return (
        <div>
            {<ul>
                {state.map(tl => {
                    return (
                        <li key={tl.id}>
                            <h4>{tl.title}</h4>
                            <span>{tl.id}</span>
                        </li>
                    )
                })}
            </ul>}
            <input value={title} onChange={onChangeTitleHandler} placeholder="title" />
            <input value={todoListId} onChange={onChangeIDHandler} placeholder="id" />
            <button onClick={() => { addTodoListRequest(title) }}>ADD</button>
            <button onClick={() => { delTodoListRequest(todoListId) }}>DEL</button>
            <button onClick={() => { changeTodoListRequest(todoListId, title) }}>CHANGE</button>
        </div>

    )
}