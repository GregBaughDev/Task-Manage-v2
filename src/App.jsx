import { useState } from 'react'
import { GlobalStyle } from './styles';
import TaskPage from './components/TaskPage';
import Login from './components/Login';

function App() {
  const [userAuth, setUserAuth] = useState(false)
  
//TO DO - React router dom and show the component if user is logged in/out

  return (
    <>
      <GlobalStyle />
      {!userAuth ? 
        <Login userAuth={userAuth} setUserAuth={setUserAuth} /> :
        <TaskPage />
      }
    </>
  );
}

export default App;
