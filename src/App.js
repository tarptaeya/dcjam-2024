import React from "react";
import { WelcomeScreen, AboutScreen, GameScreen } from "./screens";
import { useSelector } from "react-redux";

function App() {
  const screen = useSelector((state) => state.screen.value);

  return (
    <>
      {screen === "welcome" && <WelcomeScreen />}
      {screen === "about" && <AboutScreen />}
      {screen === "game" && <GameScreen />}
    </>
  );
}

export default App;
