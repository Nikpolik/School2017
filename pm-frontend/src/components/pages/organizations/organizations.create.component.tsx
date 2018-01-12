import * as React from 'react';
import { Grid, Card, Loader, Segment, Button, Header, Modal, Form } from 'semantic-ui-react';

const buttonStyle = {
    marginTop: '10px',
    marginRight: '20px'
};


interface OrgCreateState {
    modalOpen: boolean;
}

export default class OrgCreate extends React.Component<{}, OrgCreateState> {
    name: HTMLInputElement;
    description: HTMLTextAreaElement;
    
    render() {
        return(
            <Modal
                size='small'
                closeIcon
                trigger={<Button style={buttonStyle} icon='plus' floated='right'/>}>
                <Modal.Header>Create New Organization</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Organization Name</label>
                            <input ref={name => this.name = name} placeholder='Username' />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <textarea ref={description => this.description = description} placeholder='Username' />
                        </Form.Field>           
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button positive>Create</Button>
                </Modal.Actions>
            </Modal>
        );}
};