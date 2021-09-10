import { useState } from 'react'
import { GlobalStyle } from './styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import TaskPage from './components/TaskPage';
import Login from './components/Login';

function App() {
  const [userAuth, setUserAuth] = useState(false)
  console.log(userAuth)
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
            <Route exact path="/" component={() => !userAuth ? <Login setUserAuth={setUserAuth} userAuth={userAuth} /> : <TaskPage setUserAuth={setUserAuth} />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
