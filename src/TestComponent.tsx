import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { todoListAPI } from "./api/todoListAPI";
import { TaskType } from "./AppWithRedux";
import { TestTodoList } from "./TestTodoList";

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
        const promise = todoListAPI.addTodoList(newTitle)
        promise.then(() => {
            setCount({})
            setTitle('')
        })
    }
    const delTodoListRequest = (todolistId: string) => {
        const promise = todoListAPI.deleteTodoList(todoListId)
        promise.then((res) => {
            setCount({})
            setTodoListId('')
        })
            .catch((err) => { console.log(err.data) })
    }
    const changeTodoListTitleRequest = (todolistId: string, title: string) => {
        const promise = todoListAPI.changeTodoListTitle(todoListId, title)
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
            {<div>
                {state.map(tl => {
                    return (
                        <TestTodoList key={tl.id} todoList={tl}/>
                    )
                })}
            </div>}
            <input value={title} onChange={onChangeTitleHandler} placeholder="title" />
            <input value={todoListId} onChange={onChangeIDHandler} placeholder="id" />
            <button onClick={() => { addTodoListRequest(title) }}>ADD</button>
            <button onClick={() => { delTodoListRequest(todoListId) }}>DEL</button>
            <button onClick={() => { changeTodoListTitleRequest(todoListId, title) }}>CHANGE</button>
        </div>

    )
}