import React,{FC, useState} from 'react';
import { Diary } from '../../interfaces/diary.interface';
import { useDispatch } from 'react-redux';
import http from '../../services/API';
import { updateDiary } from '../../services/mirage/routes/diary';
import { showAlert } from '../../util';
import { Link } from 'react-router-dom';

interface Props{
    diary: Diary;
}

const buttonStyle: React.CSSProperties = {
    fontSize: '0.7em',
    margin: '0 0.5em',
  };

  const DiaryTile: FC<Props> = (props) => {
      const [diary, setDiary] = useState(props.diary);
      const [isEditing, setEditing] = useState(false);
      const dispatch = useDispatch()
      const totalEntries = props.diary?.entryIds?.length;

      const saveChanges = () => {
          http.put<Diary, Diary>(`/diaries/${diary.id}`, diary).then(diary => {
              if(diary) {
                  dispatch(updateDiary(diary));
                  showAlert('Saved!', 'success');
              }
          }).finally(() => {
              setEditing(false)
          });
      };
      return(
          <div className="diary-tile">
              <h2  className="title"
        title="Click to edit"
        onClick={() => setEditing(true)}
        style={{
          cursor: 'pointer',
        }}>
                {isEditing ? (
                    <input 
                     value= {diary.title}
                     onChange={(e) => {
                         setDiary({
                             ...diary,
                             title: e.target.value
                         });
                     }}
                     onKeyUp={e => {
                         if(e.key === 'Enter'){
                             saveChanges();
                         }
                     }}
                    />
                ): (
                <span>{diary.title}</span>
                )}
              </h2>
                <p className="subtitle">{totalEntries ?? '0'} saved entries</p>
                <div style={{display:'flex'}}>
                    <button
                     className="title"
                     title="Click to edit"
                     onClick={() => setEditing(true)}
                     style={{
                       cursor: 'pointer',
                     }}>
                         Add new Entry
                     </button>
                     <Link to={`diary/${diary.id}`} style={{width: '100%'}}>
                         <button className="secondary" style={buttonStyle}>
                             View all →
                         </button>
                     </Link>
                     </div>   
          </div>
      );
  };

  export default DiaryTile