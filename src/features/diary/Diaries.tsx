import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store/store';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import http from '../../services/API';
import { Diary } from '../../interfaces/diary.interface';
import dayjs from 'dayjs';
import { addDiary } from './diarySlice';
import { FC } from 'react';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/user.interface';
import { setUser } from '../auth/userSlice';
import DiaryEntriesList from './DiariesEntries';
import { Switch, Route } from 'react-router-dom';
import DiaryTile from './DiaryTile';

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
    const createDiary = async () => {
        const result = await Swal.mixin({
            input: 'text',
            confirmButtonText: 'Next →',
            showCancelButton: true,
            progressSteps: ['1','2'],
        }).queue([
            {
                titleText: "Diary title",
                input: 'text',
            },
            {
                titleText: 'Private or Public diary',
                input: 'radio',
                inputOptions: {
                    private: 'Private',
                    public: 'Public' 
                },
                inputValue: 'private'
            },
        ]);
        if(result.value){
            const { value } = result;
            const {
                diary,
                user: _user,
            } = await http.post<Partial<Diary>, {diary: Diary; user: User}>(`/diaries/`,{
                title: value[0],
                type: value[1],
                userId: user?.id,
            });
            if(diary && user) {
                dispatch(addDiary([diary] as Diary[]));
                dispatch(addDiary([diary] as Diary[]));
                dispatch(setUser(_user));
                return Swal.fire({
                    titleText: 'All done!',
                    confirmButtonText: 'OK!',
                })
            }
        }
        Swal.fire({
            titleText: 'Cancelled',
        })
    } 
    return(
        <div style={{padding: '1em 0.4em'}}>
            <Switch>
                <Route path="/diary/:id">
                    <DiaryEntriesList />
                </Route>
                <Route path="/">
                    <button onClick={createDiary}>Create New </button>
                    {diaries.map((diary, idx) => (
                        <DiaryTile key={idx} diary={diary} />
                    ))}
                </Route>
            </Switch>
        </div>
    )
}

export default Diaries;