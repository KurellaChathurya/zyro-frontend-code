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

// Combo Banner Wrapper
const OriginalAddon = SareeDrapingAddon;
function SareeDrapingAddonWithCombo(props) {
  return (
    <div>
      <div style={{ background: "linear-gradient(90deg, #fff1f2, #fdf2f8)", border: "1.5px dashed #e11d48", borderRadius: "12px", padding: "8px 12px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#be185d" }}>
          🎁 COMBO OFFER: Outfit + 🥻 Saree Draper
        </span>
        <span style={{ background: "#e11d48", color: "#fff", fontSize: "0.7rem", fontWeight: 900, padding: "2px 8px", borderRadius: "8px" }}>
          AUTO ₹100 OFF!
        </span>
      </div>
      <OriginalAddon {...props} />
    </div>
  );
}
export default SareeDrapingAddonWithCombo;
