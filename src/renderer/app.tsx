import React, { useState, useEffect } from 'react';
import Homepage from './pages/home';
import Layout from './layout';
import { Toaster } from "@/components/ui/sonner"
import { databaseService } from './services/database.renderer.service';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', due_date: '' });

    useEffect(() => {
      databaseService.getTasks().then(setTasks);
    }, []);
  

  return (
    <>
      <Layout>
        <Homepage 
          {...{ tasks, setTasks, newTask, setNewTask }} 
        />
      </Layout>
      <Toaster />
    </>
  );
};

export default App;