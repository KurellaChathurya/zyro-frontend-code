import React from 'react';

function OwnerEarningsSummary({ listingsCount = 1, activeRentals = [] }) {
  const totalDeposits = activeRentals.reduce(
    (sum, ord) => sum + (Number(ord.securityDeposit) || 0),
    0
  );

  const cards = [
    {
      label: 'Total Earnings',
      value: '₹14,500',
      sub: 'This month payout',
      bg: '#fff1f2',
      border: '#fecdd3',
      color: '#e11d48'
    },
    {
      label: 'Active Rentals',
      value: `${activeRentals.length} Orders`,
      sub: `${listingsCount} outfits listed`,
      bg: '#fdf2f8',
      border: '#fbcfe8',
      color: '#be185d'
    },
    {
      label: 'Held Security Deposits',
      value: `₹${totalDeposits.toLocaleString('en-IN')}`,
      sub: 'Pending return inspection',
      bg: '#f0fdf4',
      border: '#bbf7d0',
      color: '#15803d'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '12px',
      marginBottom: '1.5rem'
    }}>
      {cards.map((c, idx) => (
        <div
          key={idx}
          style={{
            background: c.bg,
            border: `1.5px solid ${c.border}`,
            borderRadius: '16px',
            padding: '14px 16px'
          }}
        >
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#705b64' }}>
            {c.label}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: c.color, margin: '4px 0' }}>
            {c.value}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#4b5563' }}>
            {c.sub}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OwnerEarningsSummary;
