import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Register({ selectedPortal, onRegisterSuccess }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Portal role ni URL state nundi leda props nundi teesukuntundi
  const activePortal = location.state?.role || selectedPortal || 'customer';
  const isRenter = activePortal.toLowerCase() === 'renter' || activePortal.toLowerCase() === 'owner';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    role: isRenter ? 'RENTER' : 'CUSTOMER'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.replace(/[^0-9]/g, '').length < 10) {
      return setError('Please enter a valid 10-digit mobile number.');
    }
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('https://zyro-backend-wsml.onrender.com/api/auth/register', {
        ...formData,
        role: isRenter ? 'RENTER' : 'CUSTOMER'
      });

      const userData = res.data || {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        role: isRenter ? 'RENTER' : 'CUSTOMER'
      };

      localStorage.setItem('zyroUser', JSON.stringify(userData));
      alert(`🎉 ${isRenter ? 'Owner / Renter' : 'Customer'} Registration Successful!`);

      if (onRegisterSuccess) {
        onRegisterSuccess(userData);
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Registration Error:', err);
      const backendError =
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response.data : null);

      setError(backendError || 'Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fff5f7',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#ffffff',
        padding: '30px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(225, 29, 72, 0.08)',
        border: '1px solid #ffe4e6'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ color: '#e11d48', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.5px' }}>
            {isRenter ? 'OWNER / RENTER ACCESS' : 'CUSTOMER PORTAL'}
          </span>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: '#705b64',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            ← Back to Home
          </button>
        </div>

        <h2 style={{ marginBottom: '20px', color: '#1f1216', fontSize: '1.5rem' }}>
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          {error && (
            <p style={{
              color: '#e11d48',
              background: '#fff1f2',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '0.82rem',
              marginBottom: '14px',
              fontWeight: 600
            }}>
              {error}
            </p>
          )}

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Mobile Number (Used for Login)</label>
            <input
              type="tel"
              required
              placeholder="Enter 10-digit mobile number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Email Address (Optional)</label>
            <input
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Create Password</label>
            <input
              type="password"
              required
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '10px' }}
            disabled={loading}
          >
            {loading
              ? 'Creating Account...'
              : `Register & Open ${isRenter ? 'Renter' : 'Customer'} Dashboard`}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', marginTop: '1.2rem', color: '#705b64' }}>
            Already registered?{' '}
            <span
              onClick={() => navigate('/login', { state: { role: activePortal } })}
              style={{ color: '#e11d48', fontWeight: 800, cursor: 'pointer' }}
            >
              Login with Mobile Number
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;