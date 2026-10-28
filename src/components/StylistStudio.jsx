import React, { useState, useRef } from 'react';

function StylistStudio({ onBookCuratedLook, onBackToShop }) {
  // Input Form States
  const [inputs, setInputs] = useState({
    eventType: 'Wedding Reception',
    skinTone: 'Wheatish / Warm Undertone',
    bodyFit: 'Hourglass / Structured',
    budgetRange: 5000,
    colorPref: 'Royal Velvet Maroon & Antique Gold'
  });

  // Photo Upload / Camera States
  const [userPhoto, setUserPhoto] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Generated Lookboard State
  const [curatedLook, setCuratedLook] = useState(null);

  // Selected Checklist for Dynamic Price
  const [selectedItems, setSelectedItems] = useState({
    outfit: true,
    jewellery: true,
    accessory: true
  });

  // Camera Handlers
  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera access denied or unavailable.");
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setUserPhoto(dataUrl);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Generate Look Logic
  const handleGenerateLook = () => {
    // Dynamic look generation based on preferences
    setCuratedLook({
      theme: `${inputs.eventType} Exclusive Heritage Look`,
      outfit: {
        title: `Handcrafted ${inputs.colorPref} Lehenga Set`,
        price: 2800,
        deposit: 4000,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60'
      },
      jewellery: {
        title: 'Polki Kundan Choker, Earrings & Maang Tikka Set',
        price: 1200,
        deposit: 1500,
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60'
      },
      accessory: {
        title: 'Hand-embroidered Velvet Potli & Embellished Juttis',
        price: 600,
        deposit: 500,
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&fit=crop&q=60'
      },
      hairRecommendation: 'Textured Soft Braided Bun with Fresh Jasmine Flowers or Soft Hollywood Curls',
      stylingTip: `Tailored for ${inputs.skinTone} and ${inputs.bodyFit}. Rich contrast photography lighting lo ee combination royal ga kanipistundi.`
    });
  };

  // Checkbox toggle handler
  const toggleItem = (key) => {
    setSelectedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Live Price Calculation
  const calculateTotal = () => {
    if (!curatedLook) return { rent: 0, deposit: 0, total: 0 };
    let rent = 0;
    let deposit = 0;

    if (selectedItems.outfit) {
      rent += curatedLook.outfit.price;
      deposit += curatedLook.outfit.deposit;
    }
    if (selectedItems.jewellery) {
      rent += curatedLook.jewellery.price;
      deposit += curatedLook.jewellery.deposit;
    }
    if (selectedItems.accessory) {
      rent += curatedLook.accessory.price;
      deposit += curatedLook.accessory.deposit;
    }

    return { rent, deposit, total: rent + deposit };
  };

  const totals = calculateTotal();

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#db2777', background: '#fdf2f8', padding: '4px 12px', borderRadius: '12px' }}>
            AI COUTURE LAB
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#1f161a', margin: '0.5rem 0 0.2rem' }}>
            ✨ AI Virtual Stylist Studio
          </h2>
          <p style={{ color: '#705b64', fontSize: '0.9rem', margin: 0 }}>
            Personalized ethnic ensembles matching your event, body fit, complexion & budget.
          </p>
        </div>
        <button className="btn-secondary" onClick={onBackToShop} style={{ fontWeight: 700 }}>
          ← Back to Catalog
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Left Column: Form & Photo Inputs */}
        <div style={{ background: '#ffffff', border: '1.5px solid #fce7f0', borderRadius: '24px', padding: '1.8rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#831843', marginBottom: '1rem' }}>
            1. Your Styling Profile
          </h3>

          {/* Photo Snap or Upload */}
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#705b64', display: 'block', marginBottom: '6px' }}>
              Your Photo (For Skin Tone & Fit Match)
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }} onClick={startCamera}>
                📷 Camera Snap
              </button>
              <label className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem', textAlign: 'center', cursor: 'pointer' }}>
                📁 Upload
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setUserPhoto(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            {isCameraActive && (
              <div style={{ marginTop: '10px', background: '#fff5f8', padding: '10px', borderRadius: '12px', textAlign: 'center' }}>
                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
                  <button type="button" className="btn-primary" onClick={capturePhoto}>📸 Snap</button>
                  <button type="button" className="btn-secondary" onClick={stopCamera}>Cancel</button>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {userPhoto && (
              <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '12px', background: '#fdf2f8', padding: '8px 12px', borderRadius: '12px' }}>
                <img src={userPhoto} alt="User Preview" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }} />
                <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 700 }}>Photo attached successfully!</span>
                <button type="button" onClick={() => setUserPhoto(null)} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: '#b91c1c', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
              </div>
            )}
          </div>

          {/* Event Selector */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#705b64' }}>Event Type</label>
            <select
              style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1.5px solid #fce7f0', marginTop: '4px', fontSize: '0.85rem' }}
              value={inputs.eventType}
              onChange={(e) => setInputs({ ...inputs, eventType: e.target.value })}
            >
              <option>Wedding Reception</option>
              <option>Sangeet Night / Dance</option>
              <option>Haldi / Mehendi Ceremony</option>
              <option>Engagement / Ring Ceremony</option>
              <option>Festive Celebration (Diwali / Dussehra)</option>
            </select>
          </div>

          {/* Skin Complexion */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#705b64' }}>Skin Complexion & Undertone</label>
            <select
              style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1.5px solid #fce7f0', marginTop: '4px', fontSize: '0.85rem' }}
              value={inputs.skinTone}
              onChange={(e) => setInputs({ ...inputs, skinTone: e.target.value })}
            >
              <option>Fair / Cool Rosy Undertone</option>
              <option>Wheatish / Warm Golden Undertone</option>
              <option>Dusky / Deep Radiant Undertone</option>
            </select>
          </div>

          {/* Body Fit */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#705b64' }}>Body Fit Preference</label>
            <select
              style={{ width: '100%', padding: '10px', borderRadius: '12px', border: '1.5px solid #fce7f0', marginTop: '4px', fontSize: '0.85rem' }}
              value={inputs.bodyFit}
              onChange={(e) => setInputs({ ...inputs, bodyFit: e.target.value })}
            >
              <option>Hourglass / Structured Silhouette</option>
              <option>Flared / Flowing A-Line</option>
              <option>Slim Fit / Contemporary Cut</option>
              <option>Classic Straight Cut</option>
            </select>
          </div>

          {/* Budget Range */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800 }}>
              <span style={{ color: '#705b64' }}>Max Daily Rental Budget</span>
              <span style={{ color: '#db2777' }}>₹{inputs.budgetRange}</span>
            </div>
            <input
              type="range"
              min="1500"
              max="15000"
              step="500"
              value={inputs.budgetRange}
              onChange={(e) => setInputs({ ...inputs, budgetRange: Number(e.target.value) })}
              style={{ width: '100%', marginTop: '6px', accentColor: '#db2777' }}
            />
          </div>

          <button className="btn-primary" style={{ width: '100%', padding: '12px' }} onClick={handleGenerateLook}>
            ✨ Generate Complete Lookboard
          </button>
        </div>

        {/* Right Column: Curated Lookboard & Custom Look Builder */}
        <div>
          {!curatedLook ? (
            <div style={{ background: '#fff', border: '2px dashed #fce7f0', borderRadius: '24px', padding: '3rem 2rem', textAlign: 'center', color: '#9ca3af' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👗✨</div>
              <h4 style={{ color: '#705b64', margin: '0 0 6px' }}>Your Personalized Lookboard Awaits</h4>
              <p style={{ fontSize: '0.85rem', margin: 0 }}>
                Fill your details on the left and click Generate to see curated designer outfits, matching jewellery, and live price breakdown.
              </p>
            </div>
          ) : (
            <div style={{ background: '#ffffff', border: '1.5px solid #fce7f0', borderRadius: '24px', padding: '1.8rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ borderBottom: '1px solid #fce7f0', paddingBottom: '10px', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#047857', background: '#ecfdf5', padding: '3px 8px', borderRadius: '8px' }}>
                  AI MATCH COMPLETED
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#1f161a', margin: '6px 0 2px' }}>
                  {curatedLook.theme}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: 0 }}>{curatedLook.stylingTip}</p>
              </div>

              {/* Hairstyle Tip Box */}
              <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '12px', padding: '10px 14px', marginBottom: '1.2rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#be185d' }}>💇 Suggested Hairstyle & Makeup:</span>
                <p style={{ fontSize: '0.85rem', color: '#1f161a', margin: '2px 0 0', fontWeight: 600 }}>{curatedLook.hairRecommendation}</p>
              </div>

              {/* Look Builder Checklist */}
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1f161a', marginBottom: '10px' }}>
                Customize Your Rental Set:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
                {/* 1. Outfit Item */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: selectedItems.outfit ? '#fff9fb' : '#f9fafb', border: '1px solid', borderColor: selectedItems.outfit ? '#fce7f0' : '#e5e7eb', borderRadius: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={selectedItems.outfit}
                      onChange={() => toggleItem('outfit')}
                      style={{ width: '18px', height: '18px', accentColor: '#db2777', cursor: 'pointer' }}
                    />
                    <img src={curatedLook.outfit.image} alt="Outfit" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>👗 {curatedLook.outfit.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Deposit: ₹{curatedLook.outfit.deposit}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#db2777' }}>₹{curatedLook.outfit.price}/day</div>
                </div>

                {/* 2. Jewellery Item */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: selectedItems.jewellery ? '#fff9fb' : '#f9fafb', border: '1px solid', borderColor: selectedItems.jewellery ? '#fce7f0' : '#e5e7eb', borderRadius: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={selectedItems.jewellery}
                      onChange={() => toggleItem('jewellery')}
                      style={{ width: '18px', height: '18px', accentColor: '#db2777', cursor: 'pointer' }}
                    />
                    <img src={curatedLook.jewellery.image} alt="Jewellery" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>💎 {curatedLook.jewellery.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Deposit: ₹{curatedLook.jewellery.deposit}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#db2777' }}>₹{curatedLook.jewellery.price}/day</div>
                </div>

                {/* 3. Accessory Item */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: selectedItems.accessory ? '#fff9fb' : '#f9fafb', border: '1px solid', borderColor: selectedItems.accessory ? '#fce7f0' : '#e5e7eb', borderRadius: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input
                      type="checkbox"
                      checked={selectedItems.accessory}
                      onChange={() => toggleItem('accessory')}
                      style={{ width: '18px', height: '18px', accentColor: '#db2777', cursor: 'pointer' }}
                    />
                    <img src={curatedLook.accessory.image} alt="Accessory" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800 }}>👛 {curatedLook.accessory.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Deposit: ₹{curatedLook.accessory.deposit}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#db2777' }}>₹{curatedLook.accessory.price}/day</div>
                </div>
              </div>

              {/* Dynamic Live Total Box */}
              <div style={{ background: '#fff0f5', border: '1.5px solid #fbcfe8', borderRadius: '16px', padding: '1rem', marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6b7280', marginBottom: '4px' }}>
                  <span>Rental per day:</span>
                  <span>₹{totals.rent}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6b7280', marginBottom: '6px' }}>
                  <span>Refundable Security Deposit:</span>
                  <span>₹{totals.deposit}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 900, color: '#831843', borderTop: '1px dashed #fbcfe8', paddingTop: '8px' }}>
                  <span>Total Look Estimate:</span>
                  <span>₹{totals.total}</span>
                </div>
              </div>

              <button
                className="btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
                disabled={!selectedItems.outfit && !selectedItems.jewellery && !selectedItems.accessory}
                onClick={() => onBookCuratedLook({
                  title: curatedLook.theme,
                  category: 'Curated Ensemble',
                  rentalPricePerDay: totals.rent,
                  securityDeposit: totals.deposit,
                  imageUrl: curatedLook.outfit.image,
                  pickupAddress: 'Road No 12, Banjara Hills, Hyderabad',
                  ownerPhone: '9848012345',
                  bookedDates: 'Available Now'
                })}
              >
                🛍️ Proceed to Rent Selected Look
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StylistStudio;