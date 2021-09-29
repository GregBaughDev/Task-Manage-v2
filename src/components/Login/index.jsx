import { useState } from 'react'
import { Header, Img, P, Nav } from "../TaskPage/styles"
import { Form, Input } from "../NewCard/styles"
import { Button } from "../CardModal/styles"
import { FormHolder } from "./styles"
import logo from "../../public/img/TMlogo.png"
import "./styles.css"

const Login = ({setUserAuth}) => {
    // Handle user login information
    const [login, setLogin] = useState({
        username: '',
        password: ''
    }) 
    // Handle errors in user information
    const [logError, setLogError] = useState('')
    // Handle whether a new user is being created
    const [newUser, setNewUser] = useState(false)
    // Handle new user form
    const [newUserForm, setNewUserForm] = useState({
        username: '',
        passwordFirst: '',
        passwordSecond: ''
    })
    // Handle if new user form validations have passed
    const [valid, setValid] = useState(false)

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

    const createNewUserForm = (e) => {
        const {name, value} = e.target
        setNewUserForm(newUserForm => ({
            ...newUserForm,
            [name]: value
        }))
    }

    const createUser = () => {
        setLogError(false)
        for(let value in newUserForm){
            newUserForm[value] === '' && setLogError('All fields must be completed')
        }
        newUserForm['passwordFirst'] !== newUserForm['passwordSecond'] && setLogError('Passwords must match')
        console.log("Validations passed")
        /* TO DO:
        Regex ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$
        Change the class when each requirement has been met
        Set create button to enabled when validations are met */
    }

    return (
        <>
            <Header>
                <Img alt="Task Manage logo" src={logo} />
                <Nav>
                    <P onClick={() => setNewUser(!newUser)}>{!newUser ? "New User" : "Cancel"}</P>
                </Nav>
            </Header>
                <FormHolder $newUser={newUser}>
                    {!newUser ?
                        <>
                            <h1>Login</h1>
                            <h3>Test account details:</h3> 
                            <h4>username: testuser</h4>
                            <h4>password: test1234</h4>
                            <Form>
                                <h4>{logError ? logError : 'Enter your username and password'}</h4>
                                <label htmlFor="username">Username:</label>
                                    <Input onChange={loginForm} type="text" name="username" id="username" />
                                <label htmlFor="password">Password:</label>
                                    <Input onChange={loginForm} type="password" name="password" id="password" />
                                <Button onClick={submitLogin} type="button">Login</Button>
                            </Form>
                        </> :
                        <>
                            <h1>Create New User</h1>
                            <Form>
                                {logError && <h4>{logError}</h4>}
                                <label htmlFor="username">Enter a username:</label>
                                    <Input onChange={createNewUserForm} type="text" name="username" id="username" />
                                <label htmlFor="passwordFirst">Enter a password:</label>
                                    <Input onChange={createNewUserForm} type="password" name="passwordFirst" id="passwordFirst" />
                                <label htmlFor="passwordSecond">Re-enter password:</label>
                                    <Input onChange={createNewUserForm} type="password" name="passwordSecond" id="passwordSecond" />
                                <ul>
                                    <li>Passwords must be at least 8 characters</li>
                                    <li>Passwords must contain at least 1 uppercase letter, 1 lowercase letter and 1 number</li>
                                    <li>Passwords can contain special characters</li>
                                </ul>
                                <Button onClick={createUser} type="button" disabled={!valid && true}>Create user</Button>
                            </Form>
                        </>}
                </FormHolder>
        </>
    )
}

export default Login