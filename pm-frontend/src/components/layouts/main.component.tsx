import * as React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

export const MainLayout: React.StatelessComponent = (props: any) => {
    return(
    <Grid>
        <Grid.Column width={4}>
            <this.props.Sidebar/>
        </Grid.Column>
        <Grid.Column stretched width={12}>
          <Segment>
            <this.props.Content/>
          </Segment>
        </Grid.Column>
    </Grid>
    )};