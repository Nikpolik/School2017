import {Organization, OrganizationModel} from '../models/organization/organization.model';
import { UserModel } from '../models/user.model';
import * as mongoose from 'mongoose';

export async function createOrganization(ownerId: string, name: string) {
    return UserModel.findById(ownerId).then((owner) => {
        if(owner) {
            const o = new OrganizationModel({owner, name});
            return o.save();
        } else {
            throw new Error('User not found');
        }
    }).then(() => {
        return {
            success: true,
        }
    }).catch((err: Error) => {
        return {
            success: false,
            reason: err.message
        }
    });
}