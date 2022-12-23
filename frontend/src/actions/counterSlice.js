import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice(
    {
        name: 'counter',
        initialState: {
            count: 1
        },
        reducers: {
            incerease: (state, action) => {
                console.log(state, action);
                state.count = state.count + 1
            }
        }
    }
);

// this is for dispatch
export const { incerease } = counterSlice.actions;

// this is for configureStore
export default counterSlice.reducer;
