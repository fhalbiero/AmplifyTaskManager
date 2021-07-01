import styled, { css } from 'styled-components';

export const Container = styled.div`
    padding: 8px 16px;
    margin-bottom: 8px;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,0.2);
    box-shadow: 0 1px 4px 0 rgba(192, 208, 230,0.9);
    color: #303030;
    cursor: grab;

    h4 {
        width: 240px;
    }

    ${ props => props.isDragging && css`
        cursor: grabbing;
        background-color: transparent;
        border: 2px dashed rgba(0,0,0,0.2);
        box-shadow: none;
        div, button, p {
            opacity: 0;
        }
    `}

    header {
        margin: 0 auto;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    footer {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;

        button {
            width: 86px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            svg {
                margin: 0;
            }

            &:disabled {
                color: rgba(0,0,0, 0.2);
                cursor: not-allowed;
            }
        }
    }

    button {
        border: none;
        width: 35px;
        height: 35px;
        background-color: transparent;
        color: rgba(0,0,0,0.8);
        cursor: pointer;
        transition: all .2s;

        &:hover {
            background-color: rgba(0,0,0,0.1);
        }
    }

    .div-priority {
        font-size: 16px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        width: 56px;
        margin-right: 8px;

        ${ props => {
            if (props.priority === "LOW") {
                return css`
                    color: #b2b3b1;
                `;
            } 
            
            if (props.priority === "MEDIUM") {
                return css`
                    color: #93d9f1;
                `;
            } 
            
            return css`
                color: #f1778c;
            `;
              
        }}
    }
`;