import styled from 'styled-components'

export const CardModal = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #F8CCC5;
    border: 3px solid #2C436D;
    border-radius: 30px;
    text-align: center;
    width: 60vw;
    height: 60vh;
    pointer-events: none;
    padding: 3vh 0;
`   

export const H4 = styled.h4`
    align-self: stretch;
    font-size: 2.5rem;

    &::after {
        content: "";
        background-color: #2C436D;
        display: block;
        position: relative;
        height: 3px;
    }
`

export const H5 = styled.h5`
    font-size: 2rem;
`

export const H6 = styled.h6`
    font-size: 1.5rem;
`

export const ButtonHolder = styled.div`
    display: flex;
    width: 80%;
    align-items: center;
    justify-content: space-between;
`

export const Button = styled.button`
    position: relative;
    pointer-events: all;
    font-family: Hauora;
    color: #2C436D;
    width: 40%;
    background-color: #DAEDDE;
    border: none;
    height: 5vh;
    border-radius: 25px;
    margin: 0 auto;
`