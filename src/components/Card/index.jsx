import { Card, H4 } from './styles'
import './css.css'

const TaskCard = ({data, cardClick}) => {
    return (
        <Card>
            <H4 id={data._id} onClick={cardClick}>{data.title}</H4>
            <h5>Date created: {data.dateTime}</h5>
            <p>User: {data.user}</p>
        </Card>
    )
}

export default TaskCard