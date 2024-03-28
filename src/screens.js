import React from "react";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { useDispatch } from "react-redux";
import { updateScreen } from "./store/screenSlice";
import { Compass } from "./components/Compass";
import { ControlPanel } from "./components/ControlPanel";

export const AboutScreen = () => {
  const dispatch = useDispatch();

  const handleBackButton = () => {
    dispatch(updateScreen("welcome"));
  };

  return (
    <div>
      <h2>About the game</h2>
      <button onClick={handleBackButton}>Back</button>
    </div>
  );
};

export const GameScreen = () => {
  return (
    <>
      <Canvas>
        <Game />
      </Canvas>
      <Compass />
      <ControlPanel />
    </>
  );
};

export const WelcomeScreen = () => {
  const dispatch = useDispatch();

  const navigateToGame = () => {
    dispatch(updateScreen("game"));
  };

  const navigateToAbout = () => {
    dispatch(updateScreen("about"));
  };

  return (
    <div id='welcome-screen'>
      <div id='welcome-screen-title' className="nes-container">
        <h1>Chintu The Explorer</h1>
      </div>
      <div id='welcome-screen-btn-container'>
        <button onClick={navigateToGame} className="is-success">New Game</button>
        <button onClick={() => { }} className="">Options</button>
        <button onClick={navigateToAbout} className="">Credits</button>
      </div>
    </div>
  );
};
