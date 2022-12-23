import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice(
    {
        name: 'counter',
        initialState: {
            isLoggedin: false,
            user: {}
        },
        reducers: {
            login: (state, action) => {
                state.isLoggedin = true;
                state.user = action.payload.user;
            },
            logout: (state, action) => {
                state.isLoggedin = false;
                state.user = {};
            }
        }
    }
);

// this is for dispatch
export const { login, logout } = authSlice.actions;

// this is for configureStore
export default authSlice.reducer;
