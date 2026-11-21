import React from 'react';

function SareeDrapingAddon({ includeDraping, setIncludeDraping }) {
  return (
    <div style={{
      background: includeDraping ? '#fdf2f8' : '#ffffff',
      border: `1.5px solid ${includeDraping ? '#e11d48' : '#fce7f0'}`,
      borderRadius: '12px',
      padding: '10px 12px',
      marginBottom: '12px',
      transition: 'all 0.2s'
    }}>
      <label style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        cursor: 'pointer',
        margin: 0
      }}>
        <input
          type="checkbox"
          checked={includeDraping}
          onChange={(e) => setIncludeDraping(e.target.checked)}
          style={{ marginTop: '3px', accentColor: '#e11d48' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#831843' }}>
              ✨ Add Professional Saree Draping Service
            </span>
            <span style={{ fontWeight: 900, fontSize: '0.82rem', color: '#e11d48' }}>
              +₹399
            </span>
          </div>
          <p style={{ margin: '3px 0 0', fontSize: '0.72rem', color: '#705b64' }}>
            Verified local stylist visits your location for pre-pleating & event-ready draping.
          </p>
        </div>
      </label>
    </div>
  );
}

export default SareeDrapingAddon;
