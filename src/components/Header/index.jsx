import React from 'react';
import { AmplifySignOut } from '@aws-amplify/ui-react'


import { Container } from './styles';

export function Header({ user }) {
    return (
        <Container>
            <div className="header-container">
                <h2>Task Manager</h2>
                <div className="user-container">
                    <span>{user?.username}</span>
                    <AmplifySignOut /> 
                </div>
            </div> 
        </Container>
    )
}

