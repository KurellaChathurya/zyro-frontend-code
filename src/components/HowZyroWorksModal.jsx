import React from 'react';

function HowZyroWorksModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px', maxHeight: '88vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, color: '#be185d' }}>ℹ️ How Zyro Works — Hyperlocal P2P Ecosystem</h3>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 800 }}>✕</button>
        </div>

        <p style={{ fontSize: '0.84rem', color: '#4b5563', lineHeight: 1.5, marginBottom: '14px' }}>
          <strong>Zyro</strong> connects peer-to-peer luxury outfit rentals with verified hyperlocal saree drapers and two-way live outfit GPS tracking—giving complete peace of mind to both customers and dress owners.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '10px', marginBottom: '14px' }}>
          <div style={{ background: '#fff1f2', border: '1.5px solid #fecdd3', borderRadius: '14px', padding: '12px' }}>
            <div style={{ fontWeight: 900, color: '#e11d48', fontSize: '0.85rem' }}>1. Customer Portal</div>
            <p style={{ fontSize: '0.75rem', color: '#374151', margin: '4px 0 0' }}>Browse outfits, track live delivery GPS, & get ₹100 Combo OFF with draping.</p>
          </div>
          <div style={{ background: '#fdf2f8', border: '1.5px solid #fbcfe8', borderRadius: '14px', padding: '12px' }}>
            <div style={{ fontWeight: 900, color: '#be185d', fontSize: '0.85rem' }}>2. Owner / Renter</div>
            <p style={{ fontSize: '0.75rem', color: '#374151', margin: '4px 0 0' }}>Track outfit live during delivery & return pickup with escrow deposit safety.</p>
          </div>
          <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '14px', padding: '12px' }}>
            <div style={{ fontWeight: 900, color: '#15803d', fontSize: '0.85rem' }}>3. 🥻 Saree Draper</div>
            <p style={{ fontSize: '0.75rem', color: '#374151', margin: '4px 0 0' }}>Local stylists list slots, accept Muhurtham bookings, & receive direct UPI payouts.</p>
          </div>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', marginBottom: '14px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px' }}>⚙️ Full-Stack System Architecture</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['React.js + Vite (Vercel)', 'Java Spring Boot REST API (Render)', 'MySQL Relational DB', 'Two-Way Live GPS Tracking', 'Gemini AI Virtual Stylist'].map((tech) => (
              <span key={tech} style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '4px 9px', fontSize: '0.72rem', fontWeight: 700, color: '#334155' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn-primary" onClick={onClose}>Got It — Back to Live Demo</button>
        </div>
      </div>
    </div>
  );
}

export default HowZyroWorksModal;
