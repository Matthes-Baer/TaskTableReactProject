import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface colorSliceInterface {
    colorBoolean: boolean | string
}

const initialState = {
    value: JSON.parse(localStorage.getItem('darkmode') || `{}`)
}   


export const ColorSlice = createSlice({
    name: 'colorTheme',
    initialState,
    reducers: {
        changeColorTheme: (state, action: PayloadAction<colorSliceInterface>) => {
            state.value = action.payload;
        }
    }
});

export const { changeColorTheme } = ColorSlice.actions;

export default ColorSlice.reducer;