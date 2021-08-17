import React from 'react'
import { Header, Img, Nav, Main } from './styles'
import CardHolder from '../CardHolder.jsx'
import logo from '../../public/img/TMlogo.png'
import seedData from './seeds'
import columns from './columns'

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
                <CardHolder columns={columns} seedData={seedData} />
            </Main>
        </>
    )
}

export default TaskPage