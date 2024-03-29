import { useEffect, useState } from "react";

export const getAudioContext = () => {
    const { audioContext } = window.dcjam;
    if (!audioContext) {
        window.dcjam.audioContext = new AudioContext();
    }

    return window.dcjam.audioContext;
}


export const loadAudioBuffer = async (filepath) => {
    const audioContext = getAudioContext();

    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}


export const getAudioBuffer = async filepath => {
    if (!window.dcjam.audioBuffers) {
        window.dcjam.audioBuffers = new Map();
    }

    if (window.dcjam.audioBuffers.has(filepath)) {
        return window.dcjam.audioBuffers.get(filepath);
    }

    window.dcjam.audioBuffers.set(filepath, await loadAudioBuffer(filepath));
    return window.dcjam.audioBuffers.get(filepath);
}


export const playTrack = async filepath => {
    const context = getAudioContext();
    const source = context.createBufferSource();
    source.buffer = await getAudioBuffer(filepath);
    source.connect(context.destination);
    source.start();
}


export const playClickSound = () => {
    playTrack('/click.ogg');
}


export const useBackgroundSound = () => {
    const [source, setSource] = useState(null);

    useEffect(() => {
        (async function () {
            const context = getAudioContext();
            const node = context.createBufferSource();
            node.buffer = await getAudioBuffer("/background.mp3");
            node.connect(context.destination);
            node.loop = true;

            setSource(node);
        })();
    }, []);

    return source;
};