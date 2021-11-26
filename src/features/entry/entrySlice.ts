import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry } from "../../interfaces/entry.interface";


const entries = createSlice({
    name: 'entries',
    initialState: [] as Entry[],
    reducers: {
        setEntries(state, { payload }) {
            return (state = payload != null ? payload : [])
        },
        updateEntries(state, { payload }: PayloadAction<Entry>) {
            const { id } = payload;
            const index = state.findIndex(ent => ent.id === id);
            if(index !== -1){
                state.splice(index, 1, payload)
            }
        }
    }
})

export const { setEntries, updateEntries } = entries.actions;
export default entries.reducer;