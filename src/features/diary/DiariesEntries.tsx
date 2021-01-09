import React,{FC, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { useParams, Link } from 'react-router-dom';
import http from '../../services/API';
import { Entry } from '../../interfaces/entry.interface';
import dayjs from 'dayjs';
import { setEntries } from '../entry/entrySlice';
import { setCurrentlyEditing, setCanEdit } from '../entry/editorSlice';

const DiaryEntriesList: FC = () => {
    const { entries } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const { id }:any = useParams();

    useEffect(() => {
        if(id != null) {
            http.get<null, {entries: Entry[] }>(`/diaries/entries/${id}`).then(({entries: _entries}) => {
                if(_entries) {
                    const sortByLastUpdated = _entries.sort((a, b) => {
                        return dayjs(b.updatedAt).unix() - dayjs(a.updatedAt).unix();
                    });
                    dispatch(setEntries(sortByLastUpdated));
                }
            });
        }
    },[id, dispatch])
  return(
   <div className="entries">
       <header>
           <Link to="/">
           <h3>← Go Back</h3>
           </Link>
       </header>
       <ul>
           {entries.map((entry) => (
               <li 
               key={entry.id} onClick={() => {
               dispatch(setCurrentlyEditing(entry));
                dispatch(setCanEdit(true));
                }}>
                   {entry.title}
               </li>
           ))}
       </ul>
   </div>
  )
}
export default DiaryEntriesList