import React, { useState } from 'react'
import { Header, Img, Nav, Main, NewCardDisplay } from './styles'
import CardHolder from '../CardHolder.jsx'
import NewCard from '../NewCard/index'
import logo from '../../public/img/TMlogo.png'
import seedData from './seeds'
import columns from './columns'

const TaskPage = () => {
    const [newCard, setNewCard] = useState(false)
    const [hardData, setHardData] = useState(seedData) 
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
            id: hardData.length + 1,
        }))
        setHardData(hardData => (
            hardData = [...hardData, formData]
        ))
        makeNewCard()
    }

    const makeNewCard = () => {
        setNewCard(newCard => !newCard)
    }

    const editData = (data) => {
        // LOOK INTO - Copy array, put the new data in and then set hardData to the new array!
        setHardData(hardData => {
            for(let hd of hardData){
                if(hd.id === data.id){
                    console.log(hardData[hardData.indexOf(hd)])
                    console.log(data)
                    // IN PROGRESS - UPDATE ARRAY
                    return hardData = [...hardData, hardData.splice(hardData[hardData.indexOf(hd)], 1, data)]
                }
            }
        })
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
                <CardHolder hardData={hardData} updateForm={updateForm} addNewForm={addNewForm} columns={columns} editData={editData} />
            </Main>
        </>
    )
}

export default TaskPage