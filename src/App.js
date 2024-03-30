import React, { useEffect } from "react";
import {
  WelcomeScreen,
  AboutScreen,
  GameScreen,
  GameOverScreen,
} from "./screens";
import { useSelector } from "react-redux";
import { startBackgroundTrack, stopBackgroundTrack } from "./sound";

function App() {
  const screen = useSelector((state) => state.screen.value);
  const currentCombat = useSelector((state) => state.currentCombat.value);
  const { isActive } = currentCombat;

  useEffect(() => {
    if (screen === "game") {
      if (currentCombat.isActive) {
        startBackgroundTrack("/combat.mp3");
      } else {
        startBackgroundTrack("/background.mp3");
      }
    } else {
      stopBackgroundTrack();
    }
  }, [screen, isActive]);

  return (
    <>
      {screen === "welcome" && <WelcomeScreen />}
      {screen === "about" && <AboutScreen />}
      {screen === "game" && <GameScreen />}
      {screen === "gameover" && <GameOverScreen />}
    </>
  );
}

export default App;
