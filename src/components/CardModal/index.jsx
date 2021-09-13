import { useState } from 'react'
import { CardModal, H4, H5, H6, P, Button, ButtonHolder} from './styles'
import { Form, Input, Textarea, Select } from '../NewCard/styles'

const CardModalDisplay = ({closeViewEdit, currentData, columns, setEditCard, editCard, editData, handleDelete, cardActive}) => {
    // editedForm is the current form data prior to being edited
    const [editedForm, setEditedForm] = useState(currentData[0])
    // valid handles form validation
    const [valid, setValid] = useState(true)

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
            setEditCard(false)
            closeViewEdit()
        } else {
            closeViewEdit()
        }
    }

    // The below passes the edited form data to the editData function in the TaskPage component
    const handleSubmit = () => {
        setEditCard(false)
        editData(editedForm)
    }

    // Form validation
    const validate = (e) => {
        if(e.target.value === ''){
            e.target.placeholder = "Field must be completed"
            setValid(false)
        }
        formValid()
    }

    const formValid = () => {
        for(let key in editedForm){
            if(editedForm[key] === ''){
                return
            }
        }
        setValid(true)
    }
 
    return ( 
        <CardModal>
            {!editCard ?
                <>
                    <H4>{currentData[0].title}</H4>
                    <H5 $cardActive={cardActive}>Date created: {currentData[0].dateTime}</H5>
                    <H6>User: {currentData[0].user}</H6>
                    <P $cardActive={cardActive}>{currentData[0].description}</P>
                    <ButtonHolder>
                        <Button type="button" onClick={setEditCard}>Edit</Button>
                        <Button type="button" onClick={handleClose}>Close</Button>
                    </ButtonHolder> 
                </> : 
                <Form>
                    <label htmlFor="title">Title:</label>
                        <Input type="text" name="title" id="title" onBlur={validate} onChange={formUpdate} defaultValue={currentData[0].title} />
                    <label htmlFor="dateTime">Date:</label>
                        <Input type="text" name="dateTime" id="dateTime" onBlur={validate} onChange={formUpdate} defaultValue={currentData[0].dateTime} />
                    <label htmlFor="user">User:</label>
                        <Input type="text" name="user" id="user" onBlur={validate} onChange={formUpdate} defaultValue={currentData[0].user} />
                    <label htmlFor="description">Description:</label>
                        <Textarea id="description" name="description" onBlur={validate} onChange={formUpdate} defaultValue={currentData[0].description}></Textarea>
                    <label htmlFor="column-select">Column:</label>
                        <Select value={currentData[0].column} onChange={formUpdate} name="column" id="column-select" required>
                                <option value="" disabled>Select column</option>
                            {columns.map((column) => (
                                <option key={column.id} value={column.id}>{column.name}</option>
                            ))}
                        </Select>
                    <ButtonHolder>
                        <Button onClick={handleSubmit} type="button" disabled={valid ? false : true}>{valid ? 'Submit' : 'Enter information'}</Button>
                        <Button onClick={e => handleDelete(currentData[0]._id)} type="button">Delete</Button>
                        <Button onClick={handleClose} type="button">Close</Button>
                    </ButtonHolder>
                </Form>
            }
        </CardModal>
    )
}

export default CardModalDisplay