import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import * as assets from '../assets/assets';

// TODO: Backend Integration Comments:

// 1. Authentication API:
// - Replace hardcoded login with real backend authentication
// - Create API service in src/api/auth.js with login endpoint
// - Send credentials to POST /api/auth/login 
// - Expected response: { user: {...}, token: "jwt_token", refreshToken: "refresh_token" }

// 2. Error Handling:
// - Handle various authentication errors:
//   a) Invalid credentials (401)
//   b) Account locked (403)
//   c) Server errors (500)
//   d) Network issues
// - Display appropriate error messages to the user

// 3. Form Validation:
// - Add client-side validation for email format
// - Consider rate limiting login attempts on frontend

// 4. Token Storage:
// - Store JWT token securely (HttpOnly cookies preferred)
// - Save user data in AuthContext or global state
// - Implement token refresh mechanism

// 5. Remember Me Functionality:
// - Add a "Remember Me" checkbox if needed
// - Store persistent login state only if explicitly requested

// 6. Security Enhancements:
// - Consider implementing CAPTCHA for multiple failed attempts
// - Add loading state during authentication
// - Disable form submission while request is in progress

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'user@iitk.ac.in' && password === 'user123') {
      console.log('User login successful');
      if (onLogin) {
        onLogin(email);
      }
    }
    else if (email === 'admin@iitk.ac.in' && password === 'admin123') {
      console.log('Admin login successful');
      if (onLogin) {
        onLogin(email);
      }
    }
    else {
      alert('Invalid credentials. Please try again.');
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div 
          className="login-image-container"
          style={{ 
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${assets.assets.loginpageiitk})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* The background image is set via inline style now */}
        </div>
        
        <div className="login-form-container">
          <div className="login-header">
            <div className="logo-container">
              <img
                src={assets.assets.iitk_logo}
                alt="IIT Kanpur Logo"
                className="iit-logo"
              />
              <span>IIT Kanpur</span>
            </div>
          </div>
          
          <div className="login-form-content">
            <h2>Book lecture hall</h2>
            <h1>Sign In to LHB Portal</h1>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <div className="input-container">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@iitk.ac.in"
                    required
                  />
                  <span className="input-icon">📧</span>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    className="input-icon clickable"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>
              
              <button type="submit" className="sign-in-button">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;