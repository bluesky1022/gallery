import {createSlice} from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../utils/constants";
import { setAuthToken } from "../../utils/setAuthtoken";

export interface IUserState {
    authenticated: boolean
}

const token : string = localStorage.getItem(STORAGE_KEYS.USER) || "";

const initialState: IUserState = {
    authenticated: token !== "" || false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state) => {
            return {
                ...state,
                authenticated: true
            }
        },
        deleteUser: () => {
            localStorage.removeItem('token');
            setAuthToken(false);
            window.location.href="/login";
            return initialState;
        }
    
    }
})

export const {setUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;