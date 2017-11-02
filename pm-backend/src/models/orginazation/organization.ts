import { prop, Typegoose, ModelType, InstanceType, instanceMethod, Ref, arrayProp } from 'typegoose';
import * as mongoose from 'mongoose';
import { User } from '../user';
import { Project } from './project';

export class Organization extends Typegoose {
    
    @prop()
    name: string;

    @prop()
    owner: Ref<User>;

    @arrayProp({ itemsRef: User })
    admins?: Ref<User>[];

    @arrayProp({ itemsRef: User })
    members?: Ref<User>[];

    @arrayProp({ itemsRef: Project })
    projects?: Ref<Project>[];

}


