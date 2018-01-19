import {Organization, OrganizationModel} from '../models/organization/organization.model';
import { UserModel } from '../models/user.model';
import { organization } from '../models/index';

export async function createOrganization(id: string, name: string, description: string) {
    return UserModel.findById(id).then((owner) => {
        if(owner) {
            const o = new OrganizationModel({owner, name, description});
            return o.save();
        } else {
            throw new Error('User not found');
        }
    }).then((result) => {
        const organization = {
            id: result._id,
            name: result.name,
            description: result.description
        }
        return {
            success: true,
            organization
        }
    }).catch((err: Error) => {
        return {
            success: false,
            reason: err.message
        }
    });
}

export async function getOrganizations(id: string, role: string): Promise<{success: boolean, organizations: any}> {
    let query = {}
    switch (role) {
        case 'owner':
            query = {owner: id};
            break;
        case 'member':
            query = {members: id};
            break;
        case 'admin':
            query = {admins: id};
            break;
        default:
            query = {owner: id};
    }
    return OrganizationModel.find(query).then((result) => {
        const organizations = result.map((org) => {
            return({id: org._id, name: org.name, description: org.description});
        });
        return {
            success: true,
            organizations
        }
    })
}

export async function getSingleOrganization(id: string, user: string): Promise<{success: boolean, organization?: any}> {
    return OrganizationModel.findById(id).then((organization) => {
        if(organization) {
            console.log(organization.getPermissions(user));
            if(organization.getPermissions(user) !== -1) {
                return {success: true, organization}
            }
        }
        return {success: false}
    });
}
