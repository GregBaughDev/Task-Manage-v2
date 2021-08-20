import React, { useState } from 'react'
import { Holder, HolderHead, Cards, H3, CardDisplay } from './styles'
import Column from '../Column/index'
import CardModalDisplay from '../CardModal'
import NewCard from '../NewCard'

const CardHolder = ({columns, seedData}) => {
    const [seedsData, setSeedsData] = useState(seedData)
    const [cardActive, setCardActive] = useState(false)
    const [currentData, setCurrentData] = useState([])
    const [formData, setFormData] = useState({
            /* Initial newform won't be added as the length is incremented
            after the push so we end up with two cards with the same id */
            // id: seedsData.length + 1,
            title: '', 
            dateTime: '',
            user: '',
            description: 'Some placeholder text',
            column: '',
        }) 

    const cardClick = (event) => {
        event.target.id && sendData(event.target.id)
        setCardActive(cardActive => cardActive = !cardActive)
    }

    const sendData = (targId) => {
        setCurrentData(currentData => (
            currentData = seedData.filter(data => data.id === parseInt(targId))
        ))
    }

    const updateForm = (e) => {
        const {name, value} = e.target
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const addNewForm = (e) => {
        e.preventDefault()
        setFormData(formData => ({
            ...formData,
            id: seedsData.length + 1,
            column: parseInt(formData.column)
        }))
        setSeedsData(seedsData => (
            seedsData = [...seedsData, formData]
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
            <NewCard columns={columns} addNewForm={addNewForm} updateForm={updateForm} />
        </Holder>
    )
}

export default CardHolder