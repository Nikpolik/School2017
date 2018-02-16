import { prop, Typegoose, ModelType, InstanceType, instanceMethod, Ref, arrayProp } from 'typegoose';
import * as mongoose from 'mongoose';
import { User } from '../user.model';
import Project  from './project.model';


export  class UserInvitation {
    @prop({ref: User, required: true})
    user: Ref<User>

    @prop({required: true})
    role: string;
}

export default class Organization extends Typegoose {
    
    @prop({required: true})
    name: string;

    @prop({required: true, ref: User})
    owner: Ref<User>;

    @prop()
    description?: string;

    @arrayProp({ itemsRef: User })
    admins: Ref<User>[];

    @arrayProp({ itemsRef: User })
    members: Ref<User>[];

    @arrayProp({ itemsRef: Project })
    projects: Ref<Project>[];

    @arrayProp({items: UserInvitation})
    invitations: UserInvitation[]

    @instanceMethod
    getPermissions(this: InstanceType<Organization>, user: string): Number {
        if(this.owner.toString() === user.toString()) {
            return 2
        }
        if(this.admins) {
            if(this.admins.indexOf(user) !== -1) {
                return 1
            }
        }
        if(this.members) {
            if(this.members.indexOf(user) !== -1) {
                return 0
            }
        }
        return -1;
    }
}

export const OrganizationModel = new Organization().getModelForClass(Organization);

