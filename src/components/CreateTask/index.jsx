import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { API, Auth } from 'aws-amplify';
import { createTask, updateTask } from '../../graphql/mutations';

import { Container } from './styles';

const initialState = {
    title: '',
    description: '',
    priority: 'LOW',
    stage: '3',
};


export function CreateTask({ 
    updateOverlayVisibility, 
    updateTasks, 
    stage, 
    tasks, 
    isUpdating, 
    currentTask 
}) {
    const [ formState, updateFormState ] = useState(initialState);

    useEffect(() => {
        if (isUpdating) {
            updateFormState({...currentTask})
        }
        console.log(currentTask)
    }, []);


    function onChangeText(e) {
        e.persist();
        updateFormState(currentState => ({ ...currentState, [e.target.name]: e.target.value }));
    }

    async function save() {
        try {
            const { title, description, priority } = formState;
            if (!title || !priority || !stage) return;

            updateFormState(currentState => ({ ...currentState, saving: true }));
            const taskId = uuid();
            const taskInfo = { title, description, priority, stage, id: taskId };
        
            if (isUpdating) {
                await API.graphql({
                    query: updateTask, variables: { input: { ...taskInfo, id: formState.id } }
                });

                const filteredTasks = tasks.filter( task => task.id !== currentTask.id);
                updateTasks([...filteredTasks, { ...taskInfo, id: formState.id }]);
            } else {
                await API.graphql({
                    query: createTask, variables: { input: taskInfo }
                });
                updateTasks([...tasks, { ...taskInfo }]);
            }
            
            
            updateFormState(currentState => ({ ...currentState, saving: false }));
            updateOverlayVisibility(false);

        } catch (err) {
            console.log('error: ', err);
        }
    }


    return (
        <Container>
            <input
                placeholder="Task title"
                name="title"
                onChange={onChangeText}
                value={formState.title}
            />
            <input
                placeholder="Description"
                name="description"
                onChange={onChangeText}
                value={formState.description}
            />
            <select 
                name="priority" 
                value={formState.priority}
                onChange={onChangeText}
            >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
            </select>

            
            <button 
                onClick={save} >
                Save
            </button>
            <button 
                className="btn-cancel"
                onClick={() => updateOverlayVisibility(false)} >
                Cancel
            </button>
            { formState.saving && <p>Saving task...</p> }
        </Container>
    )
}

