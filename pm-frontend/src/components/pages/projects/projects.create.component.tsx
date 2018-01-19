import * as React from 'react';
import { Grid, Card, Loader, Segment, Button, Header, Modal, Form, Message, Menu, Search, Input, SearchResult} from 'semantic-ui-react';
import * as _ from 'underscore';

const buttonStyle = {
    marginTop: '10px',
    marginRight: '20px'
};


interface ProjectCreateProps {
    //create: (name: string, manager: string) => void;
    members: {username: string; id: string}[];
    admins: {username: string; id: string}[];
};

interface ProjectCreateState {
    open: boolean;
    error: string;
    manager: string;
    name: string;
    results: any[];
    searched: boolean;
}

export default class ProjectCreate extends React.Component<ProjectCreateProps, ProjectCreateState> {

    constructor(props) {
        super(props);
        this.state = {
            manager: '',
            name: '',
            open: false,
            error: '',
            results: [],
            searched: false
        }
    }

    submit() {
        if(this.state.name === '') {
            this.setState({error: 'You did not chose a name'});
            return;
        }
        let manager = this.state.manager;
        if(!this.state.searched) {
            let flag = false
            for(let member of this.props.members) {
                if(member.username === this.state.manager) {
                    flag = true;
                    manager = member.id;
                    break;
                }
            }
            if(!flag) {
                this.setState({error: 'Did not find manager please select on of the results'});
                return
            }
        }
        this.setState({error: ''});
    }

    handleSearchChange(this: ProjectCreate, event, {value}) {
        this.setState({manager: value})
        const re = new RegExp(value, 'i');
        const isMatch = result => re.test(result.username);
        const filteredResults = this.props.members.filter(isMatch).map((member) => {
            return {title: member.username, value: member.id}
        });
        this.setState({results: filteredResults});
    }

    handleSelection(event, data) {
        this.setState({manager: data.result.value, searched: true, error: ''});
    }

    render() {
        const visible = this.state.error !== ''
        return(
            <Modal
                size='small'
                open={this.state.open}
                trigger={<Menu.Item name='Create Project' onClick={() => this.setState({open: true})}/>}
            >
                <Modal.Header>Create New Project</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Project Name</label>
                            <Input name="Name" onChange={(event, data) => {this.setState({name: data.value})}}/>
                        </Form.Field>
                        <Form.Field>
                            <Search
                                members={this.props.members}
                                results={this.state.results}
                                onResultSelect={this.handleSelection.bind(this)}
                                onSearchChange={this.handleSearchChange.bind(this)}
                            />
                        </Form.Field>       
                        <Message
                            visible={visible}
                            header='Error'
                            error
                            content={this.state.error}
                        />    
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.submit.bind(this)} positive>Create</Button>
                    <Button onClick={() => this.setState({open: false})} negative>Close</Button>
                </Modal.Actions>
            </Modal>
        );}
};
