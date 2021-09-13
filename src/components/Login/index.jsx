import { useState } from 'react'
import { Header, Img } from "../TaskPage/styles"
import { Form, Input } from "../NewCard/styles"
import { Button } from "../CardModal/styles"
import { FormHolder } from "./styles"
import logo from "../../public/img/TMlogo.png"

const Login = ({setUserAuth}) => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    }) 

    const [logError, setLogError] = useState('')

    const loginForm = (e) => {
        const {name, value} = e.target
        setLogin(login => ({
            ...login,
            [name]: value
        }))
    }

    const submitLogin = async () => {
        try {
            const userAuth = await fetch('/apilog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            })
            const confirm = await userAuth.json()
            if(confirm.logged){
                setUserAuth(confirm.id)
            } else {
                setLogError('There is an error with the username or password')
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <>
            <Header>
                <Img alt="Task Manage logo" src={logo} />
            </Header>
            <FormHolder>
                <h1>Login</h1>
                <h3>Test account details are available <a href="https://github.com/GregBaughDev/Task-Manage-v2">here</a></h3>
                <p>{logError ? logError : 'Enter your username and password'}</p>
                <Form>
                    <label htmlFor="username">Username:</label>
                        <Input onChange={loginForm} type="text" name="username" id="username" />
                    <label htmlFor="password">Password:</label>
                        <Input onChange={loginForm} type="password" name="password" id="password" />
                    <Button onClick={submitLogin} type="button">Login</Button>
                </Form>
            </FormHolder>
        </>
    )
}

export default Login