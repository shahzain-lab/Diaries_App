import React, { FC,useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import MarkDown from 'markdown-to-jsx';
import { RootState } from '../../store/rootReducer';
import { setCurrentlyEditing, setCanEdit } from './editorSlice';
import { useAppDispatch } from '../../store/store';
import { showAlert } from '../../util';
import http from '../../services/API';
import { Diary } from '../../interfaces/diary.interface';
import { Entry } from '../../interfaces/entry.interface';
import { updateDiary } from '../diary/diarySlice';

const Editor: FC =()=> {
    const { currentlyEditing:entry, canEdit, activeDiaryId } = useSelector(
        (state: RootState) => state.editor
    );
    const [editedEntry, updateEditedEntry] = useState(entry);
    const dispatch = useAppDispatch();
    const saveEntry = async () => {
        if(activeDiaryId === null) {
            return showAlert('Please select a diary.','warning');
        }
        if(entry === null){
            http.post<Entry, {diary: Diary; entry: Entry }>(
                `/diaries/entry/${activeDiaryId}`,
                editedEntry
            ).then(data => {
                if(data != null){
                    const { diary, entry: _entry } = data;
                    dispatch(setCurrentlyEditing(_entry));
                    dispatch(updateDiary(diary))
                }
            })
        }
    }
}
