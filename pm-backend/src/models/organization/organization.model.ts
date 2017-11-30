import { prop, Typegoose, ModelType, InstanceType, instanceMethod, Ref, arrayProp } from 'typegoose';
import * as mongoose from 'mongoose';
import { User } from '../user.model';
import { Project } from './project';

class Organization extends Typegoose {
    
    @prop({required: true})
    name: string;

    @prop({required: true, ref: User})
    owner: Ref<User>;

    @arrayProp({ itemsRef: User })
    admins?: Ref<User>[];

    @arrayProp({ itemsRef: User })
    members?: Ref<User>[];

    @arrayProp({ itemsRef: Project })
    projects?: Ref<Project>[];

}

const OrganizationModel = new Organization().getModelForClass(Organization);

export { Organization, OrganizationModel }


