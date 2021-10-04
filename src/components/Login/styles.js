import styled from "styled-components"

export const FormHolder = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 75%;
    height: 80vh;
    margin: 0 auto;

    Form {
        height: ${({$newUser}) => ($newUser ? 'auto' : '60%')};
        width: 75%;
        border: 3px solid #2C436D;
        border-radius: 30px;
        padding: 5vh 5vw;
        margin-top: 2vh;
    }

    @media (max-width: 600px) {
        Form {
            width: 100%;
        }

        Button {
            width: 75%;
        }
    }
`

export const H4 = styled.h4`
    font-size: 1.50rem;
    text-align: center;
`