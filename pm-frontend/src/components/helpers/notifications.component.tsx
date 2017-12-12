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
} as React.CSSProperties

export default class Notifications extends React.Component<NotificationsProps, {}> {
    notificationList(notifications: {[id: string] : {message: string, type: string}}) {
        console.log('------*------');
        let list = []
        for(let key in notifications) {
            console.log(notifications[key]);
            list.push(notifications[key]);
        }
        return list;
    }

    render() {
        return(
            <TransitionGroup as={List}   style={style}>
                {this.notificationList(this.props.notifications).map((notification, index) => {
                    return <div>{index}</div>
                })}
            </TransitionGroup>
        )}
}