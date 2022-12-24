import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice(
    {
        name: 'theme',
        initialState: {
            isDark: false
        },
        reducers: {
            toggleDarkMode: (state, action) => {
                state.isDark = !state.isDark;
            },
        }
    }
);

// this is for dispatch
export const { toggleDarkMode } = themeSlice.actions;

// this is for configureStore
export default themeSlice.reducer;
