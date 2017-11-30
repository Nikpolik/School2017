import { prop, Typegoose, ModelType, InstanceType, pre, instanceMethod } from 'typegoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10; // Must go on secret config


@pre<User>('save', function(next) {
    if(!this.isModified('password')) next();
    bcrypt.genSalt(SALT_WORK_FACTOR).then((salt) => {
        return bcrypt.hash(this.password, salt);
    }).then((hash) => {
        this.password = hash;
        next();
    }).catch((err) => {
        next(err);
    });
})
class User extends Typegoose {
  @prop({ required: true})
  username: string;
  
  @prop({ required: true})
  password: string;

  @prop()
  salt: string;

  @prop()
  age: number;

  @prop()
  token: string
  
  @instanceMethod
  async validatePassword(this: InstanceType<User>, password: String): Promise<Boolean> {
      return bcrypt.compare(password, this.password)
  }
}

const UserModel = new User().getModelForClass(User);

export {User, UserModel};
