import React, { useState } from 'react'
import { Holder, HolderHead, Cards, H3, CardDisplay } from './styles'
import Column from '../Column/index'
import CardModalDisplay from '../CardModal'

const CardHolder = ({columns, hardData, editData, closeViewEdit, cardActive}) => {
    const [currentData, setCurrentData] = useState([])
    const [editCard, setEditCard] = useState(false)
    
    // Function to handle passing currently clicked card to modal
    const cardClick = (event) => {
        event.target.id && sendData(event.target.id)
        // TO DO: This is now causing an issue when the card is opened and closed
        closeViewEdit()
    }

    const sendData = (targId) => {
        setCurrentData(currentData => (
            currentData = hardData.filter(data => data.id === parseInt(targId))
        ))
    }

    const cardEdit = () => {
        setEditCard(editCard => !editCard)
    }

    return(
        <Holder>
            <CardDisplay $cardActive={cardActive} >
                {cardActive && <CardModalDisplay closeViewEdit={closeViewEdit} currentData={currentData} columns={columns} cardEdit={cardEdit} editCard={editCard} editData={editData} /> }
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