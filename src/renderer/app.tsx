import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/home';
import Layout from './layout';
import { Toaster } from "@/components/ui/sonner"
import { TaskProvider } from './context/TaskContext';
import { Settings } from './pages/settings'; // Example additional page
import CalendarPage from './pages/calendar';



const App = () => {
  return (
    <TaskProvider>
      <Router>
      <Layout>
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Layout>
      <Toaster />
      </Router>
    </TaskProvider>
  );
};

export default App;