import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1280px;
    padding: 8px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .stage {
        margin: 8px auto;
        padding: 16px 8px;
        width: 33%;
        min-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .stage-top {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 16px;

            .btn-new-task {
                border: 0;
                padding: 8px 26px;
                border-radius: 4px;
                background-color: #006eff;
                color: #fff;
            } 
        }
        
    }

    .task-list {
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }
    
`;