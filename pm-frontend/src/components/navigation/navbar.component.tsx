import * as React from 'react';
import {Menu} from 'semantic-ui-react';

export interface NavBarProps {
    path: string;
    push: any;
    logout: any;
    name: string;
}

export default class NavBar extends React.Component<NavBarProps, {}> {
    
    constructor(props: NavBarProps) {
        super(props)
        this.LoggedInControls = this.LoggedInControls.bind(this);
    }

    LoggedInControls() {
        if(this.props.name !== '') {
            return(
            <Menu.Menu position={"right"}>
                <Menu.Item name='login'>{this.props.name}</Menu.Item>
                <Menu.Item link onClick={()=>this.props.logout()}>Logout</Menu.Item>
            </Menu.Menu>
            );
        } else {
            return(
            <Menu.Menu position={"right"}>
                <Menu.Item link active={this.props.path === '/login'} onClick={() => this.props.push('/login')} name='login'/>
                <Menu.Item link active={this.props.path === '/register'} onClick={() => this.props.push('/register')} name='register'/>
            </Menu.Menu>
            ); 
        }
    }

    render() {
        
        return(
        <Menu>
            <Menu.Item header link onClick={() => this.props.push('/')}>Project Easy</Menu.Item>
            <this.LoggedInControls/>
        </Menu>)
    }
}