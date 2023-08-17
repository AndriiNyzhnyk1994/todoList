import React from 'react';
import './App.css';
import {  TaskType } from '../api/todoListAPI';
import { TodoListsList } from '../features/TodoListsList/TodoListsList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  return (
    <div className="App">
       <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <TodoListsList/>
    </div>
  );
}


export default AppWithRedux;
