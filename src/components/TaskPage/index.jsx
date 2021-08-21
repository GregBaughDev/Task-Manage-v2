import React, { useState } from 'react'
import { Header, Img, Nav, Main, NewCardDisplay } from './styles'
import CardHolder from '../CardHolder.jsx'
import NewCard from '../NewCard/index'
import logo from '../../public/img/TMlogo.png'
import seedData from './seeds'
import columns from './columns'

const TaskPage = () => {
    const [newCard, setNewCard] = useState(false)
    const [seedsData, setSeedsData] = useState(seedData)
    const [formData, setFormData] = useState({
        /* Initial newform won't be added as the length is incremented
        after the push so we end up with two cards with the same id */
        // id: seedsData.length + 1,
        title: '', 
        dateTime: '',
        user: '',
        description: 'Some placeholder text',
        column: '',
    }) 

    const updateForm = (e) => {
        const {name, value} = e.target
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const addNewForm = (e) => {
        e.preventDefault()
        setFormData(formData => ({
            ...formData,
            id: seedsData.length + 1,
            column: parseInt(formData.column)
        }))
        setSeedsData(seedsData => (
            seedsData = [...seedsData, formData]
        ))
    }

    const makeNewCard = () => {
        setNewCard(newCard => !newCard)
    }

    return (
        <>
            <Header>
                <NewCardDisplay $newCard={newCard}>
                    {newCard && <NewCard columns={columns} addNewForm={addNewForm} updateForm={updateForm} />}
                </NewCardDisplay>
               <Img alt="Task Manage logo" src={logo} />
               <Nav>
                   <p onClick={makeNewCard}>New Task</p>
                   <p>Log Out</p>
               </Nav>
            </Header>
            <Main>
                <CardHolder seedsData={seedsData} updateForm={updateForm} addNewForm={addNewForm} columns={columns} />
            </Main>
        </>
    )
}

export default TaskPage