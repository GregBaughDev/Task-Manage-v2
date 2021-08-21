import React, { useState } from 'react'
import { Holder, HolderHead, Cards, H3, CardDisplay } from './styles'
import Column from '../Column/index'
import CardModalDisplay from '../CardModal'

const CardHolder = ({columns, seedsData}) => {
    const [cardActive, setCardActive] = useState(false)
    const [currentData, setCurrentData] = useState([])
    
    const cardClick = (event) => {
        event.target.id && sendData(event.target.id)
        setCardActive(cardActive => !cardActive)
    }

    const sendData = (targId) => {
        setCurrentData(currentData => (
            currentData = seedsData.filter(data => data.id === parseInt(targId))
        ))
    }

    return(
        <Holder>
            <CardDisplay $cardActive={cardActive} >
                {cardActive && <CardModalDisplay cardClick={cardClick} currentData={currentData} /> }
            </CardDisplay>
            <HolderHead>
                {columns.map((column) => (
                        <H3 key={column.id}>{column.name}</H3>
                    ))}
            </HolderHead>
            <Cards>
                {columns.map((column) => (
                    <Column key={column.id} colNum={column.id} seedsData={seedsData} cardClick={cardClick} />
                ))}
            </Cards>
        </Holder>
    )
}

export default CardHolder