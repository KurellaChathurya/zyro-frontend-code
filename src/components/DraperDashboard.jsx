import React, { useState } from 'react';

function DraperDashboard({ onBackToShop }) {
  // Draper Portfolio & Bookings State
  const [draperProfile, setDraperProfile] = useState({
    businessName: 'Ananya Saree Draping Studio',
    specialization: 'Bridal, Traditional & Mermaid Pleating',
    pricePerSaree: '₹800',
    city: 'Hyderabad',
    phone: '9848012345',
    portfolioUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState([
    {
      id: 'DRP-501',
      customerName: 'Kavya Reddy',
      serviceType: 'Bridal Saree Pre-pleating & Draping',
      eventDate: '15 Oct 2026',
      timeSlot: '08:00 AM - 10:00 AM',
      venue: 'Jubilee Hills, Hyderabad',
      status: 'Confirmed'
    },
    {
      id: 'DRP-502',
      customerName: 'Vaishnavi',
      serviceType: 'Traditional Maharashtrian Style',
      eventDate: '18 Oct 2026',
      timeSlot: '04:00 PM - 06:00 PM',
      venue: 'Gachibowli, Hyderabad',
      status: 'Pending Acceptance'
    }
  ]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('✨ Your Draper & Styling Studio profile has been updated successfully!');
  };

  const handleAcceptBooking = (id) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Confirmed & Slot Locked' } : b));
    alert(`✅ Booking #${id} accepted successfully!`);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button className="btn-secondary" onClick={onBackToShop} style={{ fontWeight: 700 }}>
          ← Back to Main Dashboard
        </button>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#db2777', background: '#fdf2f8', padding: '4px 14px', borderRadius: '12px', border: '1px solid #fce7f0' }}>
          🧵 Saree Draper & Styling Partner Portal
        </span>
      </div>

      {/* Profile Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #ffffff 100%)', border: '2px solid #fce7f0', borderRadius: '24px', padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <img src={draperProfile.portfolioUrl} alt="Draper" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #db2777' }} />
          <div>
            <h2 style={{ color: '#831843', margin: '0 0 4px', fontSize: '1.5rem' }}>{draperProfile.businessName}</h2>
            <p style={{ color: '#705b64', fontSize: '0.85rem', margin: '0 0 6px' }}>Specialization: <strong>{draperProfile.specialization}</strong></p>
            <p style={{ color: '#047857', fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>Standard Fee: {draperProfile.pricePerSaree} / draping | 📍 {draperProfile.city}</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Close Editor' : '✏️ Edit Studio Profile'}
        </button>
      </div>

      {/* Profile Edit Form */}
      {isEditing && (
        <form onSubmit={handleUpdateProfile} style={{ background: '#ffffff', border: '2px solid #fbcfe8', borderRadius: '20px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#831843', marginBottom: '1rem' }}>Update Studio Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#705b64' }}>Studio Name</label>
              <input type="text" value={draperProfile.businessName} onChange={e => setDraperProfile({ ...draperProfile, businessName: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #fbcfe8', marginTop: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#705b64' }}>Specialization</label>
              <input type="text" value={draperProfile.specialization} onChange={e => setDraperProfile({ ...draperProfile, specialization: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #fbcfe8', marginTop: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#705b64' }}>Price Per Saree (₹)</label>
              <input type="text" value={draperProfile.pricePerSaree} onChange={e => setDraperProfile({ ...draperProfile, pricePerSaree: e.target.value })} style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #fbcfe8', marginTop: '4px' }} />
            </div>
          </div>
          <button type="submit" className="btn-primary">Save Changes</button>
        </form>
      )}

      {/* Incoming Service Bookings Section */}
      <h3 style={{ color: '#831843', marginBottom: '1rem' }}>📥 Customer Draping & Pre-pleating Bookings</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {bookings.map(b => (
          <div key={b.id} style={{ background: '#ffffff', border: '1.5px solid #fce7f0', borderRadius: '18px', padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#fdf2f8', color: '#db2777', padding: '2px 8px', borderRadius: '6px' }}>#{b.id}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#047857' }}>{b.status}</span>
              </div>
              <h4 style={{ margin: '4px 0', color: '#1f161a', fontSize: '1.1rem' }}>{b.customerName}</h4>
              <p style={{ margin: '2px 0', fontSize: '0.85rem', color: '#705b64' }}>Service: <strong>{b.serviceType}</strong></p>
              <p style={{ margin: '2px 0', fontSize: '0.85rem', color: '#705b64' }}>📅 Date & Time: {b.eventDate} ({b.timeSlot})</p>
              <p style={{ margin: '2px 0', fontSize: '0.85rem', color: '#705b64' }}>📍 Venue: {b.venue}</p>
            </div>
            <div>
              {b.status.includes('Pending') ? (
                <button className="btn-primary" onClick={() => handleAcceptBooking(b.id)}>
                  ✅ Accept Booking
                </button>
              ) : (
                <button className="btn-secondary" style={{ color: '#047857', borderColor: '#34d399', background: '#f0fdf4' }} disabled>
                  ✔ Slot Confirmed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DraperDashboard;