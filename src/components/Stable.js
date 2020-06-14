import React from 'react'
import {Card} from '../components/Card'

const Stable = (props) => {
    const styles = {
        border: '1px solid white'
    }

    if (props.active) {
        styles.backgroundColor = 'green';
    }

    return (
        <div style={styles}>
            <h3>Player: {props.name}</h3>
            {props.cards.map((card)=> {
                return(<Card fileName={card}/>)
            })}
        </div>
    )
}
export default Stable;