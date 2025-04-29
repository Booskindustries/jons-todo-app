import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Taskpage from './pages/taskpage';
import Layout from './layout';
import { Toaster } from "@/components/ui/sonner"
import { TaskProvider } from './context/TaskContext';
import { Settings } from './pages/settings'; // Example additional page
import CalendarPage from './pages/calendarpage';
import NotesPage from './pages/notes';
import { AccountProvider } from './context/AccountContext';
import LoginPage from "./pages/loginpage";
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  return (
    <AccountProvider>
      <TaskProvider>
        <Router>
        <Layout>
          <Routes>
              <Route path="/" element={<ProtectedRoute><Taskpage /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
              <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
              <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Layout>
        <Toaster />
        </Router>
      </TaskProvider>
    </AccountProvider>
  );
};

export default App;