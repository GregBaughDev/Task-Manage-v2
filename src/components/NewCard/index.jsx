import React from 'react'

const NewCard = ({columns, addNewForm, updateForm}) => {
    return (
        <form onSubmit={addNewForm}>
            <label for="title">Title
                <input onChange={updateForm} type="text" name="title" id="title" required />
            </label>
            {/* <label for="date">Start Date
                <input type="date" name="date" id="date" required />
            </label>
            <label for="date">Finish Date
                <input type="date" name="date" id="date" required />
            </label> */}
            <label for="date">Date:
                <input onChange={updateForm} type="text" name="date" id="date" required />
            </label>
            <label for="user">User
                <input onChange={updateForm} type="text" name="user" id="user" required />
            </label>
            <label for="column-select">Select column
                <select onChange={updateForm} name="column" id="column-select">
                    {columns.map((column) => (
                        <option value={column.id}>{column.name}</option>
                    ))}
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default NewCard