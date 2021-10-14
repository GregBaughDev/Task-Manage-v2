import { useState } from 'react'
import { GlobalStyle } from './styles';
import TaskPage from './components/TaskPage';
import Login from './components/Login';

function App() {
  const [userAuth, setUserAuth] = useState(false)

  return (
    <>
      <GlobalStyle />
      {!userAuth ? <Login setUserAuth={setUserAuth} /> : <TaskPage setUserAuth={setUserAuth} />}
    </>
  );
}

export default App;
