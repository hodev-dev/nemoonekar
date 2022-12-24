import { createSlice } from '@reduxjs/toolkit';

export const sidemenuSlice = createSlice(
    {
        name: 'sidemenu',
        initialState: {
            collection: [
                {
                    id: 1,
                    title: "مدریت تیکت ها",
                    isActive: true,
                    children: [
                        {
                            id: 1.1,
                            title: 'ثبت تیکت',
                            path: '/add'
                        },
                        {
                            id: 1.2,
                            title: 'لیست تیکت ها',
                            path: '/'
                        },
                    ]
                },
                {
                    id: 2,
                    title: 'تست',
                    isActive: false,
                    children: [
                        {
                            id: 2.1,
                            title: 'زیر منو',
                            path: '/1'
                        }
                    ]
                },
                {
                    id: 3,
                    title: 'کتابخانه',
                    isActive: false,
                    children: [
                        {
                            id: 2.1,
                            title: 'زیر منو',
                            path: '/2'
                        }
                    ]
                },
                {
                    id: 4,
                    title: 'آموزش',
                    isActive: false,
                    children: [
                        {
                            id: 2.1,
                            title: 'زیر منو',
                            path: '/3'
                        }
                    ]
                }
            ]
        },
        reducers: {
            toggleMenu: (state, action) => {
                const _items = state.collection.map((item) => {
                    if (item.id == action.payload.id) {
                        item.isActive = !item.isActive;
                    }
                    return item;
                });
                state = _items;
            }
        }
    }
);

// this is for dispatch
export const { toggleMenu } = sidemenuSlice.actions;

// this is for configureStore
export default sidemenuSlice.reducer;
