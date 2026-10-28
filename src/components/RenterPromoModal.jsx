import React, { useState } from 'react';

function RenterPromoModal({ isOpen, onClose, onUpgrade }) {
  // Step 1: 'promo' (Ad view), Step 2: 'setup' (Closet Details)
  const [step, setStep] = useState('promo');
  const [closetData, setClosetData] = useState({
    closetName: '',
    city: 'Hyderabad',
    pickupAddress: '',
    upiId: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('promo');
    onClose();
  };

  const handleSetupSubmit = (e) => {
    e.preventDefault();
    if (!closetData.closetName.trim() || !closetData.pickupAddress.trim()) {
      return alert("Please fill in your Closet Name and Pickup Address!");
    }
    onUpgrade(closetData);
    setStep('promo');
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '540px', padding: '2rem' }}
      >
        {step === 'promo' ? (
          /* ================== STEP 1: PROMOTIONAL ADVERTISEMENT ================== */
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.4rem' }}>👗✨💰</div>
            
            <span style={{ 
              background: '#fff0f6', 
              color: '#db2777', 
              padding: '4px 14px', 
              border: '1px solid #fbcfe8',
              borderRadius: '20px', 
              fontSize: '0.8rem', 
              fontWeight: 800 
            }}>
              EXCLUSIVE CLOSET PARTNER PROGRAM
            </span>

            <h2 style={{ color: '#be185d', fontSize: '1.6rem', marginTop: '0.8rem', lineHeight: '1.3' }}>
              Earn ₹15,000 - ₹30,000/Month from Your Wardrobe!
            </h2>

            <p style={{ color: '#705b64', fontSize: '0.9rem', marginTop: '6px', lineHeight: '1.5' }}>
              Pelli lehengas, silk sarees, heavy designer gowns alage wardrobe lo unchi waste cheyoddu... 
              Zyro lo verified Renter ga maarandi, intlo kurchune regular ga earn cheyyandi!
            </p>

            {/* Benefits */}
            <div style={{ 
              background: '#fffafb', 
              border: '1.5px solid #fce7f0', 
              borderRadius: '16px', 
              padding: '1.1rem', 
              margin: '1.2rem 0', 
              textAlign: 'left' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '0.85rem' }}>
                <span>🛡️</span>
                <span><strong>Zero Risk:</strong> 100% Refundable Security Deposit protection for every rental item.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', fontSize: '0.85rem' }}>
                <span>🚚</span>
                <span><strong>Doorstep Pickup & Return:</strong> Zyro delivery team handles pickup & delivery directly.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
                <span>🧼</span>
                <span><strong>Free Professional Sanitization:</strong> Free dry-cleaning after every single booking.</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                className="btn-primary"
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem', fontWeight: 800 }}
                onClick={() => setStep('setup')}
              >
                🚀 Join as Closet Partner (1-Min Quick Setup)
              </button>

              <button 
                type="button"
                className="btn-secondary" 
                style={{ width: '100%', padding: '0.7rem' }} 
                onClick={handleClose}
              >
                Maybe Later, Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* ================== STEP 2: QUICK CLOSET ONBOARDING FORM ================== */
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <button 
                type="button" 
                className="btn-secondary" 
                style={{ padding: '3px 10px', fontSize: '0.8rem' }}
                onClick={() => setStep('promo')}
              >
                ← Back
              </button>
              <h3 style={{ margin: 0, color: '#be185d', fontSize: '1.2rem' }}>Setup Your Closet</h3>
              <span style={{ width: '30px' }}></span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#705b64', marginBottom: '1.2rem' }}>
              Fill in your boutique details to activate payout processing and receive doorstep pickups:
            </p>

            <form onSubmit={handleSetupSubmit}>
              <div className="form-group">
                <label>Closet / Boutique Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Heritage Wardrobe"
                  value={closetData.closetName}
                  onChange={(e) => setClosetData({ ...closetData, closetName: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hyderabad"
                    value={closetData.city}
                    onChange={(e) => setClosetData({ ...closetData, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={closetData.phone}
                    onChange={(e) => setClosetData({ ...closetData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Pickup Door / Flat Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 302, Sri Sai Residency, Madhapur"
                  value={closetData.pickupAddress}
                  onChange={(e) => setClosetData({ ...closetData, pickupAddress: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>UPI ID (For Instant Rental Payouts)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. yourname@oksbi / 9848012345@paytm"
                  value={closetData.upiId}
                  onChange={(e) => setClosetData({ ...closetData, upiId: e.target.value })}
                />
              </div>

              <div style={{ marginTop: '1.2rem', display: 'flex', gap: '8px' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 2, padding: '0.85rem' }}>
                  🎉 Activate & Go to Renter Hub
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default RenterPromoModal;