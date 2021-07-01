import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { Task } from '../Task';
import { listTasks } from '../../graphql/queries';
import { deleteTask, updateTask } from '../../graphql/mutations';

import TasksContext from './context';

import { Container } from './styles';
import { CreateTask } from '../CreateTask';


export function Tasks() {
    const [ tasksStage1, setTasksStage1 ] = useState([]);
    const [ tasksStage2, setTasksStage2 ] = useState([]);
    const [ tasksStage3, setTasksStage3 ] = useState([]);
    const [ stage, setStage ] = useState('');
    const [ isUpdating, setIsUpdating ] = useState(false);
    const [ currentTask, setCurrentTask ] = useState(null);

    const [ showOverlay, setShowOverlay ] = useState(false);
    const [ tasks, setTasks ] = useState([]);


    useEffect(() => {
        fetchTasks();
    }, []);


    async function fetchTasks() {
        try {
            const tasksData = await API.graphql({ 
                    authMode: 'AMAZON_COGNITO_USER_POOLS',   
                    query: listTasks 
                });
            await setTaskState(tasksData.data.listTasks.items);      
        } catch (error) {
            console.log({ error });
        }
    }


    async function setTaskState(tasksArray) {
        const user = await Auth.currentAuthenticatedUser();
        const ownerTasks = tasksArray.filter( task => task.owner === user.username)
        manageTasks(ownerTasks);
    }


    function manageTasks(tasksData) {
        setTasks(tasksData);

        const tasksDataStage1 = [];
        const tasksDataStage2 = [];
        const tasksDataStage3 = [];

        for (let task of tasksData) {
             if (task.stage === '1') {
                 tasksDataStage1.push(task);
             } else if (task.stage === '2') {
                 tasksDataStage2.push(task);
             } else if (task.stage === '3') {
                 tasksDataStage3.push(task);
             }
        }
        
        setTasksStage1(tasksDataStage1);
        setTasksStage2(tasksDataStage2);
        setTasksStage3(tasksDataStage3);
    }


    async function removeTask(id) {
        await API.graphql({
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            query: deleteTask, 
            variables: { input: { id } }
        });

        /* const filteredTasks = tasks.filter( task => task.id !== id);
        manageTasks(filteredTasks); */
        await fetchTasks();
    }

    async function handleTaskUpdate({ id, title, description, priority, stage }) {
        await API.graphql({
            authMode: 'AMAZON_COGNITO_USER_POOLS',
            query: updateTask, 
            variables: { input: { id, title, description, priority, stage } }
        });

        await fetchTasks();
    }

    function updateOverlayVisibility() {
        setShowOverlay(false);
        setIsUpdating(false);
        setCurrentTask(null);
    }


    function newTask(stage) {
        setStage(stage);
        setShowOverlay(true);
    }


    function editTask(task) {
        setStage(stage);
        setIsUpdating(true);
        setShowOverlay(true);
        setCurrentTask(task);
    }


    async function updateTaskStage(task, command) {
        if (command === 'PRIOR') {
           task.stage = String(Number(task.stage) - 1); 
           await handleTaskUpdate(task);
           return;
        }

        if (command === 'NEXT') {
            task.stage = String(Number(task.stage) + 1); 
            await handleTaskUpdate(task);
            return;
         }
    }



    return (
        <TasksContext.Provider value={{ 
            tasks, 
            updateTaskStage, 
            removeTask, 
            editTask,
            isUpdating,
            currentTask,
            stage,
            updateOverlayVisibility, 
            fetchTasks 
        }}>
            <Container>
                <div className="stage">
                    <div className="stage-top">
                        <h2>Backlog</h2>
                        <button 
                            className="btn-new-task"
                            onClick={() => newTask("1")} 
                        >
                            New Task
                        </button>
                    </div>            
                    <div className="task-list">
                    {
                        tasksStage1.map( (task, index) => (
                            <Task 
                                key={task.id} 
                                index={index}
                                data={task} 
                            />
                        ))
                    } 
                    </div>  
                </div>

                <div className="stage">
                    <div className="stage-top">
                        <h2>In Progress</h2>
                    </div>  
                    <div className="task-list">
                    {
                        tasksStage2.map( (task, index) => (
                            <Task 
                                key={task.id} 
                                index={index}                     
                                data={task} 
                            />
                        ))
                    } 
                    </div>  
                </div>

                <div className="stage">
                    <div className="stage-top">
                        <h2>Done</h2>
                    </div>  
                    <div className="task-list">
                    {
                        tasksStage3.map( (task, index) => (
                            <Task 
                                key={task.id} 
                                index={index}
                                data={task} 
                            />
                        ))
                    } 
                    </div>  
                </div>
            </Container>
            { showOverlay && (
                <CreateTask  />
            )}
        </TasksContext.Provider>
    )
}

