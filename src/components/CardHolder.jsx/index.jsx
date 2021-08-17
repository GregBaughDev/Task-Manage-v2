import React from 'react'
import { Holder, HolderHead, Cards, H3, CardDisplay, CardModal } from './styles'
import Column from '../Column/index'

const CardHolder = ({columns, seedData}) => {
    return(
        <Holder>
            {/* CardDisplay needs a conditional prop to style correctly */}
            <CardDisplay>
                <CardModal />
            </CardDisplay>
            <HolderHead>
                {columns.map((column) => (
                        <H3 key={column.id}>{column.name}</H3>
                    ))}
            </HolderHead>
            <Cards>
                {columns.map((column) => (
                    <Column key={column.id} colNum={column.id} seedData={seedData} />
                ))}
            </Cards>
        </Holder>
    )
}

export default CardHolder