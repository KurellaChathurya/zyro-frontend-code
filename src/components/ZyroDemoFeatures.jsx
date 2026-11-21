import React, { useState } from 'react';

export function HowZyroWorksModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px', maxHeight: '88vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, color: '#be185d' }}>ℹ️ How Zyro Works — Hyperlocal P2P Ecosystem</h3>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 800 }}>✕</button>
        </div>

        <p style={{ fontSize: '0.84rem', color: '#4b5563', lineHeight: 1.5, marginBottom: '14px' }}>
          <strong>Zyro</strong> connects peer-to-peer luxury outfit rentals with verified hyperlocal saree drapers in a single booking flow—solving both last-minute occasion wear and doorstep styling.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '10px', marginBottom: '14px' }}>
          <div style={{ background: '#fff1f2', border: '1.5px solid #fecdd3', borderRadius: '14px', padding: '12px' }}>
            <div style={{ fontWeight: 900, color: '#e11d48', fontSize: '0.85rem' }}>1. Customer Portal</div>
            <p style={{ fontSize: '0.75rem', color: '#374151', margin: '4px 0 0' }}>Browse verified outfits, try AI Virtual Stylist, & get ₹100 Combo OFF with draping.</p>
          </div>
          <div style={{ background: '#fdf2f8', border: '1.5px solid #fbcfe8', borderRadius: '14px', padding: '12px' }}>
            <div style={{ fontWeight: 900, color: '#be185d', fontSize: '0.85rem' }}>2. Owner / Renter</div>
            <p style={{ fontSize: '0.75rem', color: '#374151', margin: '4px 0 0' }}>Monetize wardrobe safely with escrow security deposit & return inspection.</p>
          </div>
          <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '14px', padding: '12px' }}>
            <div style={{ fontWeight: 900, color: '#15803d', fontSize: '0.85rem' }}>3. 🥻 Saree Draper</div>
            <p style={{ fontSize: '0.75rem', color: '#374151', margin: '4px 0 0' }}>Local stylists list slots, accept Muhurtham bookings, & receive direct UPI payouts.</p>
          </div>
        </div>

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '12px', marginBottom: '14px' }}>
          <div style={{ fontWeight: 800, fontSize: '0.8rem', color: '#1e293b', marginBottom: '6px' }}>⚙️ Full-Stack System Architecture</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['React.js + Vite (Vercel)', 'Java Spring Boot REST API (Render)', 'MySQL Relational DB', 'Gemini AI Virtual Stylist', 'UPI & Escrow Workflow'].map((tech) => (
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

export function LiveOrderTrackerBanner() {
  const [activeStep, setActiveStep] = useState(2);
  const steps = [
    { label: 'Confirmed', icon: '✔', sub: 'Escrow & Slot Locked' },
    { label: 'Dry-Cleaned & Packed', icon: '✨', sub: 'Steam Ironed & Quality Checked' },
    { label: 'Out for Delivery / Stylist Assigned', icon: '🥻', sub: 'Arriving before event slot' },
    { label: 'Returned', icon: '🔄', sub: 'Deposit Auto-Refunded' }
  ];

  return (
    <div style={{ background: '#ffffff', border: '1.5px solid #fce7f0', borderRadius: '18px', padding: '14px 16px', marginBottom: '1.2rem', boxShadow: '0 6px 18px rgba(225,29,72,0.04)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ background: '#fff1f2', color: '#e11d48', fontSize: '0.7rem', fontWeight: 800, padding: '3px 8px', borderRadius: '8px', marginRight: '8px' }}>
            LIVE TRACKER
          </span>
          <strong style={{ fontSize: '0.86rem', color: '#1f161a' }}>Active Order #ZYR-2026 (Kanjeevaram Silk + 🥻 Stylist Combo)</strong>
        </div>
        <button
          type="button"
          onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
          style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', color: '#be185d', fontSize: '0.72rem', fontWeight: 800, padding: '4px 10px', borderRadius: '10px', cursor: 'pointer' }}
        >
          Simulate Next Stage →
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
        {steps.map((s, idx) => {
          const done = idx <= activeStep;
          return (
            <div
              key={s.label}
              onClick={() => setActiveStep(idx)}
              style={{
                padding: '8px 10px',
                borderRadius: '12px',
                border: `1.5px solid ${done ? '#22c55e' : '#e5e7eb'}`,
                background: done ? '#f0fdf4' : '#f9fafb',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '0.76rem', fontWeight: 800, color: done ? '#15803d' : '#6b7280' }}>
                {done ? '✅' : '⏳'} {s.label}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#4b5563', marginTop: '2px' }}>{s.sub}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
