import {Organization, OrganizationModel} from '../models/organization/organization.model';
import { UserModel } from '../models/user.model';
import { organization } from '../models/index';

export async function createOrganization(id: string, name: string) {
    return UserModel.findById(id).then((owner) => {
        if(owner) {
            const o = new OrganizationModel({owner: owner, name});
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

export async function getOrganizations(id: string, role: string): Promise<{success: boolean, organizations: any}> {
    return OrganizationModel.find({[role]: id}).then((result) => {
        const organizations = result.map((org) => {
            return {
                id: org._id,
                name: org.name,
                description: org.description
            }
        });
        return {
            success: true,
            organizations
        }
    })
}