import { prop, Typegoose, ModelType, InstanceType, instanceMethod, Ref, arrayProp } from 'typegoose';
import * as mongoose from 'mongoose';

import { User } from './user';

export class Project extends Typegoose {
    @prop()
    name: string;

    @prop()
    manager: Ref<User>

    @arrayProp({ itemsRef: User })
    admins: Ref<User>[];

    @arrayProp({ itemsRef: User })
    members: Ref<User>[];
}
