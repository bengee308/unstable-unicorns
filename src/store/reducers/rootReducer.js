import {combineReducers} from 'redux';
import gameReducer from './gameReducer'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    game: gameReducer,
    firestore: firestoreReducer

});

export default rootReducer;