import { NewCardHolder } from '../NewCard/styles'

const UpdateColumn = ({columns}) => {
    return (
        <NewCardHolder>
            {columns.map((col) => (
            <h3 key={col.id}>{col.name}</h3>
            ))}
        </NewCardHolder>
    )
}

export default UpdateColumn