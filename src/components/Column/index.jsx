import React from 'react'
import { Column } from './styles'
import TaskCard from '../Card/index'

const Columns = ({seedData, colNum}) => {
    console.log(seedData)
    return (
        <Column>
            {seedData.map((seed) => (
                seed.column === colNum ?
                <TaskCard key={seed.id} data={seed} /> : null
                ))}
        </Column>
    )
}

export default Columns