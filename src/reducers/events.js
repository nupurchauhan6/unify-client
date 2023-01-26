import { RECEIVE_EVENTS } from "../actions/events";

const events = (state = null, action) => {
    switch (action.type) {
        case RECEIVE_EVENTS:
            return action.events;
        default:
            return state;
    }
}

export default events;