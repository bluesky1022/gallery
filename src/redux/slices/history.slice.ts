import { createSlice } from "@reduxjs/toolkit";

export interface IHistoryType {
    id: string;
    user_name: string;
    user_avatar: string;
    input_time: string;
    type: boolean;
}

interface IHistoryStateType {
    histories: IHistoryType[];
}

const initialState: IHistoryStateType = {
    histories: []
}

export const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        setHistory: (state, action) => {
            state.histories = action.payload;
        },
        deleteHistory: (state, action) => {
            state.histories = state.histories.filter(history => history.id != action.payload)
        }
    }
})

export const { setHistory, deleteHistory } = historySlice.actions;
export default historySlice.reducer;