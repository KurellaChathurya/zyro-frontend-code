import React, { useState, useRef } from 'react';

function RenterDashboard({
  renterListings,
  activeRentals,
  onBackToShop,
  onOpenAddItemModal,
  onApproveRefund,
  onReportDamageWithProof,
  onWhatsAppChat
}) {
  const [inspectingOrder, setInspectingOrder] = useState(null);
  const [damageReason, setDamageReason] = useState('');
  const [damageFee, setDamageFee] = useState(0);
  const [damageProofImg, setDamageProofImg] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      alert("Camera access denied.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const c = canvasRef.current;
      const v = videoRef.current;
      c.width = v.videoWidth || 640;
      c.height = v.videoHeight || 480;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      const url = c.toDataURL('image/jpeg', 0.85);
      setDamageProofImg(url);
      stopCamera();
    }
  };

  const handleFormSubmit = () => {
    if (!damageReason.trim() || damageFee <= 0) return alert("Enter damage reason & repair fee.");
    onReportDamageWithProof(inspectingOrder, damageReason, damageFee, damageProofImg);
    setInspectingOrder(null);
    setDamageReason('');
    setDamageFee(0);
    setDamageProofImg(null);
  };

  return (
    <div className="profile-wrapper">
      {/* 👈 Back Button to Catalog */}
      <button onClick={onBackToShop} className="btn-secondary" style={{ marginBottom: '1.2rem', fontWeight: 700 }}>
        ← Back to Catalog Dashboard
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#1f161a' }}>👗 Renter Partner Dashboard</h2>
          <p style={{ color: '#705b64', fontSize: '0.9rem' }}>Manage listings, inspect returned garments with photo proof, and release deposits.</p>
        </div>
        <button className="btn-primary" onClick={onOpenAddItemModal}>+ List New Outfit</button>
      </div>

      {/* Inspections Alert Section */}
      <div style={{ background: '#fff', border: '1.5px solid #fce7f0', borderRadius: '20px', padding: '1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#be185d', marginBottom: '1rem' }}>
          🔍 Garments Returned: Pending Inspection & Deposit Release
        </h3>

        {activeRentals.filter(r => r.status.includes('Inspection Pending')).length === 0 ? (
          <p style={{ fontSize: '0.85rem', color: '#705b64' }}>No pending inspections right now. All returned outfits are verified.</p>
        ) : (
          activeRentals.filter(r => r.status.includes('Inspection Pending')).map(ord => (
            <div key={ord.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fdf2f8', padding: '1rem', borderRadius: '14px', border: '1px solid #fbcfe8', marginBottom: '8px' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800 }}>{ord.title} (Order #{ord.id})</h4>
                <p style={{ fontSize: '0.8rem', color: '#4b5563' }}>Customer Deposit Held: <strong>₹{ord.securityDeposit}</strong></p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => onApproveRefund(ord)}>
                  ✅ No Damage (Release Refund)
                </button>
                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', color: '#b91c1c' }} onClick={() => setInspectingOrder(ord)}>
                  ⚠️ Report Damage with Proof
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Listed Outfits */}
      <div style={{ background: '#fff', border: '1.5px solid #fce7f0', borderRadius: '20px', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1f161a', marginBottom: '1rem' }}>
          Your Listed Outfits & Occupied Dates
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {renterListings.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff9fb', border: '1px solid #fce7f0', borderRadius: '16px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <img src={item.imageUrl} alt={item.title} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '12px' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#db2777' }}>{item.category} • {item.id}</span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '2px 0' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#4b5563' }}>📍 Pickup: {item.pickupAddress}, {item.city}</p>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309', background: '#fef3c7', padding: '2px 6px', borderRadius: '6px' }}>
                    📅 Occupied Dates: {item.bookedDates || 'Available Anytime'}
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#db2777' }}>₹{item.rentalPricePerDay} / day</div>
                <button className="btn-secondary" style={{ marginTop: '6px', fontSize: '0.75rem', padding: '4px 8px' }} onClick={() => onWhatsAppChat(item.ownerPhone, item.title)}>
                  💬 Test WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Owner Damage Modal with Camera & File Upload */}
      {inspectingOrder && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <h3 style={{ color: '#b91c1c', margin: '0 0 6px' }}>⚠️ Report Garment Damage & Attach Proof</h3>
            <p style={{ fontSize: '0.8rem', color: '#705b64', marginBottom: '12px' }}>
              Order #{inspectingOrder.id}. Attached photo will be displayed directly in the customer profile.
            </p>

            <div className="form-group">
              <label>Damage Reason & Notes</label>
              <textarea 
                rows="3" 
                placeholder="e.g. Deep food stain or tear near dupatta hem"
                value={damageReason}
                onChange={(e) => setDamageReason(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #fbcfe8' }}
              />
            </div>

            <div className="form-group">
              <label>Deduction / Repair Fee (₹)</label>
              <input 
                type="number" 
                placeholder="e.g. 500" 
                value={damageFee}
                onChange={(e) => setDamageFee(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #fbcfe8' }}
              />
            </div>

            <div className="form-group">
              <label>Attach Inspection Photo Proof</label>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button type="button" className="btn-secondary" onClick={startCamera}>📷 Camera Snap</button>
                <label className="btn-secondary" style={{ cursor: 'pointer', padding: '6px 12px' }}>
                  📁 Choose File
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                    const f = e.target.files[0];
                    if (f) {
                      const r = new FileReader();
                      r.onloadend = () => setDamageProofImg(r.result);
                      r.readAsDataURL(f);
                    }
                  }} />
                </label>
              </div>

              {isCameraActive && (
                <div style={{ background: '#fff5f8', padding: '10px', borderRadius: '12px', textAlign: 'center', marginTop: '8px' }}>
                  <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '6px' }}>
                    <button type="button" className="btn-primary" onClick={capturePhoto}>📸 Snap</button>
                    <button type="button" className="btn-secondary" onClick={stopCamera}>Cancel</button>
                  </div>
                </div>
              )}
              <canvas ref={canvasRef} style={{ display: 'none' }} />

              {damageProofImg && (
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <img src={damageProofImg} alt="Damage Proof" style={{ width: '100%', maxHeight: '160px', objectFit: 'contain', borderRadius: '10px', border: '1px solid #fecdd3' }} />
                  <button type="button" onClick={() => setDamageProofImg(null)} style={{ background: '#fee2e2', color: '#b91c1c', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', marginTop: '4px', cursor: 'pointer' }}>
                    🗑️ Remove Photo
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1rem' }}>
              <button className="btn-secondary" onClick={() => { setInspectingOrder(null); stopCamera(); }}>Cancel</button>
              <button className="btn-primary" style={{ background: '#b91c1c' }} onClick={handleFormSubmit}>
                Submit Inspection Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RenterDashboard;