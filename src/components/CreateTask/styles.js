import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    position: fixed;
    left: 0;
    border-radius: 4px;
    top: 0;
    margin-left: calc(50vw - 220px);
    margin-top: calc(50vh - 230px);
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.125rem 0.25rem;
    padding: 26px;

    h2 {
        margin-bottom: 26px;
    }

    input, select {
        margin-bottom: 10px;
        outline: none;
        padding: 7px;
        border: 1px solid #ddd;
        font-size: 16px;
        border-radius: 4px;
    }

    p {
        margin-bottom: 0px;
    }

    button {
        border: 0;
        margin-top: 16px;
        padding: 16px 26px;
        border-radius: 4px;
        background-color: #006eff;
        color: #fff;
        transition: filter .2s;
        cursor: pointer;

        &:hover {
            filter: brightness(1.2);
        }
    }

    .btn-cancel {
        background-color: rgba(0,0,0,0.2);
    }
`;