import React, {useState} from 'react'
import { Holder, HolderHead, Cards, H3, CardDisplay } from './styles'
import Column from '../Column/index'
import CardModalDisplay from '../CardModal'

const CardHolder = ({columns, seedData}) => {
    const [cardActive, setCardActive] = useState(false)
    const [currentData, setCurrentData] = useState([seedData[0]])

    const cardClick = (event) => {
        event.target.id && sendData(event.target.id)
        setCardActive(cardActive => cardActive = !cardActive)
    }

    const sendData = (targId) => {
        setCurrentData(currentData => (
            currentData = seedData.filter(data => data.id === parseInt(targId))
        ))
    }

    return(
        <Holder>
            <CardDisplay $cardActive={cardActive} >
                <CardModalDisplay cardClick={cardClick} currentData={currentData} />
            </CardDisplay>
            <HolderHead>
                {columns.map((column) => (
                        <H3 key={column.id}>{column.name}</H3>
                    ))}
            </HolderHead>
            <Cards>
                {columns.map((column) => (
                    <Column key={column.id} colNum={column.id} seedData={seedData} cardClick={cardClick} />
                ))}
            </Cards>
        </Holder>
    )
}

export default CardHolder