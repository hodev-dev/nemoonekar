import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from '../actions/authSlice';
import counterSlice from '../actions/counterSlice';
import sidebarSilice from '../actions/sidebarSilice';
import sidemenuSlice from '../actions/sidemenuSlice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['sidebar', 'sidemenu'],
    timeout: 300
}
const rootReducer = combineReducers({
    auth: authSlice,
    counter: counterSlice,
    sidebar: sidebarSilice,
    sidemenu: sidemenuSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
