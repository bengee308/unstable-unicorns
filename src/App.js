import React from 'react';
import './App.css';
import Board from './containers/Board'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Lobby from './containers/Lobby'

function App() {
  return (
    <Router>
      <div className="App">
            <Switch>
            <Route exact path="/" component={Lobby} />
            <Route path="/room/:roomName" component={Board}/>
          </Switch>
      </div>
    </Router>
  );
}

export default App;
