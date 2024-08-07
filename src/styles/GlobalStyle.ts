import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Roboto', sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f5f5f5;
    }

    button {
        cursor: pointer;
        font-size: 1rem;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        background-color: #3498db;
        color: white;
        transition: all 0.3s ease;

        &:hover {
            background-color: #2980b9;
        }

        &:disabled {
            background-color: #bdc3c7;
            cursor: not-allowed;
        }
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', sans-serif;
        color: #2c3e50;
    }
`;