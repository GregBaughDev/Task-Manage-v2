import React from 'react'
import { Card } from './styles'

const TaskCard = ({data}) => {
    console.log(data)
    return (
        <Card>
            <h4>{data.title}</h4>
            <h5>Date and time created: {data.dateTime}</h5>
            <p>User: {data.user}</p>
        </Card>
    )
}

export default TaskCard