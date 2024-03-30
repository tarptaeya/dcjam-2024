import { useEffect, useState } from "react";

export const getAudioContext = () => {
  const { audioContext } = window.dcjam;
  if (!audioContext) {
    window.dcjam.audioContext = new AudioContext();
  }

  return window.dcjam.audioContext;
};

export const loadAudioBuffer = async (filepath) => {
  const audioContext = getAudioContext();

  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

export const getAudioBuffer = async (filepath) => {
  if (!window.dcjam.audioBuffers) {
    window.dcjam.audioBuffers = new Map();
  }

  if (window.dcjam.audioBuffers.has(filepath)) {
    return window.dcjam.audioBuffers.get(filepath);
  }

  window.dcjam.audioBuffers.set(filepath, await loadAudioBuffer(filepath));
  return window.dcjam.audioBuffers.get(filepath);
};

export const playTrack = async (filepath) => {
  const context = getAudioContext();
  const source = context.createBufferSource();
  source.buffer = await getAudioBuffer(filepath);
  source.connect(context.destination);
  source.start();
};

export const playClickSound = () => {
  playTrack("/click.ogg");
};

export const startBackgroundTrack = async (filepath) => {
  if (!!window.dcjam.currentBackgroundTrack) {
    const track = window.dcjam.currentBackgroundTrack;
    track?.stop();
    window.dcjam.currentBackgroundTrack = null;
  }

  const context = getAudioContext();
  const node = context.createBufferSource();
  node.buffer = await getAudioBuffer(filepath);
  node.connect(context.destination);
  node.loop = true;
  window.dcjam.currentBackgroundTrack = node;
  node.start();
};

export const stopBackgroundTrack = () => {
  if (!!window.dcjam.currentBackgroundTrack) {
    const track = window.dcjam.currentBackgroundTrack;
    track?.stop();
    window.dcjam.currentBackgroundTrack = null;
  }
};

export const startLiftedBackgroundTrack = () => {
  stopBackgroundTrack();

  const context = getAudioContext();
  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  gainNode.gain.value = 0;

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  oscillator.start();

  window.dcjam.gainNode = gainNode;
};

export const setLiftedBackgroundTrackGain = (value) => {
  if (!window.dcjam.gainNode) return;
  const context = getAudioContext();
  window.dcjam.gainNode.gain.exponentialRampToValueAtTime(
    value,
    context.currentTime + 0.2,
  );
};
