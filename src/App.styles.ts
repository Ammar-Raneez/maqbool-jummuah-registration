import styled from "styled-components";

export const AppWrapper = styled.div `
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3vw;
    background-image: url("bgImage.jpg");
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
`

export const LoadingWrapper = styled.div `
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    > p {
        font-size: 3rem;
        font-family: fantasy;
    }
`