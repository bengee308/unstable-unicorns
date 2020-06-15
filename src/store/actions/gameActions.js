export const drawCard = () => {
    return (dispatch, getState, {getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const { game: {roomName} } = getState();
        const { game: {playerName} } = getState();
        const roomRef = firestore.collection('rooms').doc(roomName);
        const playerStableRef = roomRef.collection('players').doc(playerName);
        roomRef.get().then(function(doc) {
            if (doc.exists) {
                debugger;
                const drawnCard = doc.data().deck[0];
                playerStableRef.update({
                    stable: firestore.FieldValue.arrayUnion(drawnCard)
                });
                // remove drawn card from the deck
                roomRef.update({
                    deck: firestore.FieldValue.arrayRemove(drawnCard)
                })
            }
        });
    }
}

export const endTurn = () => {
    return (dispatch, getState, {getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const { game: {roomName} } = getState();
        const roomRef = firestore.collection('rooms').doc(roomName);
        roomRef.get().then((doc) => {
            if (doc.exists) {
                const currPlayerIndex = doc.data().currPlayerIndex;
                const numPlayers = doc.data().playerOrder.length;
                roomRef.update({
                    currPlayerIndex: (currPlayerIndex + 1) % numPlayers
                });
            }
        });
    }
}