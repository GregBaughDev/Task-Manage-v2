import styled from "styled-components";

export const Card = styled.section`
    padding: 2vh 5px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 15vh;
    width: 20vw;
    text-align: center;
    border: 3px solid #2C436D;
    background-color: #F8CCC5;
    border-radius: 25px;
    margin-bottom: 5%;

    @media (max-width: 1020px) {
        height: auto;
    }
`

export const H4 = styled.h4`
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`