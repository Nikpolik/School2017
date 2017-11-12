import * as React from 'react';
import {Menu} from 'semantic-ui-react';
import { store } from '../../index';
import { RouterState } from 'react-router-redux';

interface NavBarProps {
    dispatch: any,
    path: string    
}

const NavBar: React.StatelessComponent<NavBarProps> = (props) => {
    return (
        <Menu>
          <Menu.Item header>Our Company</Menu.Item>
          <Menu.Menu position={"right"}>
                <Menu.Item active={props.path === '/login'} name='login'/>
                <Menu.Item name='register'/>
            </Menu.Menu>   
        </Menu>
    );
}

export default NavBar;