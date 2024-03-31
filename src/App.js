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

      {screen === "story.01" && (
        <StoryComponent
          paragraphs={[
            "In the heart of an ancient, forgotten cave, Chintu, a seasoned archaeologist, finds himself enveloped by solitude. Lost amidst the labyrinthine passages and echoing chambers, he yearns for nothing more than the comforting embrace of home. The eerie silence of the cave, bereft of human presence, weighs heavily upon him, each step echoing like a solitary heartbeat in the vast emptiness.",
            "As Chintu delves deeper into the ancient recesses, he discovers guardians lurking within the shadows - strange creatures, their forms twisted by the passage of time, lazily guarding the remnants of a forgotten era. These beings, though formidable in appearance, harbor no malice towards the lone explorer. They remain indifferent, unmoved by his presence unless provoked.",
            "With determination burning in his heart, Chintu embarks on a quest to navigate the winding passages, braving the darkness and the lurking guardians. His goal is clear - to unearth the secrets of the cave's past and find his way back to the world outside. Armed with only his wits and his resolve, he ventures forth, ready to face whatever challenges lie ahead.",
            "The fate of Chintu rests in your hands. Will you guide him safely through the depths of the ancient cave, or will he become lost to its endless expanse forever? The journey begins now, with each step bringing him closer to the truth... and to home.",
          ]}
          onComplete={() => {
            dispatch(updateScreen("game"));
          }}
        />
      )}

      {screen === "story.02" && (
        <StoryComponent
          paragraphs={[
            "In the midst of an oppressive darkness, Chintu grapples with confusion. Why does the world remain obscured from view? Where has he found himself? Anxiety tightens its grip, but amidst the void, a strange energy pulses, palpable yet intangible. It permeates the very essence of this place, a sensation beyond comprehension.",
            "Struggling to navigate the obsidian expanse, Chintu's hands encounter unseen barriers, impeding his progress through this enigmatic realm. A sense of urgency grips him as he realizes the dire nature of his predicament - trapped within a domain where sight is denied.",
            "Then, a glimmer of hope emerges, a faint radiance drawing his attention to the southwest. It serves as a beacon amidst the darkness, offering a promise of escape from this suffocating abyss. With newfound determination, Chintu embarks on his journey, guided by the dim glow that signifies liberation from this stifling void.",
            "Yet, the stakes are dire. He can sense it deep within his being. Lingering too long in this desolate realm threatens to unravel his sanity, consigning him to an eternity of confinement within these shadowy depths. He must forge ahead, driven by the primal instinct to survive and the fervent desire to return to familiarity.",
          ]}
          onComplete={() => {
            dispatch(liftStage());
            dispatch(setStageVisible(false));
            dispatch(setDungeon(LIFTED_DUNGEON_MAP));
            dispatch(updateScreen("game"));
          }}
        />
      )}
    </>
  );
}

export default App;
