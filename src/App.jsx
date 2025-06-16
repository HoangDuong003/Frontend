import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Layout from './components/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import EmployeeList from './pages/employee/EmployeeList';
import Login from './pages/auth/Login';
import PrivateRoute from './components/common/PrivateRoute';
import Calendar from './features/calendar/Calendar';
import Home from './pages/Home';
import UrVN from './pages/UrVN';
import UrCor from './pages/UrCor';
import RoleManagement from './pages/admin/RoleManagement.jsx';
import CompanyManagement from './pages/admin/CompanyManagement.jsx';
import JobTypeManagement from './pages/admin/JobTypeManagement.jsx';
import Sidebar from './components/layout/Sidebar';
import Profile from './pages/employee/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import AdminScheduleTable from './features/calendar/AdminScheduleTable';
import Register from './pages/auth/Register';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isLoggedIn = !!localStorage.getItem('token');
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const isAdmin = currentUser && currentUser.role === 'Admin';

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
      {isLoggedIn && isAdmin && <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />}
      {isLoggedIn && isAdmin && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 52,
            left: 0,
            width: '100vw',
            height: 'calc(100vh - 52px)',
            background: 'rgba(0,0,0,0.05)',
            zIndex: 899,
          }}
        />
      )}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <Header />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<UrVN />} />
            <Route path="/corporation" element={<UrCor />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/employees" element={
              <ProtectedRoute allowRoles={['Admin']}>
                <EmployeeList />
              </ProtectedRoute>
            } />
            {/* <Route path="/admin/employees" element={
              <ProtectedRoute allowRoles={['Admin']}>
                <EmployeeManagement />
              </ProtectedRoute>
            } /> */}
            <Route path="/admin/roles" element={
              <ProtectedRoute allowRoles={['Admin']}>
                <RoleManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/companies" element={
              <ProtectedRoute allowRoles={['Admin']}>
                <CompanyManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/job-types" element={
              <ProtectedRoute allowRoles={['Admin']}>
                <JobTypeManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/schedule" element={
              <ProtectedRoute allowRoles={['Admin']}>
                <AdminScheduleTable />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App; 