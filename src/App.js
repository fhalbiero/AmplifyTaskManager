import React, { useState, useEffect } from 'react';
import Amplify, { Auth } from 'aws-amplify'
import config from './aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Tasks } from "./components/Tasks";
import { Header } from "./components/Header"

Amplify.configure(config)



function App() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const userData = await Auth.currentAuthenticatedUser();
    
    setUser(userData);
  }

  return (
    <>
      <Header user={user}/>
      <Tasks/>
    </>
  );
}

export default withAuthenticator(App);
