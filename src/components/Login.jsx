import React, { useState } from 'react';

function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Direct call to your working Spring Boot API
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Invalid email or password. Please try again!');
      }

      const data = await response.json();
      console.log('Login successful:', data);

      // Spring Boot returns: { name, message, userId, email }
      if (data && (data.userId || data.id || data.email)) {
        onLoginSuccess({
          id: data.userId || data.id,
          name: data.name || 'User',
          email: data.email
        });
      } else {
        throw new Error('Invalid response received from server.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed! Server unreachable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '380px', margin: '30px auto', padding: '24px', background: '#ffffff', border: '1.5px solid #fce7f0', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#831843', textAlign: 'center', marginBottom: '8px' }}>Welcome Back</h2>
      <p style={{ textAlign: 'center', color: '#705b64', fontSize: '0.85rem', marginBottom: '16px' }}>Login to Zyro Couture Rentals</p>

      {error && (
        <p style={{ color: '#b91c1c', background: '#fee2e2', padding: '8px', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Email Address:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
            placeholder="test1@zyro.com"
            style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #fbcfe8', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #fbcfe8', fontSize: '0.9rem', outline: 'none' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: '12px', background: '#db2777', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', fontSize: '0.95rem' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.85rem', color: '#705b64' }}>
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          style={{ background: 'none', border: 'none', color: '#db2777', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
        >
          Register here
        </button>
      </p>
    </div>
  );
}

export default Login;