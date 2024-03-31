import React, { useEffect } from "react";
import {
  WelcomeScreen,
  AboutScreen,
  GameScreen,
  GameOverScreen,
  GameWinScreen,
} from "./screens";
import { useSelector } from "react-redux";
import {
  startBackgroundTrack,
  startLiftedBackgroundTrack,
  stopBackgroundTrack,
} from "./sound";
import StoryComponent from "./components/Story";

function App() {
  const screen = useSelector((state) => state.screen.value);
  const currentCombat = useSelector((state) => state.currentCombat.value);
  const stage = useSelector((state) => state.stage.value);

  const { isActive } = currentCombat;
  const { isLifted } = stage;

  useEffect(() => {
    if (screen === "game") {
      if (isLifted) {
        startLiftedBackgroundTrack();
      } else if (currentCombat.isActive) {
        startBackgroundTrack("/combat.mp3");
      } else {
        startBackgroundTrack("/background.mp3");
      }
    } else {
      stopBackgroundTrack();
    }
  }, [screen, isLifted, isActive]);

  if (true) {
    return (
      <StoryComponent
        paragraphs={["Hello", "World", "Play now"]}
        onComplete={() => {}}
      />
    );
  }

  return (
    <>
      {screen === "welcome" && <WelcomeScreen />}
      {screen === "about" && <AboutScreen />}
      {screen === "game" && <GameScreen />}
      {screen === "gamewin" && <GameWinScreen />}
      {screen === "gameover" && <GameOverScreen />}
    </>
  );
}

export default App;
