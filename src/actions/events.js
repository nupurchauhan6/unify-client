export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const ADD_EVENT = "ADD_EVENT";

export const receiveEvents = (events) => {
    return {
        type: RECEIVE_EVENTS,
        events,
    };
}

export const addEvent = (event) => {
    return {
        type: ADD_EVENT,
        event,
    };
}