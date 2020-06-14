import React, { Component } from "react";
import * as actions from '../store/actions/actionTypes'
import { Deck } from '../components/Deck'
import { Card } from '../components/Card'
import { useSelector, useDispatch } from "react-redux";
import Stable from '../components/Stable'
import { useFirestoreConnect } from 'react-redux-firebase';
import Controls from '../components/Controls';
import Cookies from 'js-cookie';

const Board = (props) => {
    const roomName = useSelector(state => state.game.roomName);
    const playerName = useSelector(state => state.game.playerName);
    const dispatch = useDispatch();
    if (!roomName || !playerName) {
        // Try to read roomName and playerName from cookies
        // const roomNameFromCookie = Cookies.get('roomName');
        // const playerNameFromCookie = Cookies.get('playerName');
        // if ( roomNameFromCookie && playerNameFromCookie ) {
        //     dispatch({roommName: roomNameFromCookie, 
        //         playerName: playerNameFromCookie});
        //     return;
        // }
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
    const currentPlayerName = useSelector(state => state.game.playerName);
    const stables = []
    let isCurrentPlayerTurn = false;
    console.log(useSelector(state => state));
    //TODO: remove the stupid currPlayerIndex === 0
    if (players && room && room.playerOrder && (room.currPlayerIndex || room.currPlayerIndex === 0)) {
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