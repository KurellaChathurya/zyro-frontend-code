import React, { useState } from 'react';

function ProductDetails({ product, onBack, onAddToCart }) {
  const handleBooking = () => {
    if (includeDraper) {
      const newBooking = {
        id: 'DRP-' + Math.floor(100 + Math.random() * 900),
        customerName: 'Kurella Chathurya',
        serviceType: 'Bridal Saree Pre-pleating & Draping',
        eventDate: '25 Nov 2026',
        timeSlot: '10:00 AM - 12:00 PM',
        venue: 'Hyderabad',
        status: 'Pending Acceptance'
      };
      const existingBookings = JSON.parse(localStorage.getItem('draperBookings') || '[]');
      localStorage.setItem('draperBookings', JSON.stringify([newBooking, ...existingBookings]));
    }
    alert(`🎉 Outfit booked successfully! ${includeDraper ? 'Saree Draper (₹800) added to your booking.' : ''}`);
  };

  const [includeDraper, setIncludeDraper] = useState(false);
  const draperFee = 800;
  
  const basePrice = product ? product.price : 1500;
  const totalPrice = includeDraper ? basePrice + draperFee : basePrice;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', background: '#ffffff', borderRadius: '24px', border: '2px solid #fce7f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#db2777', fontWeight: 700, cursor: 'pointer', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        ← Back to Catalog
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {/* Product Image */}
        <div>
          <img 
            src={product?.image || 'https://images.unsplash.com/icon'} 
            alt="Product" 
            style={{ width: '100%', height: '350px', objectFit: 'cover', borderRadius: '16px', border: '1px solid #fce7f0' }} 
          />
        </div>

        {/* Product Info & Saree Draper Add-on */}
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#fdf2f8', color: '#db2777', padding: '4px 10px', borderRadius: '8px' }}>
            Verified Designer Wear
          </span>
          <h2 style={{ color: '#1f161a', margin: '10px 0', fontSize: '1.8rem' }}>{product?.name || 'Designer Silk Saree'}</h2>
          <p style={{ color: '#705b64', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem' }}>₹{basePrice} / rental</p>
          
          <p style={{ color: '#705b64', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Exquisite traditional wear featuring rich pallu and intricate zari work. Perfect for weddings and grand celebrations in Hyderabad.
          </p>

          {/* Saree Draper Partner Add-on Section */}
          <div style={{ background: '#fdf2f8', border: '1.5px solid #fbcfe8', borderRadius: '16px', padding: '1.2rem', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={includeDraper} 
                onChange={(e) => setIncludeDraper(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: '#db2777', marginTop: '2px' }}
              />
              <div>
                <strong style={{ color: '#831843', fontSize: '0.95rem', display: 'block' }}>🧵 Add Professional Saree Draper (+₹800)</strong>
                <span style={{ fontSize: '0.8rem', color: '#705b64' }}>Get expert doorstep draping & pre-pleating service at your venue in Hyderabad.</span>
              </div>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #fce7f0', paddingTop: '1.2rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#705b64', display: 'block' }}>Total Amount</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#831843' }}>₹{totalPrice}</span>
            </div>
            <button 
              onClick={handleBooking} //`🎉 Outfit booked successfully with Draper Add-on: ₹${totalPrice}!`)}
              style={{ background: '#db2777', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;