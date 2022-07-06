import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface stateInterfaceArray {
    value: stateInterface[];
}

interface stateInterface {
    id: number,
    title: string,
    badges?: {name: string, checked: boolean}[],
    comment?: string,
    time: number,
    completedTime: number
}

const initialState: stateInterfaceArray = {
    value: []
}

export const DoneTodoSlice = createSlice({
    name: 'doneTodos',
    initialState,
    reducers: {
        addDoneTodo(state, action: PayloadAction<stateInterface>) {
            state.value.push(action.payload);
        }
    }
});

export const { addDoneTodo } = DoneTodoSlice.actions;

export default DoneTodoSlice.reducer;