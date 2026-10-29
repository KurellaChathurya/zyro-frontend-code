import React from 'react';

function RoleSelect({ onSelectRole }) {
  return (
    <div style={{ maxWidth: '850px', margin: '3rem auto', textAlign: 'center', padding: '0 1rem' }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#db2777', background: '#fdf2f8', padding: '4px 14px', borderRadius: '20px', border: '1px solid #fce7f0' }}>
        WELCOME TO ZYRO COUTURE
      </span>
      <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1f161a', margin: '1rem 0 0.5rem' }}>
        Who are you joining as today?
      </h2>
      <p style={{ color: '#705b64', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
        Explore designer wardrobes, list your ethnic outfits, or offer professional saree draping services.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
        
        {/* Customer Card */}
        <div 
          onClick={() => onSelectRole('customer')}
          style={{ background: '#ffffff', border: '2px solid #fce7f0', borderRadius: '24px', padding: '2rem', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛍️</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1f161a', marginBottom: '6px' }}>I am a Customer</h3>
          <p style={{ fontSize: '0.85rem', color: '#705b64', lineHeight: '1.5', minHeight: '60px' }}>
            Access AI Stylist Studio, voice/photo search, pickup points, and verified security deposit refund protection.
          </p>
          <div style={{ marginTop: '1.5rem', fontWeight: 800, color: '#db2777', fontSize: '0.9rem' }}>
            Continue to Customer →
          </div>
        </div>

        {/* Renter Card */}
        <div 
          onClick={() => onSelectRole('renter')}
          style={{ background: '#ffffff', border: '2px solid #fce7f0', borderRadius: '24px', padding: '2rem', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👗</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1f161a', marginBottom: '6px' }}>I am an Owner / Renter</h3>
          <p style={{ fontSize: '0.85rem', color: '#705b64', lineHeight: '1.5', minHeight: '60px' }}>
            List your ethnic wear with pickup address, set occupied calendar dates, and inspect returned dresses safely.
          </p>
          <div style={{ marginTop: '1.5rem', fontWeight: 800, color: '#db2777', fontSize: '0.9rem' }}>
            Continue to Renter →
          </div>
        </div>

        {/* Saree Draper Partner Card */}
        <div 
          onClick={() => onSelectRole('draper')}
          style={{ background: '#ffffff', border: '2px solid #fce7f0', borderRadius: '24px', padding: '2rem', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧵</div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1f161a', marginBottom: '6px' }}>Saree Draper Partner</h3>
          <p style={{ fontSize: '0.85rem', color: '#705b64', lineHeight: '1.5', minHeight: '60px' }}>
            Showcase your draping styles portfolio, manage event bookings, and connect with customers.
          </p>
          <div style={{ marginTop: '1.5rem', fontWeight: 800, color: '#db2777', fontSize: '0.9rem' }}>
            Continue to Draper →
          </div>
        </div>

      </div>
    </div>
  );
}

export default RoleSelect;