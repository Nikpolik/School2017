import { createOrganization } from '../organization.api';
import { register } from '../user.api';
import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/expenses');

(async () => {
    createOrganization('5a2006386b7e59727f6fb51f', 'Evil Corp').then((value) => {
        console.log(value);
    })
})();