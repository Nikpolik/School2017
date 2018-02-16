import { prop, Typegoose, ModelType, InstanceType, instanceMethod, Ref, arrayProp } from 'typegoose';
import * as mongoose from 'mongoose';

import { User } from '../user.model';

export class Todo {
    @prop({ required: true })
    text: string

    @prop({ default: true })
    complete: boolean
}

export default class TodoList extends Typegoose {
    @prop({required: true})
    title: string;

    @arrayProp({ itemsRef: User })
    assigned?: Ref<User>[];

    @arrayProp({ itemsRef: Todo, default: [] })
    todo: Ref<Todo>
}

export const TodoListModel = new TodoList().getModelForClass(TodoList);
