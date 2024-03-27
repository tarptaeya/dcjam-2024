import { useRecoilValue } from 'recoil';
import AppState from './AppState';
import { WelcomeScreen, AboutScreen, GameScreen } from './screens';
import { useEffect } from 'react';
import { useKeypressHandler } from './inputHandler';


function App() {
  const screen = useRecoilValue(AppState.screen);
  const keypressHandler = useKeypressHandler();

  useEffect(() => {
    document.addEventListener('keypress', keypressHandler, false);

    return function cleanup() {
      document.removeEventListener('keypress', keypressHandler, false);
    };
  }, []);

  return (
    <>
      {screen === "welcome" && <WelcomeScreen />}
      {screen === "about" && <AboutScreen />}
      {screen === "game" && <GameScreen />}
    </>
  );
}

export default App;
