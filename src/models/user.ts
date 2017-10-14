import { Schema, PassportLocalSchema, PassportLocalDocument, model } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';

import { IUser, UserModel } from '../interfaces';

const UserSchema = new Schema({
	name: String,
	age: Number,
	sex: Boolean,
}) as PassportLocalSchema;

UserSchema.plugin(passportLocalMongoose);

const User: UserModel<IUser> = model<IUser>('User, UserSchema');
export default User;