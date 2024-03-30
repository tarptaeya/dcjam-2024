import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { useDispatch } from "react-redux";
import { updateScreen } from "./store/screenSlice";
import BottomPanel from "./components/BottomPanel";
import TopPanel from "./components/TopPanel";

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
    <Suspense>
      <Canvas>
        <Game />
      </Canvas>
      <TopPanel />
      <BottomPanel />
    </Suspense>
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
    <div id="welcome-screen">
      <div id="welcome-screen-container">
        <div id="welcome-screen-title">
          <h1>Chintu's Quest: Journey Through the Ancient Cave</h1>
          <p>
            Embark on the adventure, guiding the stranded archaeologist through
            perilous depths, confronting hostile creatures, and unlocking
            mysterious portals. Can you lead Chintu to safety?
          </p>
          <p></p>
        </div>
        <div id="welcome-screen-btn-container">
          <button onClick={navigateToGame} className="btn primary">
            New Game
          </button>
          <button onClick={() => {}} className="btn">
            Help
          </button>
          <button onClick={() => {}} className="btn">
            Options
          </button>
          <button onClick={navigateToAbout} className="btn">
            Credits
          </button>
        </div>
      </div>
    </div>
  );
};

export const GameOverScreen = () => {
  const navigateToWelcome = () => {
    window.location.reload();
  };

  return (
    <div id="game-over-screen">
      <div id="game-over-screen-contents">
        <h2>Wasted... Game Over!!!</h2>
        <div id="game-over-screen-actions">
          <button className="btn" onClick={navigateToWelcome}>
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export const GameWinScreen = () => {
  return <p>You won!</p>;
};
