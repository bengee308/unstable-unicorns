const deck = ["UU-ChCo-001.png", "UU-Logo-Rainbow-450_360x.png", "alluring.png", "americorn.png", "angel.png", "annoying.png", "babyblack.jpg", "babyblue.jpg", "babybrown.jpg", "babydeath.jpg", "babygreen.jpg", "babynarwhal.jpg", "babyorange.jpg", "babypink.jpg", "babypurple.jpg", "babyrainbow.jpg", "babywhite.jpg", "babyyellow.jpg", "backkick.jpg", "barbedwire.jpg", "basicblue.jpg", "basicgreen.jpg", "basicindigo.jpg", "basicnarwhal.jpg", "basicorange.jpg", "basicpurple.jpg", "basicred.jpg", "basicyellow.jpg", "blackknight.jpg", "blatantthievery.jpg", "blindinglight.jpg", "brokenstable.jpg", "chainsaw.jpg", "changeofluck.jpg", "classynarwhal.jpg", "doubledutch.jpg", "extratail.jpg", "extremelydestructive.jpg", "extremelyfertile.jpg", "ginormous.jpg", "glitterbomb.jpg", "glittertornado.jpg", "gooddeal.jpg", "greedyflying.jpg", "llamacorn.jpg", "magicalflying.jpg", "magicalkittencorn.jpg", "majesticflying.jpg", "mermaid.jpg", "mysticalvortex.jpg", "nannycam.jpg", "narwhaltorpedo.jpg", "neigh.jpg", "pandamonium.jpg", "puppicorn.jpg", "queenbee.jpg", "rainbow.jpg", "rainbowaura.jpg", "rainbowmane.jpg", "resetbutton.jpg", "retarget.jpg", "rhinocorn.jpg", "sadisticritual.jpg", "seductive.jpg", "shabby.jpg", "shakeup.jpg", "sharkwithahorn.jpg", "slowdown.jpg", "stabby.jpg", "summoningritual.jpg", "swiftflying.jpg", "targeteddestruction.jpg", "thegreatnarwhal.jpg", "tinystable.jpg", "twoforone.jpg", "unfairbargain.jpg", "unicornlasso.jpg", "unicornonthecob.jpg", "unicornpoison.jpg", "unicornshrinkray.jpg", "unicornswap.jpg", "yay.jpg",]

export const getStartingDeck = () => {
    const shuffledDeck = deck.slice();
    shuffleArray(shuffledDeck);
    return shuffledDeck;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}