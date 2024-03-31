import React, { useEffect } from "react";
import {
  WelcomeScreen,
  AboutScreen,
  GameScreen,
  GameOverScreen,
  GameWinScreen,
} from "./screens";
import { useDispatch, useSelector } from "react-redux";
import {
  startBackgroundTrack,
  startLiftedBackgroundTrack,
  stopBackgroundTrack,
} from "./sound";
import StoryComponent from "./components/Story";
import { updateScreen } from "./store/screenSlice";
import { liftStage, setStageVisible } from "./store/stageSlice";
import { setDungeon } from "./store/dungeonSlice";
import { LIFTED_DUNGEON_MAP } from "./constants";

function App() {
  const screen = useSelector((state) => state.screen.value);
  const currentCombat = useSelector((state) => state.currentCombat.value);
  const stage = useSelector((state) => state.stage.value);

  const { isActive } = currentCombat;
  const { isLifted } = stage;

  const dispatch = useDispatch();

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


  return (
    <>
      {screen === "welcome" && <WelcomeScreen />}
      {screen === "about" && <AboutScreen />}
      {screen === "game" && <GameScreen />}
      {screen === "gamewin" && <GameWinScreen />}
      {screen === "gameover" && <GameOverScreen />}

      {screen === 'story.01' && <StoryComponent
        paragraphs={["Hello", "World", "Play now"]}
        onComplete={() => {
          dispatch(updateScreen('game'));
        }}
      />}

      {screen === 'story.02' && <StoryComponent
        paragraphs={["Now", "This", "is", "Level 2"]}
        onComplete={() => {
          dispatch(liftStage());
          dispatch(setStageVisible(false));
          dispatch(setDungeon(LIFTED_DUNGEON_MAP));
          dispatch(updateScreen('game'));
        }}
      />}
    </>
  );
}

export default App;
