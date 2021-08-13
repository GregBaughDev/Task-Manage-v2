import React from 'react'
import { Header, Img, Nav, Main } from './styles'
import CardHolder from '../CardHolder.jsx'
import logo from '../../public/img/TMlogo.png'

const TaskPage = () => {
    return (
        <>
            <Header>
               <Img alt="Task Manage logo" src={logo} />
               <Nav>
                   <p>New Task</p>
                   <p>Log Out</p>
               </Nav>
            </Header>
            <Main>
                <CardHolder />
            </Main>
        </>
    )
}

export default TaskPage