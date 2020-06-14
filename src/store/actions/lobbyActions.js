import {getStartingDeck} from '../../game/Deck';
import * as actions from './actionTypes';
import Cookies from 'js-cookie';

export const createRoom = (room, ownProps) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to DB
        const firestore = getFirestore();
        const roomRef = firestore.collection('rooms').doc(room.roomName);
        const p1 = roomRef.set({
            password: room.roomPassword,
            deck: getStartingDeck(),
            playerOrder: [room.playerNickname],
            currPlayerIndex: 0,
        });
        const p2 = roomRef.collection('players').doc(room.playerNickname).set({
            hand: [],
            stable: []
        });
        Promise.all([p1, p2]).then(() => {
            setRoomCookies(room.playerName, room.roomName);
            dispatch({type: actions.JOIN_ROOM, room});
            ownProps.history.push(`/room/${room.roomName}`);
        });
        //TODO: add .catch?
    }
}

export const joinRoom = (room, ownProps) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const docRef = firestore.collection('rooms').doc(room.roomName);
        docRef.get().then((doc) => {
            if (doc.exists) {
                if (room.roomPassword === doc.data().password) {
                    const p1 = docRef.update({
                        playerOrder: firestore.FieldValue.arrayUnion(room.playerNickname)
                    });
                    const p2 = docRef.collection('players').doc(room.playerNickname).set({
                        hand: [],
                        stable: []
                    });
                    Promise.all([p1,p2]).then(() => {
                        dispatch({type: actions.JOIN_ROOM, room});
                        ownProps.history.push(`/room/${room.roomName}`);
                    });
                } else {
                    alert('wrong password for room')
                }

            } else {
                alert("room doesn't exist")
                //TODO: dispatch an action that shows an invalid room message
            }
        });
        //TODO: add .catch?
    }
}

const setRoomCookies = (playerName, roomName) => {
    Cookies.set('playerName', playerName);
    Cookies.set('roomName', roomName);
}