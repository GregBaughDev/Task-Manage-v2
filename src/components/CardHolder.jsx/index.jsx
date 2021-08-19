import React, {useState} from 'react'
import { Holder, HolderHead, Cards, H3, CardDisplay } from './styles'
import Column from '../Column/index'
import CardModalDisplay from '../CardModal'

import NewCard from '../NewCard'

const CardHolder = ({columns, seedData}) => {
    // Look into making a new state with the initial data in and then useEffect to update when new item added
    const [seedsData, setSeedData] = useState(seedData)

    const [cardActive, setCardActive] = useState(false)
    const [currentData, setCurrentData] = useState([])
    const [formData, setFormData] = useState({
        id: seedData.length + 1,
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
        // The below doesn't work - look into this
        setSeedData(seedsDate => (
            seedsData.push(formData)
        ))
        // TO DO: Obtained date from updateForm - need to push to currentDate and update form - May need to use useEffect
        // console.log(formData)
        // seedData.push(formData)
        // console.log(seedData)
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
                    <Column key={column.id} colNum={column.id} seedData={seedData} cardClick={cardClick} />
                ))}
            </Cards>
            <NewCard columns={columns} addNewForm={addNewForm} updateForm={updateForm} />
        </Holder>
    )
}

export default CardHolder