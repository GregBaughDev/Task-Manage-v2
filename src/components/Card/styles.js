import styled from "styled-components";

export const Card = styled.section`
    padding: 2vh 0;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 15vh;
    width: 100%;
    text-align: center;
    border: 3px solid #2C436D;
    background-color: #F8CCC5;
    border-radius: 25px;
    margin-bottom: 5%;
`

export const H4 = styled.h4`
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
`