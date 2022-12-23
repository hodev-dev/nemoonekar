import { createSlice } from '@reduxjs/toolkit';

export const sidemenuSlice = createSlice(
    {
        name: 'sidemenu',
        initialState: {
            collection: [
                {
                    id: 1,
                    title: "مدریت انبار",
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
                        {
                            id: 1.3,
                            title: 'تیکت های مشاهده نشده',
                            path: '/seen'
                        },
                        {
                            id: 1.4,
                            title: 'تیکت های مشاهده شده',
                            path: '/unseen'
                        },
                    ]
                },
                {
                    id: 2,
                    title: 'منوی شماره ۲',
                    isActive: false,
                    children: [
                        {
                            id: 2.1,
                            title: 'sub 1',
                            path: '/user'
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
