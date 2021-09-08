import { useState } from 'react'
import { CardModal, H4, H5, H6, Button, ButtonHolder} from './styles'
import { Form, Input, Textarea, Select } from '../NewCard/styles'

const CardModalDisplay = ({closeViewEdit, currentData, columns, cardEdit, editCard, editData, handleDelete}) => {
    // editedForm is the current form data prior to being edited
    const [editedForm, setEditedForm] = useState(currentData[0])

    // The below handles the updating of the form
    const formUpdate = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setEditedForm(editedForm => ({
            ...editedForm,
            [name]: value
        }))
    }

    /* The below handles closing the card - A check is undertaken to check if the card
    is in the process of being edited */
    const handleClose = () => {
        if(editCard){
            cardEdit()
            closeViewEdit()
        } else {
            closeViewEdit()
        }
    }

    // The below passes the edited form data to the editData function in the TaskPage component
    const handleSubmit = () => {
        editData(editedForm)
    }
 
    return ( 
        <CardModal>
            {!editCard ?
                <>
                    <H4>{currentData[0].title}</H4>
                    <H5>Date and time created: {currentData[0].dateTime}</H5>
                    <H6>User: {currentData[0].user}</H6>
                    <p>{currentData[0].description}</p>
                    <ButtonHolder>
                        <Button type="button" onClick={cardEdit}>Edit</Button>
                        <Button type="button" onClick={handleClose}>Close</Button>
                    </ButtonHolder> 
                </> : 
                <Form>
                    <label htmlFor="title">Title:</label>
                        <Input type="text" name="title" id="title" onChange={formUpdate} defaultValue={currentData[0].title} />
                    <label htmlFor="dateTime">Date:</label>
                        <Input type="text" name="dateTime" id="dateTime" onChange={formUpdate} defaultValue={currentData[0].dateTime} />
                    <label htmlFor="user">User:</label>
                        <Input type="text" name="user" id="user" onChange={formUpdate} defaultValue={currentData[0].user} />
                    <label htmlFor="description">Description:</label>
                        <Textarea id="description" name="description" onChange={formUpdate} defaultValue={currentData[0].description}></Textarea>
                    <label htmlFor="column-select">Column:</label>
                        <Select value={currentData[0].column} onChange={formUpdate} name="column" id="column-select" required>
                                <option value="" disabled>Select column</option>
                            {columns.map((column) => (
                                <option key={column.id} value={column.id}>{column.name}</option>
                            ))}
                        </Select>
                    <ButtonHolder>
                        <Button onClick={handleSubmit} type="button">Submit</Button>
                        <Button onClick={e => handleDelete(currentData[0]._id)} type="button">Delete</Button>
                        <Button onClick={handleClose} type="button">Close</Button>
                    </ButtonHolder>
                </Form>
            }
        </CardModal>
    )
}

export default CardModalDisplay