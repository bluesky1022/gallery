import { createSlice } from "@reduxjs/toolkit";

export interface IScreenState {
    data: {}
}

const initialState: IScreenState = {
       data: {}
}

export const reportSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {
        getCalendarDate: (state, {payload}) => {
            return {...state, date: payload.date};
        },
        groupView: (state, {payload}) => {
            return {...state, group: payload.group}
        }
    }
})

export const {getCalendarDate, groupView} = reportSlice.actions;
export default reportSlice.reducer;