import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Taskpage from "./pages/taskpage";
import Layout from "./layout";
import { Toaster } from "@/components/ui/sonner";
import { TaskProvider } from "./context/TaskContext";
import { Settings } from "./pages/settings";
import CalendarPage from "./pages/calendarpage";
import NotesPage from "./pages/notes";
import { AccountProvider, useIsLoggedIn } from "./context/AccountContext";
import LoginPage from "./pages/loginpage";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  const isLoggedIn = useIsLoggedIn(); // Check if the user is logged in

  return (
    <Routes>
      {/* Login Page */}
      <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" replace />} />

      {/* Protected Routes */}
      {isLoggedIn ? (
        <>
          <Route path="/" element={<ProtectedRoute><Taskpage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <AccountProvider>
      <TaskProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
          <Toaster />
        </Router>
      </TaskProvider>
    </AccountProvider>
  );
};

export default App;