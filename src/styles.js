import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: Hauora;
        src: local(/src/fonts/Hauora-Bold);
        font-weight: 800;
    }

    @font-face {
        font-family: Hauora;
        src: local(/src/fonts/Hauora-Medium);
        font-weight: 600;
    }

    @font-face {
        font-family: Hauora;
        src: local(/src/fonts/Hauora-Regular);
        font-weight: 400;
    }

    *,
    *::after,
    *::before {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Hauora', sans-serif;
        color: #2C436D;
        font-weight: 400;
        font-size: 1rem;
    }
`