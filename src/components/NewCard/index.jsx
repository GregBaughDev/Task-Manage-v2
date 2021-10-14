import { useState, useRef } from 'react'
import { NewCardHolder, Form, Input, Textarea, Select } from './styles'
import { Button, ButtonHolder } from '../CardModal/styles'

const NewCard = ({columns, addNewForm, updateForm, makeNewCard}) => {
    const colSelect = useRef()
    const [valid, setValid] = useState(false)
    const [validObj, setValidObj] = useState({
        title: '',
        dateTime: '',
        user: '',
    })

    const validate = (e) => {
        const {name, value} = e.target
        if(e.target.value === ''){
            e.target.placeholder = "Field must be completed"
        } else {
            setValidObj(() => ({
                ...validObj,
                [name]: value
            }))
        }
        formValid()
    }

    const formValid = () => {
        for(let key in validObj){
            if(validObj[key] === ''){
                return
            }
        }
        setValid(true)
    }
    
    return (
        <NewCardHolder>
            <Form>
                <label htmlFor="title">Title:</label>
                    <Input onChange={updateForm} onBlur={validate} type="text" name="title" id="title" />
                {/* TODO: VERSION 3 add date validations 
                <label htmlFor="date">Start Date
                    <Input type="date" name="date" id="date" />
                </label>
                <label htmlFor="date">Finish Date
                    <Input type="date" name="date" id="date"  />
                </label> */}
                <label htmlFor="dateTime">Date:</label>
                    <Input onChange={updateForm} onBlur={validate} type="text" name="dateTime" id="dateTime" />
                <label htmlFor="user">User:</label>
                    <Input onChange={updateForm} onBlur={validate} type="text" name="user" id="user" />
                <label htmlFor="description">Description:</label>
                    <Textarea onChange={updateForm} onBlur={validate} id="description" name="description"></Textarea>
                <label htmlFor="column-select">Column:</label>
                    <Select ref={colSelect} name="column" id="column-select">
                            <option disabled>Select column</option>
                        {columns.map((column) => (
                            <option key={column.id} value={column.id}>{column.name}</option>
                        ))}
                    </Select>
                <ButtonHolder>
                    <Button onClick={(e) => addNewForm(e, colSelect)} type="button" disabled={valid ? false : true}>{valid ? 'Submit' : 'Enter information'}</Button>
                    <Button type="button" onClick={makeNewCard}>Close</Button>
                </ButtonHolder>
            </Form>
        </NewCardHolder>
    )
}

export default NewCard