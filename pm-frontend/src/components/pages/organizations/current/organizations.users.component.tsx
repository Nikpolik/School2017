import * as React from 'react';
import { Modal, Menu, Segment, Header, Input, Icon, Button, List, Select } from 'semantic-ui-react';
import { type } from 'os';

interface UserListProps {
    gotInfo: {
        members: boolean;
        admins: boolean;
    };
    members: {id: string, username: string}[];
    admins: {id: string, username: string}[];
    loadInfo: (userList: any, role: string) => void;
    inviteUser: (username: string, role: string) => void;
    permissions: Number
}

const options = [
    {key: 'member', text: 'member',value: 'member'}
    ,{key: 'admin', text: 'admin', value: 'admin'}
];
export default class UserList extends React.Component<UserListProps, {username: string, role: any}> {
    
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            role: 'member'
        }
    }

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

    addUser(this: UserList) {
        const { role, username } = this.state;
        this.props.inviteUser(username, role)
    }

    getInvite(permissions) {
        console.log(permissions);
        if(permissions > 0) {
            return (
            <div>
                <Header>Invite</Header>
                <Input type='text' placeholder='Invite...' action>
                    <input  onChange={(event) => this.setState({username: event.target.value})}/>
                    <Select onChange={(event, data) => this.setState({role: data.value})} compact options={options} defaultValue='member' />
                    <Button type='submit' onClick={this.addUser.bind(this)}>Invite</Button>
                </Input>
            </div>
            )
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
                    {this.getInvite(this.props.permissions)}
                </Modal.Content>
            </Modal>
        )    
    }
}