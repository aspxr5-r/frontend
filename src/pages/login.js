import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 3 || password.length < 6) {
      setError('Username must be at least 3 characters and password at least 6 characters');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const endpoint = isRegistering ? 'register' : 'login';
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'An error occurred');
      onLoginSuccess(data.user_id);
    } catch (error) {
      setError(error.message);
      console.error(isRegistering ? 'Registration error:' : 'Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>{isRegistering ? 'Register for WebCoach AI' : 'Login to WebCoach AI'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')}
        </button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)} disabled={isLoading}>
        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
    </div>
  );
}

export default LoginPage;