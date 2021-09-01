import { useState } from 'react'
import { NewCardHolder, Input } from '../NewCard/styles'
import { Button, ButtonHolder } from '../CardModal/styles'
import { UpdateHolder, P, ColumnList } from './styles'

const UpdateColumn = ({columns}) => {
    // Editing column names state
    const [colEdit, setColEdit] = useState(false)
    // Adding a new column state
    const [addCol, setAddCol] = useState(false)

    // The below handles the click function depending on the button
    const handleClick = (e) => {
        if(e.target.innerText === "Add Column"){
            console.log("Add column")
            setAddCol(!addCol)
        }
        
        if(e.target.innerText === "Edit"){
            setAddCol(!addCol)
            setColEdit(!colEdit)
        }
        
        if(e.target.innerText === "Save Column"){
            console.log("Column saved")
        }
        
        if(e.target.innerText === "Close"){
            // Close the modal
            console.log("Close the modal")
        }

        if(e.target.innerText === "Save"){
            // Save edits
        }
    }

    const colChange = (e) => {
        console.log(e.target.value)
    }

    const colAdd = (e) => {
        // Pass up to parent where column data exists - editColumn in TaskPage index.jsx
        console.log(e.target.value)
    }

    return (
        <NewCardHolder>
            <UpdateHolder>
                <h3>Columns</h3>
                <ColumnList>
                    {addCol && <Input type="text" onChange={colAdd} placeholder="Enter new column name" />}
                    {columns.map((col) => (
                        colEdit ? 
                            <Input key={col.id} type="text" onChange={colChange} defaultValue={col.name}/> :
                            <P key={col.id}>{col.name}</P>
                        ))}
                </ColumnList>
                <ButtonHolder>
                    {colEdit ? 
                        <Button onClick={handleClick}>Save</Button> :
                        <>
                            <Button onClick={handleClick}>Edit</Button>
                            <Button onClick={handleClick}>{addCol ? "Save Column" : "Add Column"}</Button>
                        </>
                    }
                    <Button onClick={handleClick}>Close</Button>
                </ButtonHolder>
            </UpdateHolder>
        </NewCardHolder>
    )
}

export default UpdateColumn