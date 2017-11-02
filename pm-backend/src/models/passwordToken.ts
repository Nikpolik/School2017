import { prop, Typegoose, ModelType, InstanceType, pre, instanceMethod } from 'typegoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10; // Must go on secret config

@pre<Token>('save', function(next) {
    if(!this.isModified('token')) next();
    bcrypt.genSalt(SALT_WORK_FACTOR).then((salt) => {
        return bcrypt.hash(this.token, salt);
    }).then((hash) => {
        this.token = hash;
        next();
    }).catch((err) => {
        next(err);
    });
})
export class Token extends Typegoose {
    @prop()
    token: string;
}

const TokenModel = new Token().getModelForClass(Token);
export default TokenModel;
