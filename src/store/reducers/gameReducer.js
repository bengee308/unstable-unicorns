import * as actionTypes from '../actions/actionTypes';
import { List } from 'immutable';

const initialState = {
    // TODO: get rid of default roomName and playerName - load these based on cookies instead
    roomName: "baby",
    playerName: "bear"
}

const joinRoom = (state, action) => {
    return {
        ...state,
        roomName: action.room.roomName,
        playerName: action.room.playerNickname
    }
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.JOIN_ROOM: return joinRoom(state, action);
        default: return state;
    }
}

export default reducer;