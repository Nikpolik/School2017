import { prop, Typegoose, ModelType, InstanceType, instanceMethod, Ref, arrayProp } from 'typegoose';
import * as mongoose from 'mongoose';

import { User } from '../user.model';
import Todo from './todo.model';

export default class Project extends Typegoose {
    @prop({required: true})
    name: string;

    @prop({required: true,ref: User})
    manager: Ref<User>

    @arrayProp({ itemsRef: User })
    members?: Ref<User>[];

    @arrayProp({ itemsRef: Todo})
    todos?: Ref<Todo>[];

    @instanceMethod
    getPermissions(this: InstanceType<Project>, user: string): Number {
        if(this.manager.toString() === user.toString()) {
            return 2
        }

        if(this.members) {
            if(this.members.indexOf(user) !== -1) {
                return 0
            }
        }
        return -1;
    }
}

export const ProjectModel = new Project().getModelForClass(Project);