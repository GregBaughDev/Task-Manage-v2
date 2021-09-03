import { useState } from 'react'
import { Header, Img, Nav, Main, NewCardDisplay, P } from './styles'
import CardHolder from '../CardHolder/index.jsx'
import NewCard from '../NewCard/index'
import UpdateColumn from '../UpdateColumn'
import logo from '../../public/img/TMlogo.png'
import seedData from './seeds'
import columns from './columns'

const TaskPage = () => {
    // State for new card in progress
    const [newCard, setNewCard] = useState(false)
    // State for column update in progress
    const [updateCol, setUpdateCol] = useState(false)
    // State for bg modal
    const [modal, setModal] = useState(false)
    // Seed data passed into state
    const [hardData, setHardData] = useState(seedData) 
    // Column data passed into state
    const [colData, setColData] = useState(columns)
    // State for handling adding a new column
    const [colForm, setColForm] = useState({
        id: 5,
        name: '',
    })
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
        setModal(!modal)
        setNewCard(!newCard)
    }

    // Function to handle new column click
    const editColumn = () => {
        setModal(!modal)
        setUpdateCol(!updateCol)
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
    
    // Function to handle the new column data
    const updateColumn = (e) => {
        const {name, value} = e.target
        setColForm(colForm => ({
            ...colForm,
            [name]: value
        }))
    }

    // Function to handle adding the new column to the column data
    const addNewColumn = (e) => {
        e.preventDefault()
        // TO DO: Look into below as ID not increasing and sort styles for new column
        setColForm(colForm => ({
            ...colForm,
            id: colData.length + 1,
        }))
        setColData(colData => (
            colData = [...colData, colForm]
        ))
        console.log(colData)
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
        setCardActive(!cardActive)
    }

    return (
        <>
            <Header>
                <NewCardDisplay $modal={modal}>
                    {newCard && <NewCard columns={colData} addNewForm={addNewForm} updateForm={updateForm} makeNewCard={makeNewCard} />}
                    {updateCol && <UpdateColumn updateColumn={updateColumn} addNewColumn={addNewColumn} columns={colData} />}
                </NewCardDisplay>
               <Img alt="Task Manage logo" src={logo} />
               <Nav>
                   <P onClick={makeNewCard}>New Task</P>
                   <P onClick={editColumn}>Edit Columns</P>
                   <P>Log Out</P>
               </Nav>
            </Header>
            <Main>
                <CardHolder hardData={hardData} updateForm={updateForm} addNewForm={addNewForm} columns={colData} editData={editData} closeViewEdit={closeViewEdit} cardActive={cardActive} handleDelete={handleDelete} />
            </Main>
        </>
    )
}

export default TaskPage