import * as React from 'react';
import { Menu } from 'semantic-ui-react';
import UserList from './organizations.users.component';

export default class OrgsSideBar extends React.Component<any,{}> { 
    render() {
        console.log(this.props);
        return(
        <Menu fluid vertical>
            <Menu.Item><Menu.Header>Organization Controls</Menu.Header></Menu.Item>
            <Menu.Item name='Create Project' onClick={() => console.log('clicked')}/>
            <UserList loadInfo={this.props.loadInfo} members={this.props.members} admins={this.props.admins} gotInfo={this.props.gotInfo}/>
            <Menu.Item name='Edit Info' onClick={() => console.log('clicked')}/>
            <Menu.Item name='Change Permissions' onClick={() => console.log('clicked')}/>
        </Menu>)
    }
}