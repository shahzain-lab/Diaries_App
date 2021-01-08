import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import  { User } from '../../interfaces/user.interface';

const user = createSlice({
    name: 'user',
    initialState: null as User | null
})