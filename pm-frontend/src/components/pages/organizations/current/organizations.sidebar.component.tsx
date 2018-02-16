import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import UserList from './organizations.users.component';
import ProjectCreate from '../../projects/projects.create.component';
import OrgEdit from './organizations.edit.component';

interface OrgsSideBarProps {
    gotInfo: {
        members: boolean;
        admins: boolean;
    };
    description: string;
    name: string;
    members: {id: string, username: string}[];
    admins: {id: string, username: string}[];
    loadInfo: (userList: any, role: string) => void;
    inviteUser: (userId: string, role: string) => void;
    editInfo: (info: {description?: string, name?: string}) => void;
    permissions: Number
}


export default class OrgsSideBar extends React.Component<OrgsSideBarProps,{}> { 
    render() {
        return(
        <Menu fluid vertical>
            <Menu.Item><Menu.Header>Organization Controls</Menu.Header></Menu.Item>
            <ProjectCreate members={this.props.members} admins={this.props.admins}/>
            <UserList 
                loadInfo={this.props.loadInfo} 
                members={this.props.members} 
                admins={this.props.admins} 
                gotInfo={this.props.gotInfo}
                inviteUser={this.props.inviteUser}
                permissions={this.props.permissions}
            />
            <OrgEdit 
                name={this.props.name}
                description={this.props.description}
                editInfo={this.props.editInfo}
            />
            <Menu.Item name='Change Permissions' onClick={() => console.log('clicked')}/>
        </Menu>)
    }
}