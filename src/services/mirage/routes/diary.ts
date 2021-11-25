import dayjs from "dayjs";
import { Request, Response } from "miragejs";
import { Diary } from "../../../interfaces/diary.interface";
import { Entry } from "../../../interfaces/entry.interface";
import { User } from "../../../interfaces/user.interface";
import { handleErrors } from "../server";

// creates diary
export const create = (schema: any, req: Request): {user: User, diary: Diary} | Response => {
    try{
        const { title, type, userId } = JSON.parse(req.requestBody) as Partial<Diary>;

        const exUser = schema.users.findBy({id: userId});

        if(!exUser) {
            return handleErrors(null, 'No such user exists.');
        }

        const now = dayjs().format();
        const diary = exUser.createDiary({
            title,
            type,
            createdAt: now,
            updatedAt: now
        });
        return{
            user: {
                ...exUser.attrs
            },
            diary: diary.attrs
        }
    }catch(err) {
        return handleErrors(err, 'failed to create diary.')
    }
}

// updates diary
export const updateDiary = (schema: any, req: Request): Diary | Response => {
    try{
        const diary = schema.diaries.find(req.params.id);
        const data = JSON.parse(req.requestBody) as Partial<Diary>;
        const now = dayjs().format();
        diary.update({
            ...data,
            updatedAt: now,
        });
        return diary.attrs as Diary;

    }catch(err){
        return handleErrors(err, 'Failed to update diary')
    }
}

// get All diaries
export const getDiaries = (schema: any, req: Request): Diary[] | Response => {
    try{
        const user = schema.users.find(req.params.id);
        return user.diary as Diary[]
    }catch(err){
        return handleErrors(err, 'Could not get user diaries')
    }
}

// add entry to diary
export const addEntry = (schema: any, req: Request): {diary: Diary, entry: Entry} | Response => {
    try{
        const diary = schema.diaries.find(req.params.id);
        const { title, content } = JSON.parse(req.requestBody) as Partial<Entry>;
        const now = dayjs().format();
        
        const entry = diary.createEntry({
            title,
            content,
            createdAt: now,
            updatedAt: now
        });
        
        diary.update({
            ...diary.attrs,
            updatedAt: now
        });
        return{
            diary: diary.attrs,
            entry: entry.attrs
        };
    }catch(err) {
        return handleErrors(err, 'Failed to save entry')
    }
}

// get diary's entries
export const getEntries = (schema: any, req: Request): { entries: Entry[] } | Response => {
    try{
        const diary = schema.diaries.find(req.params.id);
        return diary.entry
    }catch(err) {
        return handleErrors(err, 'Failed to get diary entries')
    }
}

// updates entries
export const updateEntry = (schema: any, req: Request): Entry | Response => {
    try{
        const entry = schema.entries.find(req.params.id);
        const data = JSON.parse(req.requestBody) as Partial<Entry>;
        const now  = dayjs().format();
        entry.update({
            ...data,
            updatedAt: now
        });
        return entry.attrs
    }catch(err) {
        return handleErrors(err, 'Failed to update entry.')
    }
}