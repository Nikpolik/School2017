import * as React from 'react';
import { Message, List, TransitionGroup } from 'semantic-ui-react';

interface NotificationsProps {
    notifications: string[]
    deleteNotification(id: number): void
}

const style = {
    position: "absolute",
    top: '3.5rem',
    right: '1.5rem',
} as React.CSSProperties

export default class Notifications extends React.Component<NotificationsProps, {}> {
    render() {
        return(
                <TransitionGroup as={List}   style={style}>
                    {this.props.notifications.map((message, index) => {
                        return (
                        <List.Item key={index}>
                            <Message style={{cursor: 'pointer'}} onClick={() => this.props.deleteNotification(index)} compact floating>{message}</Message>
                        </List.Item>)
                    })}
                </TransitionGroup>
        )}
}