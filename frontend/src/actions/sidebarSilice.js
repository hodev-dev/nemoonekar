import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice(
    {
        name: 'sidebar',
        initialState: {
            show: true
        },
        reducers: {
            toggleSidebar: (state, action) => {
                console.log({ action });
                const prev = action?.payload.prevState;
                state.show = !prev;
            }
        }
    }
);

// this is for dispatch
export const { toggleSidebar } = sidebarSlice.actions;

// this is for configureStore
export default sidebarSlice.reducer;
