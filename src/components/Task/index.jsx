import React, { useContext } from 'react';
//import { useDrag, useDrop } from 'react-dnd';
import { FaTrash, FaEdit, FaAngleDoubleRight, FaAngleDoubleLeft } from 'react-icons/fa';

import TasksContext from '../Tasks/context';

import { Container } from './styles';


export function Task({ data, listIndex }) {
    // const ref = useRef();
    const { updateTaskStage, editTask, removeTask } = useContext(TasksContext); 
    /* const [{ isDragging }, dragRef] = useDrag({
        type: "CARD",
        item: { type: "CARD", id: data.id, index, listIndex, content: data },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    const [, dropRef] = useDrop({
        accept: "CARD",
        hover(item, monitor) {
            const draggedListIndex = item.listIndex;
            const targetListIndex = listIndex;

            console.log(item, listIndex )

            const draggedIndex = item.index;
            const targetIndex = index;
            
            if ( draggedIndex === targetIndex && draggedIndex === targetListIndex ) return;

            const targetSize = ref.current.getBoundingClientRect();
            const targetCenter = (targetSize.bottom - targetSize.top) / 2;
            const draggerOffset = monitor.getClientOffset();
            const draggerTop = draggerOffset.y - targetSize.top;

            if (draggedIndex < targetIndex && draggerTop < targetCenter) return;

            if (draggedIndex > targetIndex && draggerTop > targetCenter) return;

            move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

            item.index = targetIndex;
            item.listIndex = targetListIndex;
        }
    });

    dragRef(dropRef(ref)); */

    return (
        <Container 
            //ref={ref} 
            priority={data.priority} 
            //isDragging={isDragging}
        >
            <header>
                <h4>{data.title}</h4> 
                <div className="div-priority">{data.priority}</div>
                <button
                    onClick={() => editTask(data, listIndex)}
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
                    disabled={listIndex === 1}
                >
                    <FaAngleDoubleLeft />
                    Prior stage
                </button>
                <button
                    onClick={() => updateTaskStage(data, 'NEXT')}
                    disabled={listIndex === 3}
                >
                    Next stage
                    <FaAngleDoubleRight /> 
                </button>
            </footer>
       
        </Container>
    )
}

