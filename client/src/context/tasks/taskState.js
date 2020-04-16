import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
    TASKS_PROJECT
} from '../../types';

const TaskState = (props) => {
    const initialState = {
        tasks: [
            { name: 'Elegir plataforma', state: true, projectId: 1 },
            { name: 'Elegir colores', state: false, projectId: 2 },
            { name: 'Elegir formas de pago', state: true, projectId: 3 },
            { name: 'Elegir hosting', state: false, projectId: 4 },
            { name: 'Elegir framework', state: true, projectId: 1 },
            { name: 'Elegir libreria', state: false, projectId: 2 },
            { name: 'Elegir balanceador de carga', state: true, projectId: 3 },
            { name: 'Elegir servidor', state: true, projectId: 4 },
            { name: 'Elegir logo', state: false, projectId: 2 },
            { name: 'Elegir puestos', state: true, projectId: 1 },
            { name: 'Elegir presupuesto', state: true, projectId: 3 },
            { name: 'Elegir base de datos', state: false, projectId: 4 },
            { name: 'Elegir IDE', state: true, projectId: 3 },
        ],
        projectTasks: null
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

    return(
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                projectTasks: state.projectTasks,
                getTasks
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}
 
export default TaskState;