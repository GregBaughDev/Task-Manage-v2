import React, { useState } from 'react'
import { Holder, HolderHead, Cards, H3, CardDisplay } from './styles'
import Column from '../Column/index'
import CardModalDisplay from '../CardModal'

const CardHolder = ({columns, hardData, editData, closeViewEdit, cardActive, handleDelete}) => {
    // currentData is the currently displayed data in the CardModalDisplay component
    const [currentData, setCurrentData] = useState([])
    // editCard is a conditional to check if the card is being edited
    const [editCard, setEditCard] = useState(false)
    
    // Function to handle passing currently clicked card to modal
    const cardClick = (event) => {
        event.target.id && sendData(event.target.id)
        closeViewEdit()
    }

    // The below takes an ID as an argument and returns the data to display in the CardModalDisplay component
    const sendData = (targId) => {
        setCurrentData(currentData => (
            currentData = hardData.filter(data => data.id === parseInt(targId))
        ))
    }

    // The below changes the editCard state to it's opposite
    const cardEdit = () => {
        setEditCard(editCard => !editCard)
    }

    return(
        <Holder>
            <CardDisplay $cardActive={cardActive} >
                {cardActive && <CardModalDisplay closeViewEdit={closeViewEdit} currentData={currentData} columns={columns} cardEdit={cardEdit} editCard={editCard} editData={editData} handleDelete={handleDelete} /> }
            </CardDisplay>
            <HolderHead>
                {columns.map((column) => (
                        <H3 key={column.id}>{column.name}</H3>
                    ))}
            </HolderHead>
            <Cards>
                {columns.map((column) => (
                    <Column key={column.id} colNum={column.id} hardData={hardData} cardClick={cardClick} />
                ))}
            </Cards>
        </Holder>
    )
}

export default CardHolder