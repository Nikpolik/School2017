import Project, { ProjectModel } from '../models/organization/project.model';

export async function getProject(user: string, id: string): Promise<{success: boolean, project: any}> {
    const project = await ProjectModel.findById(id);
    if(!project) {
        throw new Error('Organizations not found');
    }
    const permissions = project.getPermissions(user);
    if(permissions < 0) {
        throw new Error('You dont have permissions');
    }
    return {
        success: true,
        project
    }
}