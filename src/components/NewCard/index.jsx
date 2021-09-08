import { useState } from 'react'
import { NewCardHolder, Form, Input, Textarea, Select } from './styles'
import { Button, ButtonHolder } from '../CardModal/styles'

const NewCard = ({columns, addNewForm, updateForm, makeNewCard}) => {
    const [valid, setValid] = useState(false)

    const validate = (e) => {
        // pop addNewForm function here which only runs if validations are passed
        if(e.target.value === ''){
            console.log("Field must be completed")
        }
        if(valid){
            addNewForm()
        }
    }

    return (
        <NewCardHolder>
            <Form>
                <label htmlFor="title">Title:</label>
                    <Input onChange={updateForm} onBlur={validate} type="text" name="title" id="title" required />
                {/* <label htmlFor="date">Start Date
                    <Input type="date" name="date" id="date" required />
                </label>
                <label htmlFor="date">Finish Date
                    <Input type="date" name="date" id="date" required />
                </label> */}
                <label htmlFor="dateTime">Date:</label>
                    <Input onChange={updateForm} onBlur={validate} type="text" name="dateTime" id="dateTime" required />
                <label htmlFor="user">User:</label>
                    <Input onChange={updateForm} onBlur={validate} type="text" name="user" id="user" required />
                <label htmlFor="description">Description:</label>
                    <Textarea onChange={updateForm} onBlur={validate} id="description" name="description"></Textarea>
                <label htmlFor="column-select">Column:</label>
                    <Select onChange={updateForm} name="column" id="column-select" required>
                            <option disabled>Select column</option>
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