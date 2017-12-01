import { connect } from 'react-redux';
import Notifications from '../../components/helpers/notifications.component';
import * as actions from '../../actions/helpers/notifications.actions';
import { State } from '../../interfaces';


const mapStateToProps = (state: State) => {
    return({
        notifications: state.app.notifications.notifications.slice(0, 3)
    });
}

const mapDispatchToPropss = (dispatch: any) => {
    return({
            deleteNotification: (index: number) => dispatch(actions.removeNotification(index))
    });
}

export default connect(mapStateToProps, mapDispatchToPropss)(Notifications);