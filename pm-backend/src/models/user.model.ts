import { prop, Typegoose, ModelType, InstanceType, pre, instanceMethod, arrayProp, Ref } from 'typegoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Organization } from './organization/organization.model';

const SALT_WORK_FACTOR = 10; // Must go on secret config

//fore some reason we cant use ref here so we must use string?
export class Invitation {
  @prop({required: true})
  organization: string

  @prop({required: true})
  role: string;
}

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
  
  @arrayProp({items: Invitation})
  invitations: Invitation[];


  @instanceMethod
  async validatePassword(this: InstanceType<User>, password: String): Promise<User | undefined> {
        return bcrypt.compare(password, this.password).then((value) => {
            if(value) {
                return this;
            }
        }) 
  }
}

const UserModel = new User().getModelForClass(User);

export {User, UserModel};
