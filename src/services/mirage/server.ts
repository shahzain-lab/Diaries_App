import {  Server, Model, Factory, belongsTo, hasMany, Response } from 'miragejs';
import {login, signup} from './routes/user';
import * as diary from './routes/diary'

// utility function for Error handling
export const handleErrors = (error: any, message = 'An error ocurred') => {
    return new Response(400, undefined ,{
        data: {
            message,
            isError: true
        }
    })
}

// function returns new Server instance
export const setupServer = (env?: string): Server => {
    return new Server({
        // server’s environment
        environment: env ?? 'development',

        // app models and relationships
        models: {
            entry: Model.extend({
                diary: belongsTo()
            }),

            diary: Model.extend({
                entry: hasMany(),
                user: belongsTo()
            }),

            user: Model.extend({
                diary: hasMany()
            })
        },

        // creates records easily 
        factories: {
            user: Factory.extend({
                username: 'text',
                password: 'password',
                email: 'user@goo.org'
            })
        },

        // creates records in db
        seeds(server) {
            server.create('user')
        },

        // app's routes
        routes() {
            this.urlPrefix = 'https://diaries.app';

            this.get('/diaries/entries/:id', diary.getEntries);
            this.get('/diaries/:id', diary.getDiaries);

            this.post('/auth/login', login);
            this.post('/auth/signup', signup);

            this.post('/diaries/', diary.create);
            this.post('/diaries/entry/:id', diary.addEntry);

            this.put('/diaries/entry/:id', diary.updateEntry);
            this.put('/diaries/:id', diary.updateDiary);
        }
    })
}