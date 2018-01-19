import * as React from 'react';
import { Grid, Card, Loader, Segment, Button, Header, Modal, Form, Message } from 'semantic-ui-react';

const buttonStyle = {
    marginTop: '10px',
    marginRight: '20px'
};


interface OrgCreateProps {
    create: (description: string, name: string) => void
};

interface OrgCreateState {
    open: boolean;
    error: boolean;
}

export default class OrgCreate extends React.Component<OrgCreateProps, OrgCreateState> {
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
            this.props.create(this.name.value, this.description.value);
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
                trigger={<Button onClick={() => {this.setState({open: true})}} style={buttonStyle} icon='plus' floated='right'/>}>
                <Modal.Header>Create New Organization</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Organization Name</label>
                            <input ref={name => this.name = name} placeholder='Name'/>
                             <Message
                              visible={this.state.error}
                              error
                              header='Error'
                              content="Please enter a name for your new organization"
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <textarea ref={description => this.description = description} placeholder='Description'/>
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
