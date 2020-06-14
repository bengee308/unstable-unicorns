import React from 'react'
export const Card = (props) => {
    const styles = {
        height: '10rem',
    }
    return(<img style={styles} src={`/images/cards/${props.fileName}`}></img>)
}