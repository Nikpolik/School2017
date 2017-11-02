import * as React from 'react';
import { Button } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

export interface HelloProps { compiler: string; framework: string; }

export class App extends React.Component<HelloProps, {}> {
	render() {
		return(
			<Router>

			</Router>
		);		
	}
} 