import { useRecoilValue } from 'recoil';
import AppState from './AppState';
import { WelcomeScreen, AboutScreen, GameScreen } from './screens';


function App() {
  const screen = useRecoilValue(AppState.screen);

  return (
    <>
      {screen === "welcome" && <WelcomeScreen />}
      {screen === "about" && <AboutScreen />}
      {screen === "game" && <GameScreen />}
    </>
  );
}

export default App;
