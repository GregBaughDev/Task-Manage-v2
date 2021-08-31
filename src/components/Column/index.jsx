import { Column } from './styles'
import TaskCard from '../Card/index'

const Columns = ({hardData, colNum, cardClick}) => {
    return (
        <Column>
            {hardData.map((seed) => (
                parseInt(seed.column) === colNum ?
                <TaskCard key={seed.id} data={seed} cardClick={cardClick} /> : null
                ))}
        </Column>
    )
}

export default Columns