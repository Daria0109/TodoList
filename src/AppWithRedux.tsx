import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {TodoList} from './components/Todolist/TodoList';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
};
export type FilterType = 'all' | 'active' | 'completed';
export type TodoListType = {
  id: string
  title: string
  filter: FilterType
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  console.log('APP')

  const dispatch = useDispatch();
  let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
  let todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);

  const addTask = useCallback((taskTitle: string, todoListId: string) => {
    dispatch(addTaskAC(taskTitle, todoListId))
  }, [dispatch])

  const removeTask = useCallback((taskId: string, todoListId: string) => {
    dispatch(removeTaskAC(taskId, todoListId))
  }, [dispatch])

  const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
  }, [dispatch])

  const editTaskTitle = useCallback((editedTitle: string, taskId: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(editedTitle, taskId, todolistId))
  }, [dispatch])

  const changeFilter = useCallback((value: FilterType, todoListId: string) => {
    dispatch(changeTodolistFilterAC(value, todoListId))
  }, [dispatch])

  const removeTodoList = useCallback((todoListId: string) => {
    dispatch(removeTodolistAC(todoListId));
  }, [dispatch])

  const addTodoList = useCallback((title: string) => {
    let action = addTodolistAC(title);
    dispatch(action);
  }, [dispatch])

  const editTodoListTitle = useCallback((editedTitle: string, todoListId: string) => {
    let action = changeTodolistTitleAC(editedTitle, todoListId);
    dispatch(action);
  }, [dispatch])
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "10px"}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {todolists.map(tl => {
            let tasksForTodoList = tasks[tl.id];

            return <Grid item>
              <Paper style={{padding: "20px", backgroundColor: "powderblue"}}>
                <TodoList key={tl.id}
                          title={tl.title}
                          id={tl.id}
                          tasks={tasksForTodoList}
                          removeTask={removeTask}
                          addTask={addTask}
                          changeFilter={changeFilter}
                          changeTaskStatus={changeTaskStatus}
                          filter={tl.filter}
                          removeTodoList={removeTodoList}
                          editTaskTitle={editTaskTitle}
                          editTodoListTitle={editTodoListTitle}
                />
              </Paper>
            </Grid>
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
