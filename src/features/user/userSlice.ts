import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {toast} from 'sonner';

export type User = {
    username: string;
    id: string;
    role: string;
};

type UserState = {
    user: User | null;
};

const getUserFromLocalStorage = (): User | null => {
    const user = localStorage.getItem('user');
    if (!user) return null;
    return JSON.parse(user);
};

const initialState: UserState = {
    user: getUserFromLocalStorage(),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<User>) => {
            const user = action.payload;
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            toast('Successfully logged in!');
        },
        logoutUser: (state) => {
            localStorage.removeItem('user');
            console.log('я отработал');

            console.log(localStorage.getItem('user'));
            state.user = null;
            console.log('я закончил');
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = {...state.user, ...action.payload};
                localStorage.setItem('user', JSON.stringify(state.user));
                toast('User  information updated successfully!');
            }
        },
    },
});

export const {loginUser, logoutUser, updateUser} = userSlice.actions;

export default userSlice.reducer;
