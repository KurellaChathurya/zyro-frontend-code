import React from 'react';

function CatalogFilters({ selectedSize, setSelectedSize, maxBudget, setMaxBudget }) {
  const sizes = ['ALL', 'S', 'M', 'L', 'XL'];
  const budgets = [
    { label: 'Any Budget', value: 'ALL' },
    { label: 'Under ₹1,000', value: 1000 },
    { label: 'Under ₹2,500', value: 2500 }
  ];

  const pillStyle = (active) => ({
    padding: '5px 12px',
    borderRadius: '16px',
    border: '1.5px solid',
    borderColor: active ? '#e11d48' : '#fce7f0',
    background: active ? '#fff1f2' : '#ffffff',
    color: active ? '#e11d48' : '#4b5563',
    fontWeight: 700,
    fontSize: '0.76rem',
    cursor: 'pointer'
  });

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '14px',
      alignItems: 'center',
      marginBottom: '1.2rem',
      padding: '10px 14px',
      background: '#ffffff',
      borderRadius: '14px',
      border: '1px solid #fce7f0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#705b64' }}>Size:</span>
        {sizes.map((sz) => (
          <button
            key={sz}
            type="button"
            onClick={() => setSelectedSize(sz)}
            style={pillStyle(selectedSize === sz)}
          >
            {sz === 'ALL' ? 'All Sizes' : sz}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#705b64' }}>Budget:</span>
        {budgets.map((b) => (
          <button
            key={b.label}
            type="button"
            onClick={() => setMaxBudget(b.value)}
            style={pillStyle(maxBudget === b.value)}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CatalogFilters;
