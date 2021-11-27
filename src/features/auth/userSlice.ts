import { createSlice } from "@reduxjs/toolkit";


const user = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, { payload }) {
            return state = (payload != null) ? payload : null;
        }
    }
})

export const { setUser } = user.actions;
export default user.reducer;