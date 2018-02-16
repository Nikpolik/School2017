import * as React from 'react';
import { List, Button, Segment, Header } from 'semantic-ui-react';

const style = {
  paddingBottom: '30px',
  paddingLeft: '20px',
  width: '20%'    
}

interface InvitationsProps {
  invitations: any[],
  fetching: boolean,
  getInvitations: () => void
  accept: (id: string) => void
}

export default class Invitations extends React.Component<InvitationsProps, {}> {

    componentWillMount() {
      const { fetching, getInvitations } = this.props;
      if(!fetching) {
        getInvitations();
      }
    }
    
    render() {
      const { invitations } = this.props;
      let content = <div style={style}>No invitations yet!</div>
      if(invitations.length > 0) {
        content = (
          <List divided style={style}>
            {invitations.map((invitation) => {
              return <List.Item>
                      <List.Content floated="right">
                        <Button primary onClick={() => this.props.accept(invitation.id)}>accept</Button>
                        <Button>reject</Button>
                      </List.Content>
                      <List.Content style={{fontSize: '16px'}}>
                        {invitation.name} as {invitation.role}
                      </List.Content>
                    </List.Item>
            })}
          </List>
        )
      }
      return(
          <div>
              <Segment vertical><Header as='h1' style={style}>Invitations</Header></Segment>
              {content}
          </div>
      )
    }
}