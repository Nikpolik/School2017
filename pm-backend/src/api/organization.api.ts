import {Organization, OrganizationModel} from '../models/organization/organization.model';
import { UserModel } from '../models/user.model';

export async function createOrganization(id: string, name: string) {
    return UserModel.findById(id).then((owner) => {
        if(owner) {
            const o = new OrganizationModel({owner: owner._id, name});
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