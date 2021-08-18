import React from 'react'
import { Column } from './styles'
import TaskCard from '../Card/index'

const Columns = ({seedData, colNum, cardClick}) => {
    return (
        <Column>
            {seedData.map((seed) => (
                seed.column === colNum ?
                <TaskCard key={seed.id} data={seed} cardClick={cardClick} /> : null
                ))}
        </Column>
    )
}

export default Columns