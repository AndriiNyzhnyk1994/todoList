import React, { ChangeEvent, useState } from 'react';

type PropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: PropsType) => {
    const [title, setTitle] = useState(props.title)
    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input
                onBlur={deactivateEditMode}
                autoFocus={true}
                value={title}
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})
