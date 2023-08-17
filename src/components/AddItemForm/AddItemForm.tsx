import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
            <TextField
                variant='outlined'
                value={title}
                onChange={onChangeHandler}
                error={!!error}
            />
            <Button style={{maxWidth:'30px', maxHeight: '30px'}} variant='contained' onClick={addItem}>add</Button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
})