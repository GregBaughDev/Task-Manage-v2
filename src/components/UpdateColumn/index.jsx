import React, { useState } from 'react'
import { NewCardHolder, Input } from '../NewCard/styles'
import { Button, ButtonHolder } from '../CardModal/styles'
import { UpdateHolder, P, ColumnList, ColDiv } from './styles'

const UpdateColumn = ({columns, updateColumn, addNewColumn, addColumnUpdate, editColumn, handleColDelete}) => {
    // Editing column names state
    const [colEdit, setColEdit] = useState(false)
    // Adding a new column state
    const [addCol, setAddCol] = useState(false)
    // Currently edited column
    const [editedCol, setEditedCol] = useState(null)
    // ID of currently edited column
    const [colInEdit, setColInEdit] = useState(null)
    
    // Server start
    const saveColumnUpdate = async () => {
        try {
            await fetch(`/apicol/${colInEdit}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedCol)
            })
        } catch (e) {
            console.log(e)
        }
    }
    // Server end

    // The below handles updating the column name
    const columnUpdate = (e, col) => {
        e.preventDefault()
        setColInEdit(col)
        const {name, value} = e.target
        setEditedCol(editedCol => ({
            id: col,
            [name]: value,
        }))
    }

    // The below handles the click function depending on the button
    const handleClick = (e) => {
        if(e.target.innerText === "Add Column"){
            setAddCol(!addCol)
        }
        
        if(e.target.innerText === "Edit"){
            if(addCol){
                setAddCol(!addCol)
            }
            setColEdit(!colEdit)
        }
        
        if(e.target.innerText === "Close"){
            editColumn()
        }
    }

    const handleEdit = () => {
        if(editedCol !== null){
            console.log("Save clicked")
            saveColumnUpdate()
            addColumnUpdate(editedCol)
            editColumn()
        }
    }

    return (
        <NewCardHolder>
            <UpdateHolder>
                <h3>Columns</h3>
                <ColumnList>
                    {addCol && <Input type="text" onChange={updateColumn} name="name" placeholder="Enter new column name" />}
                    {columns.map((col) => (
                        colEdit ? 
                            <ColDiv key={col.id}>
                                <Input type="text" onChange={e => columnUpdate(e, col.id)} defaultValue={col.name} name="name" disabled={colInEdit !== null && colInEdit !== col.id ? true : false}/>
                                <Button onClick={e => handleColDelete(col.id)}>Delete</Button>
                            </ColDiv> :
                            <P key={col.id}>{col.name}</P>
                        ))}
                </ColumnList>
                <ButtonHolder>
                    {colEdit ? 
                        <Button onClick={handleEdit}>Save</Button> :
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