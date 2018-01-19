import * as React from 'react';
import { Grid, Loader, Segment, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router';

import OrgsSideBar from './organizations.sidebar.component';

const headerStyle = {
    paddingBottom: '30px',
    paddingLeft: '20px', 
}
export default class OrgCurrent extends React.Component<any, {}> {
    render() {
        console.log(this.props);
        if(this.props.fetching) {
            console.log('fetching');
            return <Loader/>
        }
        if(!this.props._id) {
            console.log(this.props);
            console.log('something went wrong go back');
            return <Redirect to="/"/>
        }
        console.log('All normal');
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
                    <OrgsSideBar loadInfo={this.props.loadInfo} members={this.props.members} admins={this.props.admins} gotInfo={this.props.gotInfo}/>
                </Grid.Column>
            </Grid>
        )
    }
}
