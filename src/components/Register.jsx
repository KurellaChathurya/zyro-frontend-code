import React, { useState } from 'react';

function Register({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // Render లైవ్ స్ప్రింగ్ బూట్ బ్యాకెండ్‌కి కనెక్ట్ చేస్తున్నాం
      const response = await fetch('https://zyro-backend-wsml.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Registration failed. Please check details or email already exists.');
      }

      const data = await response.json();
      console.log('Registered successfully:', data);

      setMessage('🎉 Registration successful! Redirecting to login...');
      setFormData({ name: '', email: '', password: '' });

      // సక్సెస్ అయిన 1 సెకనుకు ఆటోమేటిక్ గా లాగిన్ స్క్రీన్ కి తీసుకెళ్తుంది
      setTimeout(() => {
        onSwitchToLogin();
      }, 1000);

    } catch (err) {
      console.error('Registration Error:', err);
      setError(err.message || 'Registration failed. Server unreachable or waking up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '380px', margin: '30px auto', padding: '24px', background: '#ffffff', border: '1.5px solid #fce7f0', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#831843', textAlign: 'center', marginBottom: '8px' }}>Create Account</h2>
      <p style={{ textAlign: 'center', color: '#705b64', fontSize: '0.85rem', marginBottom: '16px' }}>Join Zyro Couture Rentals</p>
      
      {message && <p style={{ color: '#047857', background: '#ecfdf5', padding: '8px', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center' }}>{message}</p>}
      {error && <p style={{ color: '#b91c1c', background: '#fee2e2', padding: '8px', borderRadius: '8px', fontSize: '0.85rem', textAlign: 'center' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Full Name:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder="Enter your name"
            style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #fbcfe8', fontSize: '0.9rem', outline: 'none' }} 
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Email Address:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="name@example.com"
            style={{ width: '100%', padding: '10px', marginTop: '4px', borderRadius: '8px', border: '1px solid #fbcfe8', fontSize: '0.9rem', outline: 'none' }} 
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
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
          {loading ? 'Registering (waking up server...)' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '0.85rem', color: '#705b64' }}>
        Already have an account?{' '}
        <button 
          type="button"
          onClick={onSwitchToLogin} 
          style={{ background: 'none', border: 'none', color: '#db2777', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
        >
          Login here
        </button>
      </p>
    </div>
  );
}

export default Register;