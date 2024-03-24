import { createSlice } from '@reduxjs/toolkit';
import useHttp from "../hooks/http";

const mainInitialState = {
    accessToken: localStorage.getItem('accessToken')
};

const mainSlice = createSlice({
    name: 'main',
    initialState: mainInitialState,
    reducers: {
        onLogin(state, action) {
            localStorage.setItem('accessToken', action.payload.access_token);
            state.accessToken = action.payload.access_token;
        },
        logout(state, action) {
            localStorage.removeItem('accessToken');
            state.accessToken = null;
        }
    }
});

export const mainActions = mainSlice.actions;

export default mainSlice.reducer;
