import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface colorSliceInterface {
    colorBoolean: boolean | string
}

const initialState = {
    colorBoolean: JSON.parse(localStorage.getItem('color') || `{}`)
}   


export const ColorSlice = createSlice({
    name: 'colorTheme',
    initialState,
    reducers: {
        changeColorTheme: (state, action: PayloadAction<colorSliceInterface>) => {
            state.colorBoolean = action.payload;
        }
    }
});

export const { changeColorTheme } = ColorSlice.actions;

export default ColorSlice.reducer;