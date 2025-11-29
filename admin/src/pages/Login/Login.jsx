import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/api/user/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password }),
});

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.role === 'admin') {
          localStorage.setItem('adminToken', data.token);
          navigate('/add');
        } else {
          setError('Access Denied: Not an Admin');
        }
      } else {
        setError(data.message || 'Invalid Credentials');
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
