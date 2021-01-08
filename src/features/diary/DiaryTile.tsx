import React,{FC, useState} from 'react';
import { Diary } from '../../interfaces/diary.interface';

interface Props{
    diary: Diary;
}

const buttonStyle: React.CSSProperties = {
    fontSize: '0.7em',
    margin: '0 0.5em',
  };
  