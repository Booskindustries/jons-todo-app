import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Taskpage from './pages/taskpage';
import Layout from './layout';
import { Toaster } from "@/components/ui/sonner"
import { TaskProvider } from './context/TaskContext';
import { Settings } from './pages/settings'; // Example additional page
import CalendarPage from './pages/calendarpage';
import NotesPage from './pages/notes';



const App = () => {
  return (
    <TaskProvider>
      <Router>
      <Layout>
        <Routes>
            <Route path="/" element={<Taskpage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </Layout>
      <Toaster />
      </Router>
    </TaskProvider>
  );
};

export default App;