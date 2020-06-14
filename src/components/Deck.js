import React, { Component } from "react";

export class Deck extends Component {
    render = () => {
        return (
            <div>
                <button onClick={this.props.draw}>Draw</button>
            </div>
        )
    }
}