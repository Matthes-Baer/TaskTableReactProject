import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface activeTodoArrayInterface {
    value: activeTodoInterface[];
}

interface activeTodoInterface {
    id: string
    title: string
    badges?: {name: string, checked: boolean}[]
    comment?: string
    time: number
}

const initialState: activeTodoArrayInterface = {
    value: []
};

export const ActiveTodosSlice = createSlice({
    name: 'activeTodos',
    initialState,
    reducers: {
        addActiveTodo: (state, action: PayloadAction<activeTodoInterface>) => {
            state.value.push(action.payload);
        },
        removeActiveTodo: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1);
        }
    }
})

export const { addActiveTodo, removeActiveTodo } = ActiveTodosSlice.actions;

export default ActiveTodosSlice.reducer;