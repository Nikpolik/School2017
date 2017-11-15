import * as React from 'react';
import {Menu} from 'semantic-ui-react';

export interface NavBarProps {
    path: string,
    push: any,
    logout: any    
}

export default class NavBar extends React.Component<NavBarProps, {}> {
    
    render() {
        return(
        <Menu>
            <Menu.Item header>Project Easy</Menu.Item>
            <Menu.Menu position={"right"}>
                <Menu.Item link active={this.props.path === '/login'} onClick={() => this.props.push('/login')} name='login'/>
                <Menu.Item link active={this.props.path === '/register'} onClick={() => this.props.push('/register')} name='register'/>
                <Menu.Item link onClick={()=>this.props.logout()}>Logout</Menu.Item>
            </Menu.Menu>   
        </Menu>)
    }
}