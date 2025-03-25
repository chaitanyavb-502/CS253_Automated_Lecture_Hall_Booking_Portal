import React, { useState } from 'react';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import LiveSchedule from './pages/LiveSchedule';
import Feedback from './pages/feedback';
import Request_booking from './pages/request_booking';
import Help from './pages/help';
import Status from './pages/Status';
import UserHistory from './pages/UserHistory';
import CreateUser from './pages/CreateUser';
import Adminviewbooking from './pages/Adminviewbooking';

// Import navbar components
import UserNavbar from './components/UserNavbar';
import AdminNavbar from './components/AdminNavbar';
import Header from './components/Header';
// import AdminviewBooking from './pages/Adminviewbooking';

// TODO: Backend Integration Comments:

// 1. Authentication State Management:
// - Replace local state with JWT token-based authentication
// - Create an AuthContext using React Context API in src/contexts/AuthContext.jsx
// - Store authentication tokens in secure HttpOnly cookies or localStorage (less secure)

// 2. API Integration Points:
// - Create src/api/auth.js for authentication API calls
// - Add login, logout, and token refresh functions
// - Implement an axios interceptor to:
//   a) Add authentication headers to all requests
//   b) Handle 401 errors and refresh tokens or redirect to login

// 3. Protected Routes:
// - Enhance the route protection to verify token validity
// - Implement role-based access control for admin vs regular users
// - Add API call to validate user session on app initialization

// 4. User Details:
// - Fetch complete user profile from backend after login
// - Store user details (name, email, role, permissions) in AuthContext

// 5. Logout Functionality:
// - Clear tokens from storage
// - Call backend API to invalidate the token on server
// - Redirect to login page

const App = () => {
  const [userRole, setUserRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Show navbar only if logged in and not on login page
  const showNavbar = isLoggedIn && location.pathname !== '/login';
  
  // Function to handle login
  const handleLogin = (email) => {
    // Set user role based on email or any other logic
    const role = email.includes('admin') ? 'admin' : 'user';
    setUserRole(role);
    setIsLoggedIn(true);
    // Navigate to the request_booking page after successful login
    navigate('/request_booking');
  };
  
  // Function for navigation
  const handleNavigation = (path) => {
    navigate(path);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Header />}
      
      <div className="flex flex-grow">
        {showNavbar && (
          userRole === 'admin'
            ? <AdminNavbar onNavigate={handleNavigation} currentPath={location.pathname} />
            : <UserNavbar onNavigate={handleNavigation} currentPath={location.pathname} />
        )}
        
        <div className={`flex-grow ${showNavbar ? 'p-4 bg-gray-50' : ''}`}>
          <Routes>
            {/* Redirect root to login if not logged in */}
            <Route path="/" element={
              isLoggedIn ? <Navigate to="/request_booking" /> : <Navigate to="/login" />
            } />
            
            {/* Login route */}
            <Route path="/login" element={
              isLoggedIn ? <Navigate to="/request_booking" /> : <Login onLogin={handleLogin} />
            } />
            
            {/* Protected routes */}
            <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            <Route path="/history" element={isLoggedIn ? <UserHistory /> : <Navigate to="/login" />} />
            <Route path="/live_schedule" element={isLoggedIn ? <LiveSchedule /> : <Navigate to="/login" />} />
            <Route path="/feedback" element={isLoggedIn ? <Feedback /> : <Navigate to="/login" />} />
            <Route path="/request_booking" element={isLoggedIn ? <Request_booking /> : <Navigate to="/login" />} />
            <Route path="/help" element={isLoggedIn ? <Help /> : <Navigate to="/login" />} />
            <Route path="/status" element={isLoggedIn ? <Status /> : <Navigate to="/login" />} />
            <Route path="/create_user" element={isLoggedIn ? <CreateUser /> : <Navigate to="/login" />} />
            <Route path="/admin_view_booking" element={isLoggedIn ? <Adminviewbooking /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;