import { useState } from 'react'
import { Header, Img } from "../TaskPage/styles"
import { Form, Input } from "../NewCard/styles"
import { Button } from "../CardModal/styles"
import { FormHolder } from "./styles"
import logo from "../../public/img/TMlogo.png"

const Login = ({setUserAuth, userAuth}) => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    }) 

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
                console.log("Not logged int")
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