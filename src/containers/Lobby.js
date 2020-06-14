import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createRoom, joinRoom } from '../store/actions/lobbyActions';
class Lobby extends Component{
    state = {
        playerNickname: "",
        roomName: "",
        roomPassword: ""
    }

    updatePlayerNickname = (e) => {
        this.setState({
            ...this.state,
            playerNickname: e.target.value
        })
    }

    updateRoomName = (e) => {
        this.setState({
            ...this.state,
            roomName: e.target.value
        })
    }

    updateRoomPassword = (e) => {
        this.setState({
            ...this.state,
            roomPassword: e.target.value
        })
    }

    handleCreateRoomClicked = () => {
        this.props.createRoom(this.state);
    }

    handleJoinRoomClicked = () => {
        this.props.joinRoom(this.state);
    }

    render() {
        return(
            <div>
                <h1>Unstable Unicorns</h1>
                <form>
                    <label htmlFor="nickname-input">Nickname: </label>
                    <input id="nickname-input" onChange={this.updatePlayerNickname} value={this.state.playerNickname} />
                    <label htmlFor="room-input">Room: </label>
                    <input id="room-input" onChange={this.updateRoomName} value={this.state.roomName}/>
                    <label htmlFor="password-input">Password: </label>
                    <input id="password-input" onChange={this.updateRoomPassword} value={this.state.roomPassword}/>  
                </form>
                <button onClick={this.handleJoinRoomClicked}>Enter Room</button>
                <button onClick={this.handleCreateRoomClicked}>Create Room</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createRoom: (room) => dispatch(createRoom(room, ownProps)),
        joinRoom: (room) => dispatch(joinRoom(room, ownProps))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
