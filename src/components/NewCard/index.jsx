import React from 'react'

const NewCard = ({columns, addNewForm, updateForm}) => {
    return (
        <form onSubmit={addNewForm}>
            <label htmlFor="title">Title
                <input onChange={updateForm} type="text" name="title" id="title" required />
            </label>
            {/* <label htmlFor="date">Start Date
                <input type="date" name="date" id="date" required />
            </label>
            <label htmlFor="date">Finish Date
                <input type="date" name="date" id="date" required />
            </label> */}
            <label htmlFor="dateTime">Date:
                <input onChange={updateForm} type="text" name="dateTime" id="dateTime" required />
            </label>
            <label htmlFor="user">User
                <input onChange={updateForm} type="text" name="user" id="user" required />
            </label>
            <label htmlFor="column-select">Select column
                <select onChange={updateForm} name="column" id="column-select" required>
                        <option value="">Select column</option>
                    {columns.map((column) => (
                        <option key={column.id} value={column.id}>{column.name}</option>
                    ))}
                </select>
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default NewCard