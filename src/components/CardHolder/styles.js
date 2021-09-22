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
    overflow-x: scroll;
`

export const HolderHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
    border-radius: 12px 12px 0 0;
    background-color: #DAEDDE;
`

export const H3 = styled.h3`
    min-width: 23%;
    width: 25%;
    text-align: center;
    background-color: #DAEDDE;
    height: 100%;
    padding: 1vh 0;

    @media (max-width: 600px) {
        font-size: 1rem;
    }

    @media (max-width: 400px) {
        font-size: 0.75rem;
    }
`

export const Cards = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 2vh 0;
`  

export const CardDisplay = styled.div`
    display: ${({$cardActive}) => ($cardActive ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(44,67,109,0.7);
    overflow-y: hidden;
`
