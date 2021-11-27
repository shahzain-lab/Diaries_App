import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../App/store';
import { Diary } from '../../interfaces/diary.interface'
import http from '../../services/API'
import { showAlert } from '../../util';
import { setActiveDiaryId, setCanEdit, setCurrentlyEditing } from '../entry/editorSlice';
import { updateDiary } from './diariesSlice';

interface Props {
    diary: Diary
}

const buttonStyle: React.CSSProperties = {
    fontSize: '0.7em',
    margin: '0 0.5em',
}

const DiaryTiles: React.FC<Props> = (props) => {
    const [diary, setDiary] = useState(props.diary);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useAppDispatch();
    const totalEntries = props.diary?.entryIds?.length;

    const saveChanges = () => {
        http
            .put<Diary, Diary>(`/diaries/${diary.id}`, diary)
            .then(diary => {
                if (diary) {
                    dispatch(updateDiary(diary));
                    showAlert('Saved!', 'success');
                }
            })
            .finally(() => {
                setIsEditing(false);
            })
    }

    return (
        <div className="diary-tile">
            <h2
                className="title"
                title="click to edit"
                onClick={() => setIsEditing(true)}
                style={{
                    cursor: 'pointer'
                }}
            >{
                    isEditing ? (
                        <input
                            value={diary.title}
                            onChange={(e) => {
                                setDiary({
                                    ...diary,
                                    title: e.target.value
                                })
                            }}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    saveChanges()
                                }
                            }}
                        />
                    ) : (
                        <span>{diary.title}</span>
                    )
                }</h2>
            <p className="subtitle">{totalEntries ?? '0'} saved entries</p>
            <div style={{ display: "flex" }}>
                <button
                    style={buttonStyle}
                    onClick={() => {
                        dispatch(setCanEdit(true));
                        dispatch(setActiveDiaryId(diary.id as string));
                        dispatch(setCurrentlyEditing(null));
                    }}
                >
                    Add New Entry
                </button>
                <Link to={`diary/${diary.id}`} style={{ width: '100%' }}>
                    <button className="secondary" style={buttonStyle}>
                        View all →
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default DiaryTiles
