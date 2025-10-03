import { createSlice } from "@reduxjs/toolkit";
import socket from 'socket.io-client';

export interface IScreenState {
    socket: {} 
}

const sock : any = socket;

const initialState: IScreenState = {
       socket: sock.connect("http://localhost:5000")
}

export const socketSlice = createSlice({
    name: "socket",
    initialState,
    reducers: {
    }
})

export default socketSlice.reducer;