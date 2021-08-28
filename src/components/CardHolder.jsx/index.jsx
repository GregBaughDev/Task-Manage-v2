import React, { useState } from 'react'
import { Holder, HolderHead, Cards, H3, CardDisplay } from './styles'
import Column from '../Column/index'
import CardModalDisplay from '../CardModal'

const CardHolder = ({columns, hardData, editData}) => {
    /* TO DO - RECEIVED THE UPDATED DATA IN editData
    Pop the seedsData in state
    Filter through seedsData and replace with edited data
    TO DO - Close edit card if edit cancelled */
    const [cardActive, setCardActive] = useState(false)
    const [currentData, setCurrentData] = useState([])
    const [editCard, setEditCard] = useState(false)
    
    const cardClick = (event) => {
        event.target.id && sendData(event.target.id)
        setCardActive(cardActive => !cardActive)
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
                {cardActive && <CardModalDisplay cardClick={cardClick} currentData={currentData} columns={columns} cardEdit={cardEdit} editCard={editCard} editData={editData} /> }
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