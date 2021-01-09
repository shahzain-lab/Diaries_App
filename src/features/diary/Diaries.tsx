import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import http from '../../services/API';
import { Diary } from '../../interfaces/diary.interface';
import dayjs from 'dayjs';
import { addDiary } from './diarySlice';

const Diaries: FC = () => {
    const dispatch = useAppDispatch();
    const diaries = useSelector((state: RootState) => state.diaries);
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchDiaries = async () => {
            if(user) {
                http.get<null, Diary[]>(`diaries/${user.id}`).then((data) => {
                    if(data && data.length > 0){
                        const sortedByUpdatedAt = data.sort((a , b) => {
                            return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix()
                        });
                        dispatch(addDiary(sortedByUpdatedAt));
                    }
                });
            }
        }
        fetchDiaries();
    },[dispatch, user])
}