import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import UserList from './organizations.users.component';
import ProjectCreate from '../../projects/projects.create.component';

export default class OrgsSideBar extends React.Component<any,{}> { 
    render() {
        return(
        <Menu fluid vertical>
            <Menu.Item><Menu.Header>Organization Controls</Menu.Header></Menu.Item>
            <ProjectCreate members={this.props.members} admins={this.props.admins}/>
            <UserList loadInfo={this.props.loadInfo} members={this.props.members} admins={this.props.admins} gotInfo={this.props.gotInfo}/>
            <Menu.Item name='Edit Info' onClick={() => console.log('clicked')}/>
            <Menu.Item name='Change Permissions' onClick={() => console.log('clicked')}/>
        </Menu>)
    }
}