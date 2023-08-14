import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Task } from './Task';
import { TaskStatuses, TaskType } from './api/todoListAPI';
import { FilterValuesType } from './store/todoListsReducer';
import { getTasksTC } from './store/tasksReducer';
import { useAppDispatch } from './store/store';


type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    addTask: (todoListId: string, newTaskTitle: string) => void
    removeTask: (todoListId: string, taskId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilterValue: (todoListId: string, value: FilterValuesType) => void
    changeTaskStatus: (todoListId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todoListId: string, taskId: string, value: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    const dispatch = useAppDispatch()
    const onAllHandler = useCallback(() => {
        props.changeFilterValue(props.id, 'all')
    }, [props.id, props.changeFilterValue])

    const onActiveHandler = useCallback(() => {
        props.changeFilterValue(props.id, 'active')
    }, [props.id, props.changeFilterValue])

    const onCompletedHandler = useCallback(() => {
        props.changeFilterValue(props.id, 'completed')
    }, [props.id, props.changeFilterValue])


    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title)
    }, [props.addTask, props.id])
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.id, props.changeTodoListTitle])

    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter((t) => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter((t) => t.status === TaskStatuses.Completed)
    }

    useEffect(() => {
        dispatch(getTasksTC(props.id))
    }, [])

    return (
        <div className="todoList">
            <div>
                <button onClick={removeTodoList}>DEL</button>
                <h1>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                </h1>
                <AddItemForm addItem={addTask} />
                <div>
                    {tasksForTodoList.map((t) => {
                        return (
                            <Task
                                key={t.id}
                                todoListId={props.id}
                                task={t}
                                changeTaskStatus={props.changeTaskStatus}
                                changeTaskTitle={props.changeTaskTitle}
                                removeTask={props.removeTask}
                            />
                        )
                    })}
                </div>
                <div>
                    <button onClick={onAllHandler}>All</button>
                    <button onClick={onActiveHandler}>Active</button>
                    <button onClick={onCompletedHandler}>Completed</button>
                </div>
            </div>
        </div>
    )
})