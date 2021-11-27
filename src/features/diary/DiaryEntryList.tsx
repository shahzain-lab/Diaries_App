import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../App/rootReducer';
import { useAppDispatch } from '../../App/store';
import { Entry } from '../../interfaces/entry.interface';
import http from '../../services/API';
import { setCanEdit, setCurrentlyEditing } from '../entry/editorSlice';
import { setEntries } from '../entry/entrySlice';

const DiaryEntryList = () => {
    const { entries } = useSelector((state: RootState) => state);
    const dispatch = useAppDispatch();
    const { id } = useParams();

    useEffect(() => {
        if (id != null) {
            http
                .get<null, { entries: Entry[] }>(`/diaries/entries/${id}`)
                .then(({ entries: _entries }) => {
                    if (_entries) {
                        const sortByLastUpdated = _entries.sort((a, b) => {
                            return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
                        });
                        dispatch(setEntries(sortByLastUpdated));
                    }
                });
        }
    }, [id, dispatch]);

    return (
        <div className="entries">
            <header>
                <Link to="/">
                    <h3>← Go Back</h3>
                </Link>
            </header>
            <ul>
                {entries.map((entry) => (
                    <li
                        key={entry.id}
                        onClick={() => {
                            dispatch(setCurrentlyEditing(entry));
                            dispatch(setCanEdit(true));
                        }}
                    >
                        {entry.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DiaryEntryList
