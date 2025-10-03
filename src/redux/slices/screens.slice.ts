import { createSlice } from "@reduxjs/toolkit";

export interface IScreenState {
    groups: {
        selectedGroup: Object,
        groups: []
    },
    users: {
        selectedUser: Object,
        users: []
    },
    screens: []
}

const initialState: IScreenState = {
       groups: {
        selectedGroup: {},
        groups: []
    },
    users: {
        selectedUser: {},
        users: []
    },
    screens: []
}

export const screenSlice = createSlice({
    name: "screens",
    initialState,
    reducers: {
        rgetScreens: (state, {payload}) => {
            state.screens = payload;
            return state;
        },
        rgetGroups: (state, {payload}) => {
            state.groups.groups = payload;
            return state;
        },
        rgetUsers: (state, {payload}) => {
            state.users.users = payload;
            return state;
        },
        rsetSelectedGroup: (state, {payload}) => {
            state.groups.selectedGroup = payload;
            return state;
        },
        rsetSelectedUser: (state, {payload}) => {
            state.users.selectedUser = payload;
            return state;
        }
    }
})

export const {rgetScreens, rgetUsers, rgetGroups, rsetSelectedGroup, rsetSelectedUser} = screenSlice.actions;
export default screenSlice.reducer;