import { connect } from 'react-redux';
import Notifications from '../../components/helpers/notifications.component';
import * as actions from '../../actions/helpers/notifications.actions';
import { State } from '../../interfaces';


const mapStateToProps = (state: State) => {
    let count = 0;
    const allNotifications = state.app.notifications.notifications;
    const notifications = {}
    const keys = Object.keys(allNotifications).slice(0, 4);
    for(let key of keys) {
        notifications[key] = allNotifications[key];
    }
    return({
        notifications
    });
}

const mapDispatchToPropss = (dispatch: any) => {
    return({
            deleteNotification: (id: string) => dispatch(actions.removeNotification(id))
    });
}

export default connect(mapStateToProps, mapDispatchToPropss)(Notifications);