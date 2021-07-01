import React, { useContext } from 'react';
import { FaTrash, FaEdit, FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

import TasksContext from '../Tasks/context';

import { Container } from './styles';


export function Task({ data }) {
    const { updateTaskStage, editTask, removeTask } = useContext(TasksContext); 

    return (
        <Container 
            priority={data.priority} 
        >
            <header>
                <h4>{data.title}</h4> 
                <div className="div-priority">{data.priority}</div>
                <button
                    onClick={() => editTask(data)}
                >
                    <FaEdit size={18}/>
                </button>
                <button
                    onClick={() => removeTask(data.id)}
                >
                    <FaTrash size={17}/>
                </button>
            </header>
            <p>{data.description}</p>

            <footer>
                <button
                    onClick={() => updateTaskStage(data, 'PRIOR')}
                    disabled={data.stage === '1'}
                >
                    <FaAngleDoubleLeft />
                    Prior stage
                </button>
                <button
                    onClick={() => updateTaskStage(data, 'NEXT')}
                    disabled={data.stage === '3'}
                >
                    Next stage
                    <FaAngleDoubleRight /> 
                </button>
            </footer>
       
        </Container>
    )
}

