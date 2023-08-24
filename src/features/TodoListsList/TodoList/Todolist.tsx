import React, { ChangeEvent, useCallback, useEffect } from 'react';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { Task } from './Task/Task';
import { TaskStatuses, TaskType } from '../../../api/todoListAPI';
import { FilterValuesType } from '../todoListsReducer';
import { useAppDispatch } from '../../../app/store';
import { getTasksTC } from '../tasksReducer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import { RequestStatusType } from '../../../app/app-reducer';


type PropsType = {
    id: string
    entityStatus: RequestStatusType
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
                <IconButton disabled={props.entityStatus === 'loading'} onClick={removeTodoList}>
                    <Delete />
                </IconButton>
                <h2>
                    <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                </h2>
                <AddItemForm
                    addItem={addTask}
                    disabled={props.entityStatus === 'loading'}
                />
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
                    <Button variant={props.filter === 'all' ? 'outlined' : 'text'} color='primary' onClick={onAllHandler}>All</Button>
                    <Button variant={props.filter === 'active' ? 'outlined' : 'text'} color='secondary' onClick={onActiveHandler}>Active</Button>
                    <Button variant={props.filter === 'completed' ? 'outlined' : 'text'} color='success' onClick={onCompletedHandler}>Completed</Button>
                </div>
            </div>
        </div>
    )
})