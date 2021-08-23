import React from 'react'
import { CardModal, H4, H5, H6, Button, ButtonHolder} from './styles'

const CardModalDisplay = ({cardClick, currentData}) => {
    return (
        <CardModal>
            <H4>{currentData[0].title}</H4>
            <H5>Date and time created: {currentData[0].dateTime}</H5>
            <H6>User: {currentData[0].user}</H6>
            <p>{currentData[0].description}</p>
            <ButtonHolder>
                <Button onClick={cardClick}>Close</Button>
                <Button>Edit</Button>
            </ButtonHolder>
            {/* TO DO - Sort out edit form */}
            <form>
                <label>Title</label>
                <input type="text">{currentData[0].title}</input>
                <label>User:</label>
                <input type="text">{currentData[0].user}</input>
                <label>Description:</label>
                <textarea value={currentData[0].description}></textarea>
            </form>
        </CardModal>
    )
}

export default CardModalDisplay