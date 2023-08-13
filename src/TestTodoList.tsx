import React, { useEffect, useState } from 'react'
import { TaskType, tasksAPI } from './api/todoListAPI'
import { AddItemForm } from './AddItemForm'
import { Task } from './Task'


type PropsType = {
    todoList: {
        id: string
        title: string
    }
}


export const TestTodoList = React.memo((props: PropsType) => {
    const [title, setTitle] = useState('')
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [count, setCount] = useState({})
    const [taskId, setTaskId] = useState('')

    useEffect(() => {
        const promise = tasksAPI.getTasks(props.todoList.id)
        promise.then((res) => {
            setTasks(res.data.items)
        })
            .catch((err) => {
                console.log(err);
            })
    }, [count])

    const addTask = (newTaskTitle: string) => {
        const promise = tasksAPI.addTask(props.todoList.id, newTaskTitle)
        promise.then(() => {
            setCount({})
        })
    }
    const changeTask = (taskId: string, newTitle: string) => {
        const promise = tasksAPI.changeTask(props.todoList.id, taskId, newTitle)
        promise.then(() => {
            setTitle('')
            setTaskId('')
            setCount({})
        })
    }
    const deleteTask = (taskId: string) => {
        const promise = tasksAPI.deleteTask(props.todoList.id, taskId)
        promise.then(() => {
            setCount({})
        })
    }



    return (
        <div>
            <div key={props.todoList.id}>
                <h4 style={{color: 'red'}}>{props.todoList.title}</h4>
                <span style={{color: 'yellow'}}>Todolist ID: {props.todoList.id}</span>
            </div>
            <span>Add Task down here</span>
            <AddItemForm addItem={addTask} />
            <div><span>Change Task</span></div>
            <input placeholder='CHANGE TASK TITLE' value={title} onChange={(e) => { setTitle(e.currentTarget.value) }} />
            <input placeholder='task ID' value={taskId} onChange={(e) => { setTaskId(e.currentTarget.value) }} />
            <button onClick={() => { changeTask(taskId, title) }}>change</button>
            {
                tasks.map((t) => {
                    return (
                        <div key={t.id}>

                            <span>{t.title}</span>
                            <div>
                                <span>{t.id}</span>
                                <button onClick={() => { deleteTask(t.id) }}>x</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
})