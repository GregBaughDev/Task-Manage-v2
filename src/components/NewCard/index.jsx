import { NewCardHolder, Form, Input, Textarea, Select } from './styles'
import { Button, ButtonHolder } from '../CardModal/styles'

const NewCard = ({columns, addNewForm, updateForm, makeNewCard}) => {
    return (
        <NewCardHolder>
            <Form>
                <label htmlFor="title">Title:</label>
                    <Input onChange={updateForm} type="text" name="title" id="title" required />
                {/* <label htmlFor="date">Start Date
                    <Input type="date" name="date" id="date" required />
                </label>
                <label htmlFor="date">Finish Date
                    <Input type="date" name="date" id="date" required />
                </label> */}
                <label htmlFor="dateTime">Date:</label>
                    <Input onChange={updateForm} type="text" name="dateTime" id="dateTime" required />
                <label htmlFor="user">User:</label>
                    <Input onChange={updateForm} type="text" name="user" id="user" required />
                <label htmlFor="description">Description:</label>
                    <Textarea id="description" name="description"></Textarea>
                <label htmlFor="column-select">Column:</label>
                    <Select onChange={updateForm} name="column" id="column-select" required>
                            <option value="">Select column</option>
                        {columns.map((column) => (
                            <option key={column.id} value={column.id}>{column.name}</option>
                        ))}
                    </Select>
                <ButtonHolder>
                    <Button onClick={addNewForm} type="button">Submit</Button>
                    <Button type="button" onClick={makeNewCard}>Close</Button>
                </ButtonHolder>
            </Form>
        </NewCardHolder>
    )
}

export default NewCard