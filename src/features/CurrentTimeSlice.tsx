import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface stateInterface {
    value: number
}

const initialState: stateInterface = {
    value: new Date().getTime() / 1000 / 60
}

export const CurrentTimeSlice = createSlice({
    name: 'currenTime',
    initialState,
    reducers: {
        changeCurrentTime(state, action: PayloadAction<number>) {
            state.value = action.payload;
        }
    }
});

export const { changeCurrentTime } = CurrentTimeSlice.actions;

export default CurrentTimeSlice.reducer;