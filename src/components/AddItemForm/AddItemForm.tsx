import React, { ChangeEvent, useState } from 'react';

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: PropsType) => {
    
    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error !== null) {
            setError(null)
        }
    }
    

    const addItem = () => {
        if (title.trim()) {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }

    }

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={onChangeHandler}
            />
            <button onClick={addItem}>add</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
})