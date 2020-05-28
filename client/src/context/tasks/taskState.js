import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    TASK_STATE,
    CURRENT_TASK,
    UPDATE_TASK
} from '../../types';
import axiosClient from '../../config/axios';

const TaskState = (props) => {
    const initialState = {
        projectTasks: [],
        taskError: false,
        selectedTask: null
    };

    // create dispatch

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // Functions

    const getTasks = projectId => {
        dispatch({
            type: TASKS_PROJECT,
            payload: projectId
        });
    };

    const addTask = async task => {
        try {
            const response = await axiosClient.post('/api/tasks', task);
            console.log(response);

            dispatch({
                type: ADD_TASK,
                payload: task
            });
        } catch (error) {
            console.log(error);
        }
    };

    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        });
    };

    const deleteTask = id => {
        dispatch({
            type: DELETE_TASK,
            payload: id
        });
    };

    const changeTaskState = task => {
        dispatch({
            type: TASK_STATE,
            payload: task
        });
    };

    const saveCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        });
    };

    const updateTask = task => {
        dispatch({
            type: UPDATE_TASK,
            payload: task
        });
    };

    return(
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                changeTaskState,
                saveCurrentTask,
                updateTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}
 
export default TaskState;