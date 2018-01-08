import * as React from 'react';
import { Grid, Card, Loader, Segment, Button, Header } from 'semantic-ui-react';
import { Organization } from '../../../interfaces';
import OrgCreate from './organizations.create.component';

interface OrgsViewProps {
    getOrgs: any;
    owner: Organization[];
    admin: Organization[];
    member: Organization[];
    fetching: boolean;
}

const innerStyle = {
    paddingLeft: '20px',
}

const headerStyle = {
    paddingBottom: '30px',
    paddingLeft: '20px',    
}


export default class OrgsView extends React.Component<OrgsViewProps, {}> {
    
    componentWillMount() {
        if(!this.props.fetching) {
                console.log('Fetching');
                this.props.getOrgs('owner');
                this.props.getOrgs('member');
                this.props.getOrgs('admin');
        }
    }

    render() {
        let content = <div>You are not part of an organization yet! Create your own or ask for an invite!</div>;
        if(this.props.fetching) {
            return (<Loader/>);
        }
        let ownerContent = <div>No organizations here. Press the add button to create one</div>;
        let adminContent = <div>No organizations here. If you expect to be part of one ask the manager to invite you</div>;
        let memberContent = <div>No organizations here. If you expect to be part of one ask the manager to invite you</div>;
        
        if(this.props.owner.length > 0) {
            let ownerList = [];
            for(let organization of this.props.owner) {
                ownerList.push({
                    header: organization.name,
                    description: organization.description
                });
            }
            ownerContent = <Card.Group items={ownerList}/>
        }
        if(this.props.member.length > 0) {
            let memberList = [];
            for(let organization of this.props.owner) {
                memberList.push({
                    header: organization.name,
                    description: organization.description
                });
            }
            memberContent = <Card.Group items={memberList}/>
        }
        if(this.props.admin.length > 0) {
            let adminList = [];
            for(let organization of this.props.owner) {
                adminList.push({
                    header: organization.name,
                    description: organization.description
                });
            }
            adminContent = <Card.Group items={adminList}/>
        }
        return(
            <div>
                <Segment vertical><Header as='h1' style={headerStyle}>Organizations</Header></Segment>
                <Segment vertical>
                    <OrgCreate/>  
                    <div style={innerStyle}>
                        <Header as='h2'>Owner</Header>
                        {ownerContent}
                    </div>
                </Segment>
                <Segment vertical>
                    <div style={innerStyle}>
                        <Header as='h2'>Member</Header>
                        {memberContent}
                    </div>
                </Segment>
                <Segment vertical>
                    <div style={innerStyle}>
                        <Header as='h2'>Admin</Header>
                        {adminContent}
                    </div>
                </Segment>
            </div>
        );
    }
}