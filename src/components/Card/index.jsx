import { Card, H4 } from './styles'

const TaskCard = ({data, cardClick}) => {
    return (
        <Card>
            <H4 id={data.id} onClick={cardClick}>{data.title}</H4>
            <h5>Date and time created: {data.dateTime}</h5>
            <p>User: {data.user}</p>
        </Card>
    )
}

export default TaskCard