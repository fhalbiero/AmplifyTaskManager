import styled from 'styled-components';

export const Container = styled.div`
    padding: 8px 16px;
    background-color: #0f0f0f;
    color: #f0f0f0;

    .user-container {
        display: flex;
        width: 320px;
        align-items: center;
        justify-content: flex-end;

        span {
            margin-right: 16px;
        }
    }

    .header-container {
        margin: 0 auto;
        max-width: 1280px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;