const { useState } = require("react");
const { sounds } = require("./sound");


const TRACKS = [
    "/click_002.ogg",
];


export const useSound = () => {
    const [reference, setReference] = useState(null);
    if (!!reference)
        return reference;

    return new Promise((res, rej) => {
        sounds.load(TRACKS);
        sounds.whenLoaded = () => {
            setReference(sounds);
            res(sounds);
        };
    });
}


export const playClickSound = () => {
    const music = sounds['/click_002.ogg'];
    music.play();
}