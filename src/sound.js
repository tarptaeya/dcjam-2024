import { useEffect, useState } from "react";
import store from "./store/store";

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
  const state = store.getState();
  const context = getAudioContext();
  const source = context.createBufferSource();
  source.buffer = await getAudioBuffer(filepath);
  const gainNode = context.createGain();

  source.connect(gainNode);
  gainNode.connect(context.destination);
  gainNode.gain.value = state.options.value.sfx / 100;

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

  const state = store.getState();
  const context = getAudioContext();
  const source = context.createBufferSource();
  source.buffer = await getAudioBuffer(filepath);

  const gainNode = context.createGain();

  source.connect(gainNode);
  gainNode.connect(context.destination);
  gainNode.gain.value = state.options.value.sfx / 100;

  source.loop = true;
  window.dcjam.currentBackgroundTrack = source;
  source.start();
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
  window.dcjam.currentBackgroundTrack = oscillator;
};

export const setLiftedBackgroundTrackGain = (value) => {
  if (!window.dcjam.gainNode) return;
  const context = getAudioContext();
  window.dcjam.gainNode.gain.exponentialRampToValueAtTime(
    value,
    context.currentTime + 0.2,
  );
};
