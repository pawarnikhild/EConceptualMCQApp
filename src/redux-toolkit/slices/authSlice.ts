import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginService } from '../../services/auth-services';

type AuthState = {
    token: string | null;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    token: '',
    loading: false,
    error: null,
};

export const login = createAsyncThunk<
    { token: string },
    { email: string; password: string }
>('auth/login', async ({ email, password }) => loginService(email, password));

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            // console.log('State after setting token',state)
        },
        logout: (state) => {
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(login.pending, state => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.token = action.payload.token;
            console.log('Logged in successfully authSlice', state);
        });
        builder.addCase(login.rejected, (state, action) => {
            console.log('Error while logging in RDK', action.payload);
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
