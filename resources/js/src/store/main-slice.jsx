import { createSlice } from '@reduxjs/toolkit';

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

export const checkAccessToken = (token) => {

    return async (dispatchAction) => {

        const fetchUser = async () =>{
            const response = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json'
                }
            });

            if (response.status === 401) {
                return false;
            }

            if (!response.ok) {
                throw new Error('Ошибка при отправке данных корзины');
            }

            return await response.json();
        }

        try {

            const user = await fetchUser();
            if (!user) {
                dispatchAction(mainActions.logout());
            }

        }catch(e) {
            alert('Произошла ошибка');
        }

    }
}

export default mainSlice.reducer;
