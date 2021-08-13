import styled from 'styled-components'

export const Header = styled.header`
    height: 10vh;
    background-color: #FDDEA4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2vw;
    left: 0;
    right: 0;
`

export const Img = styled.img`
    width: 25vw;

    @media (max-width: 700px) {
        width: 40vw;
    }
`

export const Nav = styled.nav`
    width: 25vw;
    display: flex;
    align-items: center;
    justify-content: space-around;

    @media (max-width: 700px) {
        width: 40vw;
        font-size: 1rem;
    }

    @media (max-width: 500px) {
        font-size: 0.75rem;
    }
`   

export const Main = styled.main`
    width: 90vw;
`