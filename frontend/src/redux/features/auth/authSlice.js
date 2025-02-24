import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if (serializedState == null) return { user: null };
        return { user: JSON.parse(serializedState) };
    } catch (error) {
        return { user: null };
    }
};

const initialState = loadUserFromLocalStorage();

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser:(state, action) => {
            state.user = action.payload;
            console.log("User data stored in Redux:", action.payload);  // Store full user object
            localStorage.setItem('user', JSON.stringify(state.user)); // Save user to local storage
        },
        logout:(state) => {
            state.user = null; // Clear user data
            localStorage.removeItem('user'); // Remove from local storage
        }
    }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
