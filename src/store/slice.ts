import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {ITask7State} from "./type";

export const initialState: ITask7State = {
    theme: localStorage.theme ? localStorage.theme : 'light',
};

export const Task7StoreSlice = createSlice({
    name: 'Task7Store',
    initialState,
    reducers: {
        setTheme : (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload
        },
    },
});

export const {
    setTheme,
     } = Task7StoreSlice.actions;

export default Task7StoreSlice.reducer;