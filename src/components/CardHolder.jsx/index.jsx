import React from 'react'
import { Holder, HolderHead, Cards, Column } from './styles'

const CardHolder = () => {
    return(
        <Holder>
            <HolderHead>
                <h3>To Do</h3>
                <h3>In Progress</h3>
                <h3>QA</h3>
                <h3>Complete</h3>
            </HolderHead>
            <Cards>
                <Column>
                <h2>test</h2>
                </Column>
                <Column>
                <h2>test</h2>
                </Column>
                <Column>
                <h2>test</h2>
                </Column>
                <Column>
                <h2>test</h2>
                </Column>
            </Cards>
        </Holder>
    )
}

export default CardHolder