import Organization, { OrganizationModel } from '../models/organization/organization.model';
import { UserModel } from '../models/user.model';
import { organization } from '../models/index';
import Project, { ProjectModel } from '../models/organization/project.model';

export async function createOrganization(user: string, name: string, description: string): Promise<{success: boolean, organization: any}> {
    const owner = await UserModel.findById(user);
    if(!user) {
        throw new Error('Could not find owner');
    }
    let organization = new OrganizationModel({owner, name, description});
    await organization.save();
    return {
        success: true,
        organization
    }
}

export async function getOrganizations(id: string, role: string): Promise<{success: boolean, organizations?: any, reason?: string}> {
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
    let result = await OrganizationModel.find(query);
    if(!organization) {
        throw new Error('Could not find organizations');
    }
    const organizations = result.map((org) => {
        return({id: org._id, name: org.name, description: org.description});
    });
    return {
        success: true,
        organizations
    }
}

export async function getSingleOrganization(id: string, user: string): Promise<{success: boolean, organization?: any, permissions: Number}> {
    const organization = await OrganizationModel.findById(id);
    if(!organization) {
        throw new Error('Oganization not found')
    }
    const permissions = organization.getPermissions(user)
    if(permissions < 0) {
        throw new Error('You dont have permissions');
    }
    return {
        success: true,
        organization,
        permissions
    }
}

export async function createProject(id: string, name: string, manager: string, user: string): Promise<{success: boolean, project?: any, reason?: string} > {
    const organization = await OrganizationModel.findById(id);
    if(!organization) {
        throw new Error('Could not find organization');
    }
    if(!name || !manager) {
        throw new Error('Missing parameters can not save project');
    }
    const permissions = organization.getPermissions(user);
    if(permissions < 1) {
        throw new Error('You dont have permissions');
    }
    const managerObject = await UserModel.findById(manager);
    if(!managerObject) {
        throw new Error('Could not find manager');
    }
    const project = new ProjectModel({name, manager: managerObject._id});
    await project.save();
    organization.projects.push(project);
    await organization.save();
    return {
        success: true,
        project
    }
}

export async function inviteToOrganization(id: string, role: string, invitedUser: string ,user: string): Promise<{success: boolean, organization?: any, reason?: string}> {
    const organization = await OrganizationModel.findById(id);
    if(!organization) {
        throw new Error('Could not find organization');
    }
    const permissions = organization.getPermissions(user);
    if(permissions < 1) {
        throw new Error('You dont have permissions');
    }
    const invitedUserObject = await UserModel.findOne({username: invitedUser});
    if(!invitedUserObject) {
        throw new Error('Could not find invited user');
    }
    for(let invitation of organization.invitations) {
        if(invitation.user.toString() === invitedUserObject._id.toString()) {
            throw new Error('Already invited');
        }
    }
    organization.invitations.push({user: invitedUserObject._id, role});
    await organization.save()
    invitedUserObject.invitations.push({organization: organization._id, role});
    await invitedUserObject.save();
    return {
        success: true,
        organization
    }
}

export async function acceptInvite(id: string, user: string): Promise<{success: boolean, reason?: string, invitations?: any}> {
    const organization = await OrganizationModel.findById(id);
    if(!organization) {
        throw new Error('Organization not found');
    }
    let index = 0;
    let foundInvitation = null;
    for(index; index < organization.invitations.length; index++) {
        let invitation = organization.invitations[index];
        if(invitation.user.toString() === user) {
            foundInvitation = invitation;
            organization.invitations.splice(index, 1);
            await organization.save();
            break;
        }
    }
    if(index === organization.invitations.length) {
        throw new Error('Could not find invitation');
    }
    const invitedUser =  await UserModel.findById(user)
    if(!invitedUser) {
        throw new Error('User not found, this should be impossible');
    }
    for(index = 0; index < invitedUser.invitations.length; index++) {
        if(invitedUser.invitations[index].organization === organization._id.toString()) {
            invitedUser.invitations.splice(index, 1);
            await invitedUser.save();
            break;
        }
    }
    if(index === invitedUser.invitations.length) {
        throw new Error('Could not find invitations');
    }
    if(!foundInvitation) {
        throw new Error('Found invitation was not valid');
    }
    if(foundInvitation.role === 'admin') {
        organization.admins.push(foundInvitation.user);
    } else {
        organization.members.push(foundInvitation.user);
    }
    await organization.save();
    return {
        success: true,
        invitations: invitedUser.invitations
    }
}

export async function editInfo(id: string, user: string, newInfo: {name?: string, description?: string}): Promise<{success: boolean, organization?: any}> {
    return OrganizationModel.findById(id).then((organization) => {
        if(!organization) {
            throw new Error('Organization not found')
        }
        return UserModel.findById(user).then((user) => {
            if(!user) {
                throw new Error('User not found')
            }
            return {user, organization}
        })
    }).then(({organization, user}) => {
        const permissions = organization.getPermissions(user._id);
        if(permissions < 1) {
            throw new Error('No permissions');
        }
        organization.set(newInfo);
        return organization.save();
    }).then((organization) => {
        return {
            success: true,
            organization
        }
    })
}