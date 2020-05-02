import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import axiosClient from '../../config/axios';

import {
    REGISTER_SUCCESSFUL,
    REGISTER_ERROR,
    GET_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    LOGOUT
} from '../../types/index';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        auth: null,
        user: null,
        message: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registerUser = async data => {
        try {
            const response = await axiosClient.post('/api/users', data);
            console.log(response);

            dispatch({
                type: REGISTER_SUCCESSFUL
            });
        } catch (error) {
            console.log(error);

            dispatch({
                type: REGISTER_ERROR
            });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                message: state.message,
                registerUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
 
export default AuthState;