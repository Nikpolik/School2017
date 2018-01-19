import * as React from 'react';
import { Modal, Menu, Segment, Header, Input, Icon, Button, List } from 'semantic-ui-react';
import { type } from 'os';

interface UserListProps {
    gotInfo: {
        members: boolean;
        admins: boolean;
    };
    members: {id: string, username: string}[];
    admins: {id: string, username: string}[];
    loadInfo: (userList: any, role: string) => void;
}

export default class UserList extends React.Component<UserListProps> {
    
    componentWillMount() {
        if(!this.props.gotInfo.admins) {
            if(this.props.admins.length > 0) {
                this.props.loadInfo(this.props.admins, 'admins')
            }
        }
        if(!this.props.gotInfo.members) {
            if(this.props.members.length > 0) {
                this.props.loadInfo(this.props.members, 'members');
            }
        }
    }

    render() {
        let members = <div>No users yet you should add some from the invite button</div>
        let admins = <div>No admins yet you should add some from the invite button</div>
        if(this.props.gotInfo.members) {
            let membersList = this.props.members.map((member) => {
                return(<div key={member.id}>{member.username}, </div>)
            })
            members = <List>{membersList}</List>
        }
        if(this.props.gotInfo.admins) {
            let adminsList = this.props.admins.map((admin) => {
                return(<div key={admin.id}>{admin.username}, </div>)
            })            
            admins = <List>{adminsList}</List>
        }
        return (
            <Modal
                trigger={<Menu.Item name='View Users'/>}
            >
                <Modal.Header>
                    Users in Organization
                </Modal.Header>
                <Modal.Content>
                    <Header>Admins</Header>
                    {admins}
                    <br/>
                    <Header>Members</Header>
                    {members}
                    <br/>
                    <Header>Invite</Header>
                    <Input action={<Button>Invite</Button>}/>
                </Modal.Content>
            </Modal>
        )    
    }
}