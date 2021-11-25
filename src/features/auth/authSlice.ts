import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Entry } from '../../interfaces/entry.interface';

const entries = createSlice({
    name: 'entries',
    initialState: [] as Entry[],
    reducers: {
        setEntries(state, {payload}: PayloadAction<Entry[] | null>) {
            return (state = payload != null ? payload: []);
        },
        
    }
})
