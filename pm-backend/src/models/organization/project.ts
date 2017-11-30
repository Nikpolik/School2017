import { prop, Typegoose, ModelType, InstanceType, instanceMethod, Ref, arrayProp } from 'typegoose';
import * as mongoose from 'mongoose';

import { User } from '../user.model';

export class Project extends Typegoose {
    @prop()
    name: string;

    @prop({ref: User})
    manager: Ref<User>

    @arrayProp({ itemsRef: User })
    admins: Ref<User>[];

    @arrayProp({ itemsRef: User })
    members: Ref<User>[];
}
