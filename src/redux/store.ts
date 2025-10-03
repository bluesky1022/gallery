import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from './slices/user.slice';
import ajaxReducer from './slices/ajax.slice';
import screenReducer from "./slices/screens.slice";
import reportReducer from './slices/report.slice';
import socketReducer from "./slices/socket.slice";
import historyReducer from "./slices/history.slice"

export const store = configureStore({
    reducer: {
        ajax: ajaxReducer, 
        user: userReducer,
        screens: screenReducer,
        report: reportReducer,
        socket: socketReducer,
        history: historyReducer,
    }
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;