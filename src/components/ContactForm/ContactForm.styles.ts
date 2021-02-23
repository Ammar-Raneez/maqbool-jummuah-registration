import styled from "styled-components";

export const ContactFormWrapper = styled.div `
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* box-shadow: 0vw 0.1vw 0.6vw rgba(255, 255, 255, 0.12), 0 0.1vw 0.2vw rgba(255, 255, 255, 0.24); */
    padding: 3vw;
    background-color: rgba(0, 0, 0, 0.3);

    .ant-card {
        background: transparent;
        border: none;
    }

    label {
        color: white;
    }

    > form {
        width: 100%;
    }

    > form > h1 {
        text-align: center;
        color: white;
        font-size: 2.5rem;
    }

    > form > div > p, > form > div > div > div > div > p {
        color: white;
    }

    > form > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    > form > div > div.ant-form-item-control {
        width: 100%;
    }

    .contactUs__formBtn {
        margin-top: 2rem;
    }

    @media screen and (max-width: 1250px) {
        #jamaathTimings > div.ant-col {
            width: 100%;
            margin-bottom: 1vw;
        }
    }

    @media screen and (max-width: 800px) {
        width: 80%
    }
`