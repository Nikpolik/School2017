import { PassportLocalDocument, PassportLocalModel } from 'mongoose';

export interface User extends PassportLocalDocument {
    _id: string;
    username: string;
    hash: string;
    attempts: number;
    last: Date;
}

export interface UserModel<T extends Document> extends PassportLocalModel<T> {}