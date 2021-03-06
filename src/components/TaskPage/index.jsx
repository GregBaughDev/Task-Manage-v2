import { useState, useEffect } from 'react'
import { Header, Img, Nav, Main, NewCardDisplay, P } from './styles'
import CardHolder from '../CardHolder/index.jsx'
import NewCard from '../NewCard/index'
import UpdateColumn from '../UpdateColumn'
import logo from '../../public/img/TMlogo.png'

const TaskPage = ({setUserAuth}) => {
    // State for new card in progress
    const [newCard, setNewCard] = useState(false)
    // State for column update in progress
    const [updateCol, setUpdateCol] = useState(false)
    // State for bg modal
    const [modal, setModal] = useState(false)
    // Seed data passed into state
    const [dbData, setDbData] = useState([]) 
    // Column data passed into state
    const [colData, setColData] = useState([])
    // State for handling adding a new column
    const [colForm, setColForm] = useState({
        id: '',
        name: '',
    })
    // State for handling viewing of a card
    const [cardActive, setCardActive] = useState(false)
    // State for handling adding a new card
    const [formData, setFormData] = useState({
        title: '', 
        dateTime: '',
        user: '',
        description: '',
        column: 1
    }) 
 
    // Function to handle the new card data
    const updateForm = (e) => {
        const {name, value} = e.target
        setFormData(formData => ({
            ...formData,
            [name]: value,
        }))
    }

    // Function to handle the new column data
    const updateColumn = (e) => {
        const {name, value} = e.target
        setColForm(colForm => ({
            ...colForm,
            [name]: value
        }))
    }

    // SERVER START
    const fetchData = async () => {
        try {
            const response = await fetch('/api')
            const cards = await response.json()
            setDbData(cards)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchColumns = async () => {
        try {
            const response = await fetch('/apicol')
            const columns = await response.json()
            setColData(columns)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchData()
        fetchColumns()
    }, [])

    // Function to handle adding the new card to the db
    const addNewForm = async (e, col) => {
        e.preventDefault()
        setFormData(formData => formData.column = parseInt(col.current.value))
        try {
            await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
        } catch(err) {
            console.log(err)
        }
        fetchData()
        makeNewCard()
    }

    // Function to handle deleting a card
    const handleDelete = async (id) => {
        try {
            await fetch(`/api/${id}`, {
                method: 'DELETE',
            })
        } catch(err) {
            console.log(err)
        }
        fetchData()
        closeViewEdit()
    }

    // Function to handle editing a card
    const editData = async (data) => {
        try {
            await fetch(`/api/${data._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        } catch(err) {
            console.log(err)
        }
        fetchData()
        closeViewEdit()
    }

    // Function to handle adding the new column to the column data
    const addNewColumn = async (e) => {
        e.preventDefault()
        try {
            await fetch('/apicol', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(colForm)
            })
        } catch (err) {
            console.log(err)
        }
        editColumn()
        fetchData()
        fetchColumns()
    }

    // Function to handle deleting a column
    const handleColDelete = async (id) => {
        try {
            await fetch(`/apicol/${id}`, {
                method: 'DELETE',
            })
        } catch (err) {
            console.log(err)
        }
        editColumn()
        fetchColumns()
    }

    const handleLogOut = async () => {
        try {
            await fetch('/apilog', {
                method: 'DELETE',
            })
        } catch(err) {
            console.log(err)
        }
        setUserAuth(false)
      }

    // SERVER END

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

    // Function to handle editing a column and replacing in the array
    const addColumnUpdate = (data) => {
        const tempArray = [...colData]
        for(let temp of tempArray){
            if(temp.id === data.id){
                tempArray[tempArray.indexOf(temp)] = data
            }
        }
        setColData(colData => (
            colData = tempArray
        ))
    }

    // If 'cancel' is selected, change the view. TODO: Just use one main function to handle all modal views?
    const closeViewEdit = () => {
        setCardActive(!cardActive)
    }

    return (
        <>
            <Header>
                <NewCardDisplay $modal={modal}>
                    {newCard && 
                        <NewCard 
                            columns={colData} 
                            addNewForm={addNewForm} 
                            updateForm={updateForm} 
                            makeNewCard={makeNewCard} />}
                    {updateCol && 
                        <UpdateColumn 
                            updateColumn={updateColumn} 
                            addNewColumn={addNewColumn} 
                            columns={colData} 
                            addColumnUpdate={addColumnUpdate} 
                            editColumn={editColumn} 
                            handleColDelete={handleColDelete} />}
                </NewCardDisplay>
               <Img alt="Task Manage logo" src={logo} />
               <Nav>
                   {colData.length >= 1 && <P onClick={makeNewCard}>New Task</P>}
                   <P onClick={editColumn}>Edit Columns</P>
                   <P onClick={handleLogOut}>Log Out</P>
               </Nav>
            </Header>
            <Main>
                <CardHolder 
                    dbData={dbData} 
                    updateForm={updateForm} 
                    addNewForm={addNewForm} 
                    columns={colData} 
                    editData={editData} 
                    closeViewEdit={closeViewEdit} 
                    cardActive={cardActive} 
                    handleDelete={handleDelete} />
            </Main>
        </>
    )
}

export default TaskPage