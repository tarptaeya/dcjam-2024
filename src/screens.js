import React, { Suspense, useCallback, useState } from "react";
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
    playClickSound();
    dispatch(updateScreen("story.01"));
  };

  const presentView = (name) => {
    playClickSound();
    setView(name);
  };

  const getMainView = () => {
    return (
      <>
        <div id="welcome-screen-title">
          <h1>Chintu's Quest: Journey Through the Ancient Cave and Beyond!</h1>
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
            <li>The in game story is refined using ChatGPT.</li>
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
      dispatch(setOptionsSFX(50));
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
                dispatch(setOptionsSFX(parseInt(e.target.value)));
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
  return (
    <div id="game-win-container">
      <div id="game-win-message">
        <p>
          Oops! It seems like the shadows of the ancient cave have overwhelmed
          you, adventurer.
        </p>
        <p>
          Though the journey was fraught with challenges and dangers, your
          bravery was unmatched. However, the depths of the cave proved to be
          insurmountable this time.
        </p>
        <p>
          But fear not, for every setback is a stepping stone towards greater
          victories. Take this moment to reflect on your experiences, learn from
          your mistakes, and emerge even stronger for the next adventure that
          awaits.
        </p>
        <p>
          Remember, it's not about how many times you fall, but how you rise
          each time. Let this setback fuel your determination to conquer even
          greater challenges in the future.
        </p>
        <p>
          Until then, rest and recuperate, for the world is vast and filled with
          countless adventures yet to be explored. Your next triumph awaits just
          beyond the horizon."
        </p>
      </div>
    </div>
  );
};

export const GameWinScreen = () => {
  return (
    <div id="game-win-container">
      <div id="game-win-message">
        <h3>Congratulations, Adventurer!</h3>
        <p>
          You have successfully navigated the treacherous depths of the ancient
          cave, overcoming countless challenges and emerging victorious against
          all odds. Your resilience, courage, and determination have brought you
          to this moment of triumph.
        </p>
        <p>
          As you bask in the warm glow of victory, know that your journey has
          not only tested your skills but also forged you into a true hero. Your
          name shall be remembered among the legends, a testament to your
          indomitable spirit and unwavering resolve.
        </p>
        <p>
          But remember, the end of one adventure is only the beginning of
          another. As you step out of the darkness and into the light, may your
          path be filled with endless possibilities and thrilling adventures yet
          to come.
        </p>
        <p>
          Once again, congratulations on your well-deserved victory. The world
          awaits your next great adventure!
        </p>
      </div>
    </div>
  );
};
