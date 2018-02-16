import * as React from 'react';
import { Grid, Loader, Segment, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router';

import OrgsSideBar from './organizations.sidebar.component';

const headerStyle = {
    paddingBottom: '30px',
    paddingLeft: '20px', 
}

interface OrgCurrentProps {
    fetching: boolean;
    _id: string;
    name: string;
    owner: string;
    description: string;
    projects: any;
    members: any;
    admins: any;
    gotInfo: {
        admins: boolean,
        members: boolean
    },
    permissions: Number;
    loadInfo: (userList: any, role: string) => void;
    inviteUser: (userId: string, role: string) => void;
    editInfo: (info: {description?: string, name?: string}) => void;
}

export default class OrgCurrent extends React.Component<OrgCurrentProps, {}> {
    
    render() {
        if(this.props.fetching) {
            return <Loader/>
        }
        if(!this.props._id) {
            return <Redirect to="/"/>
        }
        return(
            <Grid>
                <Grid.Column width={14}>
                    <Segment vertical>
                        <Header as='h1' style={headerStyle}>
                            {this.props.name}
                            <Header sub style={{paddingTop: '1em'}}>{this.props.description}</Header>
                        </Header>
                    </Segment>
                    <Segment vertical>
                        <Header as='h3' style={headerStyle}>
                            Projects
                        </Header>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={2}>
                    <OrgsSideBar 
                        name={this.props.name}
                        description={this.props.description}
                        loadInfo={this.props.loadInfo} 
                        members={this.props.members} 
                        admins={this.props.admins} 
                        gotInfo={this.props.gotInfo} 
                        inviteUser={this.props.inviteUser}
                        permissions={this.props.permissions}
                        editInfo={this.props.editInfo}
                    />
                </Grid.Column>
            </Grid>
        )
    }
}
