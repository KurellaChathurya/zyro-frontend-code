import React, { useState } from 'react';

function LiveOutfitGpsTracker({ defaultDirection = 'DELIVERY', portalLabel = 'Customer' }) {
  const [tripDirection, setTripDirection] = useState(defaultDirection);
  const [checkpointIdx, setCheckpointIdx] = useState(1);

  const deliveryRoute = [
    { spot: 'Renter Studio (Banjara Hills Rd 10)', time: '10:15 AM', status: 'Dispatched by Owner' },
    { spot: 'Crossed Panjagutta & Begumpet Flyover', time: '10:32 AM', status: 'In Transit (Live GPS)' },
    { spot: 'Arriving at Customer (Amberpet Main Rd)', time: 'ETA 8 mins', status: 'Reaching Destination' }
  ];

  const returnRoute = [
    { spot: 'Customer Pickup (Amberpet Main Rd)', time: '06:10 PM', status: 'Handed Over for Return' },
    { spot: 'Crossed Himayatnagar & Lakdikapul', time: '06:28 PM', status: 'Returning to Owner (Live GPS)' },
    { spot: 'Delivered to Renter (Banjara Hills Rd 10)', time: 'ETA 10 mins', status: 'Deposit Auto-Refund Ready' }
  ];

  const activeRoute = tripDirection === 'DELIVERY' ? deliveryRoute : returnRoute;
  const currentPin = activeRoute[checkpointIdx];

  const handleMapsPreview = () => {
    const query = encodeURIComponent(currentPin.spot + ', Hyderabad');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div style={{ background: '#ffffff', border: '1.5px solid #fce7f0', borderRadius: '18px', padding: '14px 16px', marginBottom: '1.2rem', boxShadow: '0 6px 18px rgba(225,29,72,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.7rem', fontWeight: 900, padding: '3px 9px', borderRadius: '8px' }}>
            ● LIVE OUTFIT GPS
          </span>
          <strong style={{ fontSize: '0.88rem', color: '#1f161a' }}>
            Order #ZYR-2026 • Kanjeevaram Bridal Silk ({portalLabel} Live Tracking)
          </strong>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => { setTripDirection('DELIVERY'); setCheckpointIdx(1); }}
            style={{
              padding: '5px 10px',
              borderRadius: '10px',
              border: '1.5px solid',
              borderColor: tripDirection === 'DELIVERY' ? '#e11d48' : '#e5e7eb',
              background: tripDirection === 'DELIVERY' ? '#fff1f2' : '#fff',
              color: tripDirection === 'DELIVERY' ? '#e11d48' : '#4b5563',
              fontSize: '0.73rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            🚚 Delivery to Customer
          </button>
          <button
            type="button"
            onClick={() => { setTripDirection('RETURN'); setCheckpointIdx(1); }}
            style={{
              padding: '5px 10px',
              borderRadius: '10px',
              border: '1.5px solid',
              borderColor: tripDirection === 'RETURN' ? '#be185d' : '#e5e7eb',
              background: tripDirection === 'RETURN' ? '#fdf2f8' : '#fff',
              color: tripDirection === 'RETURN' ? '#be185d' : '#4b5563',
              fontSize: '0.73rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            🔄 Return to Renter
          </button>
        </div>
      </div>

      <div style={{
        background: tripDirection === 'DELIVERY' ? '#fff5f7' : '#fdf2f8',
        border: '1px solid #fbcfe8',
        borderRadius: '12px',
        padding: '10px 12px',
        marginBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#be185d' }}>
            {tripDirection === 'DELIVERY'
              ? '📍 Live Location (Visible to Customer & Renter):'
              : '📍 Return Tracking (Visible to Renter & Customer):'}
          </div>
          <div style={{ fontSize: '0.86rem', fontWeight: 900, color: '#1f161a', marginTop: '2px' }}>
            {currentPin.spot} <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803d' }}>({currentPin.status} • {currentPin.time})</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setCheckpointIdx((prev) => (prev + 1) % activeRoute.length)}
            style={{ background: '#ffffff', border: '1px solid #fbcfe8', color: '#be185d', fontSize: '0.72rem', fontWeight: 800, padding: '5px 10px', borderRadius: '9px', cursor: 'pointer' }}
          >
            Refresh GPS Pin ↻
          </button>
          <button
            type="button"
            onClick={handleMapsPreview}
            style={{ background: '#e11d48', border: 'none', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, padding: '5px 10px', borderRadius: '9px', cursor: 'pointer' }}
          >
            🗺️ View on Map
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '8px' }}>
        {activeRoute.map((pt, idx) => {
          const isCurrent = idx === checkpointIdx;
          const isPassed = idx < checkpointIdx;
          return (
            <div
              key={pt.spot}
              onClick={() => setCheckpointIdx(idx)}
              style={{
                padding: '8px 10px',
                borderRadius: '11px',
                border: `1.5px solid ${isCurrent ? '#e11d48' : isPassed ? '#22c55e' : '#e5e7eb'}`,
                background: isCurrent ? '#fff1f2' : isPassed ? '#f0fdf4' : '#f9fafb',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '0.73rem', fontWeight: 800, color: isCurrent ? '#e11d48' : isPassed ? '#15803d' : '#6b7280' }}>
                {isCurrent ? '📍 LIVE HERE' : isPassed ? '✅ PASSED' : '⏳ UPCOMING'} • {pt.time}
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1f2937', marginTop: '2px' }}>{pt.spot}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LiveOutfitGpsTracker;
