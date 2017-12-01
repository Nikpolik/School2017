import * as React from 'react';
import { Message } from 'semantic-ui-react';

interface NotificationsProps {
    notifications: string[]
    deleteNotification(id: number): void
}

const style = {
    position: "absolute",
    top: '0px',
    right: '50rem',
} as React.CSSProperties

export default class Notifications extends React.Component<NotificationsProps, {}> {
    render() {
        return(
            <div style={style}>
                {this.props.notifications.map((message, index) => {
                    return <Message onDismiss={() => this.props.deleteNotification(index)} compact floating key={index}>{message}</Message>
                })}
            </div>
        )}
}