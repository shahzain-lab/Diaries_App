import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Diary } from '../../interfaces/diary.interface';
import { addDiary } from './diariesSlice';
import { Routes, Route } from 'react-router-dom';
import dayjs from 'dayjs';
import { useAppDispatch } from '../../App/store';
import { RootState } from '../../App/rootReducer';
import http from '../../services/API';
import DiaryEntryList from './DiaryEntryList';
import UtilRoute from './UtilRoute';

const Diaries: FC = () => {
    const dispatch = useAppDispatch();
    const user: any = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const fetchDiaries = async () => {
            if (user) {
                http.get<null, Diary[]>(`diaries/${user.id}`).then((data) => {
                    if (data && data.length > 0) {
                        const sortedByUpdatedAt = data.sort((a, b) => {
                            return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
                        });
                        dispatch(addDiary(sortedByUpdatedAt));
                    }
                });
            }
        };
        fetchDiaries();
    }, [dispatch, user]);

    return (
        <div style={{ padding: '1em 0.4em' }}>
            <Routes>
                <Route path="/" element={<UtilRoute />} />
                <Route path="diary/:id" element={<DiaryEntryList />} />
            </Routes>
        </div>
    );
};

export default Diaries;
