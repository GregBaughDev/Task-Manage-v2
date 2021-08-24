import React from 'react'
import { CardModal, H4, H5, H6, Button, ButtonHolder} from './styles'
import { Form, Input, Textarea, Select } from '../NewCard/styles'

const CardModalDisplay = ({cardClick, currentData, columns, cardEdit, editCard, cardEditForm}) => {
    return ( 
        <CardModal>
            {!editCard ?
                <>
                    <H4>{currentData[0].title}</H4>
                    <H5>Date and time created: {currentData[0].dateTime}</H5>
                    <H6>User: {currentData[0].user}</H6>
                    <p>{currentData[0].description}</p>
                    <ButtonHolder>
                        <Button onClick={cardClick}>Close</Button>
                        <Button onClick={cardEdit}>Edit</Button>
                    </ButtonHolder> 
                </> : 
                <Form>
                    <label htmlFor="title">Title:</label>
                        <Input type="text" name="title" id="title" onChange={cardEditForm} defaultValue={currentData[0].title} />
                    <label htmlFor="dateTime">Date:</label>
                        <Input type="text" name="dateTime" id="dateTime" onChange={cardEditForm} defaultValue={currentData[0].dateTime} />
                    <label htmlFor="user">User:</label>
                        <Input type="text" name="user" id="user" onChange={cardEditForm} defaultValue={currentData[0].user} />
                    <label htmlFor="description">Description:</label>
                        <Textarea onChange={cardEditForm} value={currentData[0].description}></Textarea>
                    <label htmlFor="column-select">Column:</label>
                        <Select name="column" id="column-select" required>
                                <option value="">Select column</option>
                            {columns.map((column) => (
                                <option key={column.id} value={column.id}>{column.name}</option>
                            ))}
                        </Select>
                </Form>
            }
        </CardModal>
    )
}

export default CardModalDisplay