import { Column } from './styles'
import TaskCard from '../Card/index'

const Columns = ({dbData, colNum, cardClick}) => {
    return (
        <Column>
        {/* TO DO: MOVE HolderHead into this component */}
            {dbData.map((seed) => (
                parseInt(seed.column) === colNum ?
                <TaskCard key={seed._id} data={seed} cardClick={cardClick} /> : null
                ))}
        </Column>
    )
}

export default Columns