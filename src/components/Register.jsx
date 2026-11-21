import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Register({ selectedPortal, onRegisterSuccess }) {
  const location = useLocation();
  const navigate = useNavigate();

  const activePortal = (location.state?.role || selectedPortal || 'customer').toLowerCase();
  const isRenter = activePortal === 'renter' || activePortal === 'owner';
  const isDraper = activePortal === 'draper';

  const roleCode = isDraper ? 'DRAPER' : isRenter ? 'RENTER' : 'CUSTOMER';
  const portalTitle = isDraper ? 'SAREE DRAPER ACCESS' : isRenter ? 'OWNER / RENTER ACCESS' : 'CUSTOMER PORTAL';
  const dashboardName = isDraper ? 'Saree Draper' : isRenter ? 'Renter' : 'Customer';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    specialty: 'Bridal & Silk Saree Draping',
    area: 'Hyderabad',
    role: roleCode
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      return setError('Please enter a valid 10-digit mobile number.');
    }
    setError('');
    setLoading(true);

    const payload = {
      name: formData.name,
      phone: cleanPhone,
      specialty: formData.specialty,
      area: formData.area,
      role: roleCode
    };

    try {
      const res = await axios.post('https://zyro-backend-wsml.onrender.com/api/auth/register', payload);
      const userData = { ...(res.data || {}), ...payload };
      localStorage.setItem('zyroUser', JSON.stringify(userData));
      alert(`🎉 ${dashboardName} Registration Successful!`);
      if (onRegisterSuccess) onRegisterSuccess(userData);
      navigate('/');
    } catch {
      localStorage.setItem('zyroUser', JSON.stringify(payload));
      if (onRegisterSuccess) onRegisterSuccess(payload);
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
          {isDraper ? 'Register as Saree Draper' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: '#e11d48', background: '#fff1f2', padding: '10px', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '14px', fontWeight: 600 }}>{error}</p>}

          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" required maxLength={10} placeholder="Enter 10-digit mobile number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })} />
          </div>

          {isDraper && (
            <div className="form-group">
              <label>Service Area / City</label>
              <input type="text" required placeholder="e.g. Banjara Hills, Madhapur, Amberpet" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} />
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Creating Account...' : `Register & Open ${dashboardName} Dashboard`}
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', marginTop: '1.2rem', color: '#705b64' }}>
            Already registered?{' '}
            <span onClick={() => navigate('/login', { state: { role: activePortal } })} style={{ color: '#e11d48', fontWeight: 800, cursor: 'pointer' }}>
              Login with Mobile Number
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
