import styled from "styled-components";

export const NewCardHolder = styled.section`
    background-color: #F8CCC5;
    border: 3px solid #2C436D;
    border-radius: 30px;
    text-align: center;
    width: 60%;
    height: 75%;
    display: flex;
    align-items: center;

    @media (max-width: 600px) {
        width: 90%;
    }
`

export const Form = styled.form`
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    height: 90%;
    display: flex;
    flex-direction: column;
    width: 90%;
`

export const Input = styled.input`
    border: 5px solid #FDDEA4;
    border-radius: 20px;
    width: 80%;
    padding: 1vh 1vw;
    font-family: Hauora;
    margin: 1vh 0;
`   

export const Textarea = styled.textarea`
    border: 5px solid #FDDEA4;
    border-radius: 20px 0 0 20px;
    width: 90%;
    padding: 1vh 1vw;
    min-height: 100px;
    height: 4vh;
    resize: none;
    font-family: Hauora;
    margin: 1vh 0;
`

export const Select = styled.select`
    width: 50%;
    padding: 1vh 1vw;
    border: 5px solid #FDDEA4;
    border-radius: 20px;
    font-family: Hauora;
    margin: 1vh 0;
`