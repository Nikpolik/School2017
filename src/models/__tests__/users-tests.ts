import * as mongoose from 'mongoose';

import UserModel, { User } from '../user';

mongoose.connect('mongodb://localhost/test');

(async () => {
    const u = new UserModel({
        username: 'olniki',
        password: 'test',
        age: 15
    });
    await u.save();
    console.log('finished saving');
    const user = await UserModel.findOne();
    if(user !== null) {
        user as User;
        console.log(user);
        console.log(await user.validatePassword('test'));
    }
})();

