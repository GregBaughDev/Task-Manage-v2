import styled from 'styled-components'

export const Holder = styled.div`
    width: 100%;
    height: 100%;
    border: 3px solid #2C436D;
    border-radius: 15px;
    margin: 5vh 5vw;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`

export const HolderHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 5vh;
    border-radius: 12px;
    background-color: #DAEDDE;
`

export const Cards = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding: 2vh 0;
`  

export const Column = styled(Cards)`
    width: 23%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid red;
`