import {configureStore} from '@reduxjs/toolkit'
import Task7Reducer from './slice'

export const store = configureStore({
    reducer: {
        Task7Store: Task7Reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
