import React from 'react';
import { useDispatch } from 'react-redux';
import { drawCard, endTurn } from '../store/actions/gameActions'

const Controls = (props) => {
    const dispatch = useDispatch();
    const drawCardAction = () => dispatch(drawCard());
    const endTurnAction = () => dispatch(endTurn());
    return (
        [
            <button disabled={props.disabled} onClick={drawCardAction}>Draw</button>,
            <button disabled={props.disabled} onClick={endTurnAction}>End Turn</button>
        ]
    )
}

export default Controls;