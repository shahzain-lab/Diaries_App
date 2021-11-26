import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces/user.interface";


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