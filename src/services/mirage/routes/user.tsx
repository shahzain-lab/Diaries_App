import { Response,Request } from 'miragejs';
import { handleErrors } from '../server';
import { randomBytes } from 'crypto'
import { User } from '../../../interfaces/user.interface';

const generateToken =()=> randomBytes(8).toString('hex');

export interface AuthResponse {
    token: string;
    user: User
};
