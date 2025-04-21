import React from 'react';
import Homepage from './pages/home';
import Layout from './layout';
import { Toaster } from "@/components/ui/sonner"
import { TaskProvider } from './context/TaskContext';

const App = () => {
  return (
    <TaskProvider>
      <Layout>
        <Homepage />
      </Layout>
      <Toaster />
    </TaskProvider>
  );
};

export default App;