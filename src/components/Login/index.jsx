import { useState } from 'react'
import { Header, Img, P, Nav } from "../TaskPage/styles"
import { Form, Input } from "../NewCard/styles"
import { Button } from "../CardModal/styles"
import { FormHolder, H4 } from "./styles"
import logo from "../../public/img/TMlogo.png"
import "./styles.css"

const Login = ({setUserAuth}) => {
    // Handle user login information
    const [login, setLogin] = useState({
        username: '',
        password: ''
    }) 
    // Handle information in user login/new user
    const [logError, setLogInfo] = useState('')
    // Handle whether a new user is being created
    const [newUser, setNewUser] = useState(false)
    // Handle new user form
    const [newUserForm, setNewUserForm] = useState({
        sentFrom: false,
        username: '',
        passwordFirst: '',
        passwordSecond: ''
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
                setLogInfo('There is an error with the username or password')
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

    const submitNewUser = async () => {
        try {
            const addNew = await fetch('/apiuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUserForm)
            })
            const response = await addNew.json()
            if(response.userInSystem === false){
                setNewUser(false)
                setLogInfo("User created - Please login")
            } else {
                setLogInfo("Username already in use")
            }
        } catch (e) {
            console.log(e)
        } 
    }

    const createUser = () => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g
        setLogInfo(false)
        for(let value in newUserForm){
            if(newUserForm[value] === '') {
                return setLogInfo('All fields must be completed')
            } 
        }
        if(newUserForm['passwordFirst'] !== newUserForm['passwordSecond']){
            return setLogInfo('Passwords must match')
        }
        if(!passwordRegex.test(newUserForm['passwordFirst'])){
            return setLogInfo('Password does not meet requirements')
        }
        newUserForm.sentFrom = true
        submitNewUser()
    }

    return (
        <>
            <Header>
                <Img alt="Task Manage logo" src={logo} />
                <Nav>
                    <P onClick={() => {
                        setNewUser(!newUser)
                        setLogInfo(false)
                    }
                    }>{!newUser ? "New User?" : "Cancel"}</P>
                </Nav>
            </Header>
                <FormHolder $newUser={newUser}>
                    {!newUser ?
                        <>
                            <h1>Login</h1>
                            <h3>Test account details:</h3> 
                            <h4>username: testuser</h4>
                            <h4>password: Test1234</h4>
                            <Form>
                                <H4>{logError ? logError : 'Enter your username and password'}</H4>
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
                                {logError && <H4>{logError}</H4>}
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
                                <Button onClick={createUser} type="button">Create user</Button>
                            </Form>
                        </>}
                </FormHolder>
        </>
    )
}

export default Login