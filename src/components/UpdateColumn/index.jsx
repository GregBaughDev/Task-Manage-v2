import { useState } from 'react'
import { NewCardHolder, Input } from '../NewCard/styles'
import { Button, ButtonHolder } from '../CardModal/styles'
import { UpdateHolder, P, ColumnList } from './styles'

const UpdateColumn = ({columns, updateColumn, addNewColumn}) => {
    // Editing column names state
    const [colEdit, setColEdit] = useState(false)
    // Adding a new column state
    const [addCol, setAddCol] = useState(false)

    // The below handles the click function depending on the button
    const handleClick = (e) => {
        if(e.target.innerText === "Add Column"){
            setAddCol(!addCol)
        }
        
        if(e.target.innerText === "Edit"){
            // setAddCol(!addCol)
            setColEdit(!colEdit)
        }
        //TO DO: SIMILAR TO NEW CARD AND PASS INFO TO PARENT ELEMENT
        if(e.target.innerText === "Save Column"){
            addNewColumn()
        }
        
        if(e.target.innerText === "Close"){
            // Close the modal
            console.log("Close the modal")
        }

        if(e.target.innerText === "Save"){
            // Save edits
        }
    }


    return (
        <NewCardHolder>
            <UpdateHolder>
                <h3>Columns</h3>
                <ColumnList>
                    {addCol && <Input type="text" onChange={updateColumn} name="name" id="name" placeholder="Enter new column name" />}
                    {columns.map((col) => (
                        colEdit ? 
                            <Input key={col.id} type="text" defaultValue={col.name}/> :
                            <P key={col.id}>{col.name}</P>
                        ))}
                </ColumnList>
                <ButtonHolder>
                    {colEdit ? 
                        <Button onClick={handleClick}>Save</Button> :
                        <>
                            <Button onClick={handleClick}>Edit</Button>
                            {!addCol ? 
                                <Button type="submit" onClick={handleClick}>Add Column</Button> : 
                                <Button type="submit" onClick={addNewColumn}>Save Column</Button>}
                        </>
                    }
                    <Button onClick={handleClick}>Close</Button>
                </ButtonHolder>
            </UpdateHolder>
        </NewCardHolder>
    )
}

export default UpdateColumn