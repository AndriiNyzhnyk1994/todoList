import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from './EditableSpan'
import { TaskStatuses, TaskType } from './api/todoListAPI'

type PropsType = {
    task: TaskType
    todoListId: string
    changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    removeTask: (todoListId: string, taskId: string) => void
}

export const Task = (props: PropsType) => {
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todoListId, props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    }
    const removeTask = () => {
        props.removeTask(props.todoListId, props.task.id)
    }
    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.todoListId, props.task.id, title)
    }, [props.changeTaskTitle, props.todoListId, props.task.id])
    return (
        <div>
            <input
                type="checkbox"
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeTaskStatus}
            />
            <EditableSpan changeTitle={changeTaskTitle} title={props.task.title} />
            <button onClick={removeTask}>x</button> 
        </div>
    )
}