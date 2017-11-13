import * as React from 'react';
import {Menu} from 'semantic-ui-react';

export interface NavBarProps {
    path: string,
    push: any    
}

export default class NavBar extends React.Component<NavBarProps, {}> {
    render() {
        return(
        <Menu>
            <Menu.Item header>Our Company</Menu.Item>
            <Menu.Menu position={"right"}>
                <Menu.Item active={this.props.path === '/login'} name='login'/>
                <Menu.Item name='register'/>
            </Menu.Menu>   
        </Menu>)
    }
}
