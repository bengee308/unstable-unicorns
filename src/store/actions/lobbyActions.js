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
            playerOrder: [room.playerName],
            currPlayerIndex: 0,
        });
        const p2 = roomRef.collection('players').doc(room.playerName).set({
            hand: [],
            stable: []
        });
        Promise.all([p1, p2]).then(() => {
            setRoomCookies(room.playerName);
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
                    docRef.update({
                        playerOrder: firestore.FieldValue.arrayUnion(room.playerName)
                    });
                    const playerRef = docRef.collection('players').doc(room.playerName);
                    playerRef.get().then((playerDoc) => {
                        // initialize hand and stable to empty if the player doesn't exist already
                        if (!playerDoc.exists) {
                            playerRef.set({
                                hand: [],
                                stable: []
                            });
                        }
                        setRoomCookies(room.playerName);
                        dispatch({type: actions.JOIN_ROOM, room});
                        ownProps.history.push(`/room/${room.roomName}`);
                    })
                } else {
                    alert('wrong password for room')
                }

            } else {
                alert("room doesn't exist")
            }
        });
    }
}

const setRoomCookies = (playerName) => {
    Cookies.set('playerName', playerName);
}