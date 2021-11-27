import React from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { RootState } from '../../App/rootReducer';
import { useAppDispatch } from '../../App/store';
import { Diary } from '../../interfaces/diary.interface';
import { User } from '../../interfaces/user.interface';
import http from '../../services/API';
import { setUser } from '../auth/userSlice';
import { addDiary } from './diariesSlice';
import DiaryTiles from './DiaryTiles';

const UtilRoute = () => {
    const user: any = useSelector((state: RootState) => state.user);
    const diaries = useSelector((state: RootState) => state.diaries)
    const dispatch = useAppDispatch();

    const createDiary = async () => {
        const result = await Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next →',
            showCancelButton: true,
            progressSteps: ['1', '2'],
        }).queue([
            {
                titleText: 'Diary title',
                input: 'text',
            },
            {
                titleText: 'Private or public diary?',
                input: 'radio',
                inputOptions: {
                    private: 'Private',
                    public: 'Public',
                },
                inputValue: 'private',
            },
        ]);
        if (result.value) {
            const { value } = result;
            const {
                diary,
                user: _user,
            } = await http.post<Partial<Diary>, { diary: Diary; user: User }>('/diaries/', {
                title: value[0],
                type: value[1],
                userId: user?.id,
            });
            if (diary && user) {
                dispatch(addDiary([diary] as Diary[]));
                dispatch(addDiary([diary] as Diary[]));
                dispatch(setUser(_user));
                return Swal.fire({
                    titleText: 'All done!',
                    confirmButtonText: 'OK!',
                });
            }
        }
        Swal.fire({
            titleText: 'Cancelled',
        });
    };
    return (
        <>
            <button onClick={createDiary}>Create New</button>
            {diaries.map((diary, idx) => (
                <DiaryTiles key={idx} diary={diary} />
            ))}
        </>
    )
}

export default UtilRoute
