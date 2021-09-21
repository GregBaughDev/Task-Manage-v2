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
    min-height: 60vh;
    height: auto;
    padding: 3vh 2vw;

    @media (max-width: 600px) {
        width: 90%;
    }
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

    @media (max-width: 600px) {
        font-size: 1.5rem;
    }
`

export const H5 = styled.h5`
    font-size: 2rem;

    @media (max-width: 1020px) {
        display: ${({$cardActive}) => ($cardActive ? 'inline' : 'none')}
    }

    @media (max-width: 600px) {
        font-size: 1.5rem;
    }
`

export const H6 = styled.h6`
    font-size: 1.5rem;

    @media (max-width: 600px) {
        font-size: 1rem;
    }
`

export const ButtonHolder = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`

export const Button = styled.button`
    position: relative;
    pointer-events: all;
    font-family: Hauora;
    color: #2C436D;
    width: 30%;
    background-color: #DAEDDE;
    border: none;
    height: 5vh;
    border-radius: 25px;
    margin: 0 auto;
    transition: background-color 0.5s;

    &:hover {
        background-color: #C5C9C6;
        cursor: pointer;
    }
`

export const P = styled.p`
    @media (max-width: 1020px){
        display: ${({$cardActive}) => ($cardActive ? 'inline' : 'none')}
    }
`