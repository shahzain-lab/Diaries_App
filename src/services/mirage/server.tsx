import { Server, Model, Factory, belongsTo, hasMany, Response } from 'miragejs';

import user from './routes/user';
import * as diary from './routes/diary';

///handleErrors response, if any problem occured
export const handleErrors = (error:any, message='An error occured'  ) => {
    return new Response(400, undefined, {
        data: {
            message,
            isError: true,
        },
    });
};

export const setupServer = (env?: string): Server => {
    return new Server({
        environment: env ?? 'development',
        
        //creating models for dynamics data
        models: {
            entry: Model.extend({
                diary: belongsTo(),
            }),
            diary: Model.extend({
                entry: hasMany(),
                user: belongsTo(),
            }),
            user: Model.extend({
                diary: hasMany()
            }),
        },
        
        ///Factories are the perfect place to encode the constraints of your seeding data
        factories: {
            user: Factory.extend({
               username: 'test',
               password: "password",
               email: "Shazain@gmail.com",
            }),
        },
        seeds: (server): any => {
            server.create('user');
        },
        
        ///routes for communicating with network requests
        routes(): void{
            this.urlPrefix = 'https://diaries.app';

            this.get('/diaries/entries/:id', diary.getEntries);
            this.get('/diaries/:id',diary.getDiaries);

            this.post('/auth/login', user.login);
            this.post('/auth/signup', user.signup);

            this.post("/diaries/", diary.create);
            this.post("/diaries/entry/:id", diary.addEntry)

            this.put('/diaries/entry/:id', diary.updateEntry);
            this.put('/diaries/:id',diary.updateDiary);
        }
    })
}