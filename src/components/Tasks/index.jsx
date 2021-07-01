import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { Task } from '../Task';
import { listTasks } from '../../graphql/queries';
import { deleteTask, updateTask } from '../../graphql/mutations';
//import produce from 'immer';

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
    const [ tasks, updateTasks ] = useState([]);


    useEffect(() => {
        fetchTasks();
    }, []);


    async function fetchTasks() {
        try {
           const tasksData = await API.graphql({ query: listTasks });
           manageTasks(tasksData.data.listTasks.items);      
        } catch (error) {
            console.log({ error })
        }
    }


    function manageTasks(tasksData) {
        updateTasks(tasksData);

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


    function setTaskState(tasksArray) {
        manageTasks(tasksArray);
    }


    async function removeTask(id) {
        await API.graphql({
            query: deleteTask, variables: { input: { id } }
        });

        const filteredTasks = tasks.filter( task => task.id !== id);
        manageTasks(filteredTasks);
    }

    async function handleTaskUpdate({ id, title, description, priority, stage }) {
        await API.graphql({
            query: updateTask, variables: { input: { id, title, description, priority, stage } }
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


    /* function move(fromList, toList, from, to) {
        updateTasks(produce(tasks, draft => {
            console.log(fromList, toList, from, to, tasks)
          const dragged = draft[fromList].cards[from];
    
          draft[fromList].cards.splice(from, 1);
          draft[toList].cards.splice(to, 0, dragged);
        }))
    } */


    return (
        <TasksContext.Provider value={{ tasks, updateTaskStage, removeTask, editTask }}>
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
                                listIndex={1}
                                data={task} 
                                removeTask={removeTask}
                                updateTask={handleTaskUpdate}
                                editTask={editTask}
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
                                listIndex={2}
                                data={task} 
                                removeTask={removeTask}
                                updateTask={handleTaskUpdate}
                                editTask={editTask}
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
                                listIndex={3}
                                data={task} 
                                removeTask={removeTask}
                                updateTask={handleTaskUpdate}
                                editTask={editTask}
                            />
                        ))
                    } 
                    </div>  
                </div>
            </Container>
            { showOverlay && (
                <CreateTask
                    updateOverlayVisibility={updateOverlayVisibility}
                    updateTasks={setTaskState}
                    tasks={tasks}
                    stage={stage}
                    isUpdating={isUpdating}
                    currentTask={currentTask}
                />
            )}
        </TasksContext.Provider>
    )
}

