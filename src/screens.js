import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Game from "./Game";
import { useDispatch, useSelector } from "react-redux";
import { updateScreen } from "./store/screenSlice";
import BottomPanel from "./components/BottomPanel";
import TopPanel from "./components/TopPanel";
import { playClickSound } from "./sound";
import {
  setOptionsBloom,
  setOptionsFOV,
  setOptionsMovement,
  setOptionsSFX,
} from "./store/optionsSlice";

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
  const options = useSelector((state) => state.options.value);

  const dispatch = useDispatch();
  const [view, setView] = useState("main");

  const navigateToGame = () => {
    dispatch(updateScreen("game"));
  };

  const presentView = (name) => {
    playClickSound();
    setView(name);
  };

  const getMainView = () => {
    return (
      <>
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
          <button onClick={() => presentView("options")} className="btn">
            Options
          </button>
          <button onClick={() => presentView("credits")} className="btn">
            Credits
          </button>
        </div>
      </>
    );
  };

  const getCreditsView = () => {
    return (
      <>
        <h3>Credits</h3>
        <div>
          <p>
            The game is developed by <em>tarptaeya</em> for Dungeon Crawler Jam
            2024 using React, React Three Fiber, and Redux. The source code of
            the game can be found at{" "}
            <a href="https://github.com/tarptaeya/dcjam-2024" target="_blank">
              tarptaeya/dcjam-2024
            </a>
            .
          </p>

          <ul>
            <li>
              The interface sounds in this game are sourced from{" "}
              <a
                href="https://kenney.nl/assets/interface-sounds"
                target="_blank"
              >
                Kenney (Interface Sounds).
              </a>
            </li>
            <li>
              All the textures and enemy sprites are generated using stable
              diffusion model from keras_cv.
            </li>
            <li>
              The images for potion and weapons are generated using Google's
              ImageFX.
            </li>
            <li>
              The background and combat music tracks are generated using
              Google's MusicFX.
            </li>
          </ul>
        </div>
        <div className="spacer"></div>
        <div style={{ display: "flex" }}>
          <div className="spacer"></div>
          <button className="btn" onClick={() => presentView("main")}>
            Back to Menu
          </button>
        </div>
      </>
    );
  };

  const getOptionsView = () => {
    const restoreDefaults = () => {
      playClickSound();
      dispatch(setOptionsSFX(70));
      dispatch(setOptionsFOV(100));
      dispatch(setOptionsMovement("smooth"));
      dispatch(setOptionsBloom("on"));
    };

    return (
      <>
        <h3>Options</h3>
        <div>
          <div className="options-control">
            <label htmlFor="options-sfx">Sound effects volume</label>
            <input
              id="options-sfx"
              type="range"
              max={100}
              value={options.sfx}
              onChange={(e) => {
                dispatch(setOptionsSFX(e.target.value));
              }}
            />
          </div>

          <div className="options-control">
            <label htmlFor="options-fov">Field of View (in degrees)</label>
            <input
              id="options-fov"
              type="number"
              value={options.fov}
              onChange={(e) => {
                dispatch(setOptionsFOV(e.target.value));
              }}
            />
          </div>

          <div className="options-control">
            <label htmlFor="options-cam">Camera movement</label>
            <select
              id="options-cam"
              name="options-cam"
              value={options.movement}
              onChange={(e) => {
                dispatch(setOptionsMovement(e.target.value));
              }}
            >
              <option value={"smooth"}>Smooth</option>
              <option value={"instant"}>Instant</option>
            </select>
          </div>

          <div className="options-control">
            <label htmlFor="options-bloom">WebGL Bloom</label>
            <select
              id="options-bloom"
              name="options-bloom"
              value={options.bloom}
              onChange={(e) => {
                dispatch(setOptionsBloom(e.target.value));
              }}
            >
              <option value={"on"}>On</option>
              <option value={"off"}>Off</option>
            </select>
          </div>
        </div>
        <div className="spacer"></div>
        <div style={{ display: "flex" }}>
          <div className="spacer"></div>
          <button className="btn restore-default-btn" onClick={restoreDefaults}>
            Restore defaults
          </button>
          <button className="btn" onClick={() => presentView("main")}>
            Ok
          </button>
        </div>
      </>
    );
  };

  return (
    <div id="welcome-screen">
      <div id="welcome-screen-container">
        {view === "main" && getMainView()}
        {view === "credits" && getCreditsView()}
        {view === "options" && getOptionsView()}
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
