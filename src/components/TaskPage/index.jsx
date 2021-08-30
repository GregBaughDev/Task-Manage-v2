import React, { useState, useEffect } from 'react'
import { Header, Img, Nav, Main, NewCardDisplay } from './styles'
import CardHolder from '../CardHolder.jsx'
import NewCard from '../NewCard/index'
import logo from '../../public/img/TMlogo.png'
import seedData from './seeds'
import columns from './columns'

const TaskPage = () => {
    // State for new card in progress
    const [newCard, setNewCard] = useState(false)
    // Seed Data passed into state
    const [hardData, setHardData] = useState(seedData) 
    // State for handling viewing of a card
    const [cardActive, setCardActive] = useState(false)
    // State for handling adding a new card
    const [formData, setFormData] = useState({
        /* Initial newform won't be added as the length is incremented
        after the push so we end up with two cards with the same id */
        // id: seedsData.length + 1,
        id: 11,
        title: '', 
        dateTime: '',
        user: '',
        description: 'Some placeholder text',
        column: '',
    }) 

    // Function to handle the new card data
    const updateForm = (e) => {
        const {name, value} = e.target
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    // Function to handle adding the new card to the seed data
    const addNewForm = (e) => {
        e.preventDefault()
        setFormData(formData => ({
            ...formData,
            id: hardData.length + 1,
        }))
        setHardData(hardData => (
            hardData = [...hardData, formData]
        ))
        makeNewCard()
    }

    // Function to change the view if a card is not being added
    const makeNewCard = () => {
        setNewCard(newCard => !newCard)
    }

    // Function to handle editing a card and replacing in the array
    const editData = (data) => {
        const tempArray = [...hardData]
        for(let temp of tempArray){
            if(temp.id === data.id){
                tempArray[tempArray.indexOf(temp)] = data
            }
        }
        setHardData(hardData => (
            hardData = tempArray
        ))
        closeViewEdit()
    }

    // Function to handle deleting a card
    const handleDelete = (e, id) => {
        let tempArray = [...hardData]
        setHardData(hardData => (
            hardData = tempArray.filter(data => data.id !== id)
        ))
        closeViewEdit()
    }

    // If 'cancel' is selected, change the view. TODO: Just use one main function to handle all modal views?
    const closeViewEdit = () => {
        setCardActive(cardActive => !cardActive)
    }

    return (
        <>
            <Header>
                <NewCardDisplay $newCard={newCard}>
                    {newCard && <NewCard columns={columns} addNewForm={addNewForm} updateForm={updateForm} makeNewCard={makeNewCard} />}
                </NewCardDisplay>
               <Img alt="Task Manage logo" src={logo} />
               <Nav>
                   <p onClick={makeNewCard}>New Task</p>
                   <p>Log Out</p>
               </Nav>
            </Header>
            <Main>
                <CardHolder hardData={hardData} updateForm={updateForm} addNewForm={addNewForm} columns={columns} editData={editData} closeViewEdit={closeViewEdit} cardActive={cardActive} handleDelete={handleDelete} />
            </Main>
        </>
    )
}

export default TaskPage