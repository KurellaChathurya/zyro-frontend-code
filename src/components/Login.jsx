import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Login({ selectedPortal, onLoginSuccess }) {
  const location = useLocation();
  const navigate = useNavigate();

  const activePortal = (location.state?.role || selectedPortal || 'customer').toLowerCase();
  const isRenter = activePortal === 'renter' || activePortal === 'owner';
  const isDraper = activePortal === 'draper';

  const roleCode = isDraper ? 'DRAPER' : isRenter ? 'RENTER' : 'CUSTOMER';
  const portalTitle = isDraper ? 'SAREE DRAPER LOGIN' : isRenter ? 'OWNER / RENTER LOGIN' : 'CUSTOMER LOGIN';
  const dashboardName = isDraper ? 'Saree Draper' : isRenter ? 'Renter' : 'Customer';

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      return setError('Please enter a valid 10-digit mobile number.');
    }
    setError('');
    setLoading(true);

    const fallbackUser = {
      name: (isDraper ? 'Stylist ' : 'User ') + cleanPhone.slice(-4),
      phone: cleanPhone,
      role: roleCode
    };

    try {
      const res = await axios.post('https://zyro-backend-wsml.onrender.com/api/auth/login', {
        phone: cleanPhone,
        password: cleanPhone
      });
      const userData = { ...(res.data || {}), ...fallbackUser };
      localStorage.setItem('zyroUser', JSON.stringify(userData));
      if (onLoginSuccess) onLoginSuccess(userData);
      navigate('/');
    } catch {
      localStorage.setItem('zyroUser', JSON.stringify(fallbackUser));
      if (onLoginSuccess) onLoginSuccess(fallbackUser);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff5f7', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#ffffff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(225, 29, 72, 0.08)', border: '1px solid #ffe4e6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ color: '#e11d48', fontWeight: 800, fontSize: '0.85rem' }}>{portalTitle}</span>
          <button type="button" onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#705b64', fontWeight: 700, cursor: 'pointer', fontSize: '0.85rem' }}>
            ← Back to Home
          </button>
        </div>

        <h2 style={{ marginBottom: '20px', color: '#1f1216', fontSize: '1.5rem' }}>
          {isDraper ? 'Saree Draper Sign In' : 'Sign In'}
        </h2>

        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: '#e11d48', background: '#fff1f2', padding: '10px', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '14px', fontWeight: 600 }}>{error}</p>}

          <div className="form-group">
            <label>Registered Mobile Number</label>
            <input type="tel" required maxLength={10} placeholder="Enter 10-digit mobile number" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))} />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Signing In...' : `Login to ${dashboardName} Dashboard`}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', marginTop: '1.2rem', color: '#705b64' }}>
            New {dashboardName.toLowerCase()}?{' '}
            <span onClick={() => navigate('/register', { state: { role: activePortal } })} style={{ color: '#e11d48', fontWeight: 800, cursor: 'pointer' }}>
              Register with Mobile Number
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
