import * as React from 'react';
import { Grid, Card, Loader, Segment, Button, Header, Modal, Form, Message, Menu } from 'semantic-ui-react';

interface OrgEditProps {
    name: string;
    description: string;
    editInfo: (info: {description?: string, name?: string}) => void;
};

interface OrgEditState {
    open: boolean;
    error: boolean;
}

export default class OrgEdit extends React.Component<OrgEditProps, OrgEditState> {
    name: HTMLInputElement;
    description: HTMLTextAreaElement;

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error: false
        }
    }

    submit() {
        if(this.name.value !== '' ) {
            this.props.editInfo({name: this.name.value, description: this.description.value});
            this.setState({open: false});
            return;
        }
        this.setState({error: true});
        return
    }

    render() {
        return(
            <Modal
                size='small'
                open={this.state.open}
                onClose={() => this.setState({open: false})}
                
                trigger={
                    <Menu.Item 
                        onClick={() => {this.setState({open: true})}}
                        name="edit info"
                    />
                }>
                <Modal.Header>Edit Organization</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Organization Name</label>
                            <input 
                                ref={name => this.name = name} 
                                defaultValue={this.props.name} 
                                placeholder='Name'
                            />
                             <Message
                              visible={this.state.error}
                              error
                              header='Error'
                              content="Please enter a name for your new organization"
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <textarea 
                                ref={description => this.description = description} 
                                placeholder='Description'
                                defaultValue={this.props.description}
                            />
                        </Form.Field>           
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.submit()} positive>Create</Button>
                    <Button onClick={() => this.setState({open: false})} negative>Close</Button>
                </Modal.Actions>
            </Modal>
        );}
};
