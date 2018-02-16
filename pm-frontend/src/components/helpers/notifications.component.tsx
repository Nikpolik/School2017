import * as React from 'react';
import { Message, List, TransitionGroup } from 'semantic-ui-react';

interface NotificationsProps {
    notifications: {}
    deleteNotification(id: string): void
}

const style = {
    position: "absolute",
    top: '3.5rem',
    right: '1.5rem',
    cursor: 'pointer',
    zIndex: 9999

} as React.CSSProperties

export default class Notifications extends React.Component<NotificationsProps, {}> {
    notificationList(notifications: {[id: string] : {message: string, type: string}}) {
        return Object.keys(notifications).map((key) => {
            const style = {}
            // the prop must just exist for the style to take effect
            style[notifications[key].type] = true;
            return <List.Item key={key} onClick={() => {this.props.deleteNotification(key)}}  ><Message {...style}>{notifications[key].message}</Message></List.Item>
        })
    }

    render() {
        const notifications = this.notificationList(this.props.notifications);
        return(
            <TransitionGroup as={List}   style={style}>
                {notifications}
            </TransitionGroup>
        )}
}