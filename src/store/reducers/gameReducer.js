import * as actionTypes from '../actions/actionTypes';
import { List } from 'immutable';

const initialState = {
    roomName: "",
    playerName: ""
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