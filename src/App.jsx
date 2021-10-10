import { useState, useEffect } from 'react'
import { GlobalStyle } from './styles';
import TaskPage from './components/TaskPage';
import Login from './components/Login';

function App() {
  const [userAuth, setUserAuth] = useState(false)
  console.log(userAuth)

  const handleLogOut = async () => {
    try {
        await fetch('/apilog', {
            method: 'DELETE',
        })
    } catch(err) {
        console.log(err)
    }
    setUserAuth(false)
  }

  useEffect(() => {
    if(!userAuth){
      window.addEventListener("reload", () => handleLogOut)
    } else {
      window.removeEventListener("reload", () => handleLogOut)
    }
  }, [userAuth])

  return (
    <>
      <GlobalStyle />
      {!userAuth ? <Login setUserAuth={setUserAuth} /> : <TaskPage setUserAuth={setUserAuth} handleLogOut={handleLogOut} />}
    </>
  );
}

export default App;
