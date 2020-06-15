import React, { Component, useEffect } from "react";
import * as actions from '../store/actions/actionTypes'
import { Deck } from '../components/Deck'
import { Card } from '../components/Card'
import { useSelector, useDispatch } from "react-redux";
import Stable from '../components/Stable'
import { useFirestoreConnect } from 'react-redux-firebase';
import * as actionTypes from '../store/actions/actionTypes';
import Controls from '../components/Controls';
import Cookies from 'js-cookie';

const Board = (props) => {
    let roomName = useSelector(state => state.game.roomName);
    let currentPlayerName = useSelector(state => state.game.playerName);
    
    const dispatch = useDispatch();
    if (!roomName || !currentPlayerName) {
        // load roomName from the url
        roomName = props.match.params.roomName;
        // load playerName from cookies
        currentPlayerName = Cookies.get('playerName');
        dispatch({type: actionTypes.JOIN_ROOM, room: {roomName, playerName: currentPlayerName}});
    }

    useFirestoreConnect([
        {
            collection: 'rooms',
            doc: roomName,
            storeAs: 'room'
        },
        {
            collection: 'rooms',
            doc: roomName,
            subcollections: [
                {collection: 'players'}
            ],
            storeAs: 'players'
        },
    ]);
    const players = useSelector(state => state.firestore.data.players);
    const room = useSelector(state => state.firestore.data.room);
    const stables = []
    let isCurrentPlayerTurn = false;
    if (players && room && room.playerOrder && Object.keys(players).length === room.playerOrder.length 
        && (Number.isInteger(room.currPlayerIndex))) {
            debugger;
        for (const player of room.playerOrder) {
            const isActive = room.playerOrder[room.currPlayerIndex] === player;
            if (player === currentPlayerName && isActive) {
                isCurrentPlayerTurn = true;
            }
            stables.push(<Stable active={isActive} name={player} cards={players[player].stable}/>)
        }
    }

    return (
        <div>
            {stables}
            <Controls disabled={!isCurrentPlayerTurn}/>
        </div>
    )
}

export default Board;