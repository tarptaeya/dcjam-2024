import React from "react";
import { WelcomeScreen, AboutScreen, GameScreen } from "./screens";
import { useSelector } from "react-redux";
import { useSound } from "./soundUtils";

function App() {
  const screen = useSelector((state) => state.screen.value);

  // loads all the sounds beforehand
  useSound();

  return (
    <>
      {screen === "welcome" && <WelcomeScreen />}
      {screen === "about" && <AboutScreen />}
      {screen === "game" && <GameScreen />}
    </>
  );
}

export default App;
