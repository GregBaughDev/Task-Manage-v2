import React from 'react'
import { Column } from './styles'
import TaskCard from '../Card/index'

const Columns = ({seedsData, colNum, cardClick, cardEdit}) => {
    return (
        <Column>
            {seedsData.map((seed) => (
                // parseInt(seed.column) === colNum ?
                seed.column === colNum ?
                <TaskCard key={seed.id} data={seed} cardClick={cardClick} /> : null
                ))}
        </Column>
    )
}

export default Columns