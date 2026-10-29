import React, { useState } from 'react';

function DraperDirectory({ onBack }) {
  const [bookingDetails, setBookingDetails] = useState({
    customerName: '',
    eventDate: '',
    timeSlot: '10:00 AM - 12:00 PM',
    venue: 'Hyderabad'
  });

  const [selectedDraper, setSelectedDraper] = useState(null);

  const drapersList = [
    {
      id: 'DRP-01',
      name: 'Ananya Saree Draping Studio',
      specialization: 'Bridal, Traditional & Mermaid Pleating',
      price: '₹800',
      rating: '⭐ 4.9 (120+ Bookings)',
      city: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 'DRP-02',
      name: 'Priya Glamour Drapery',
      specialization: 'Lehenga setting, Retro & South Indian Styles',
      price: '₹750',
      rating: '⭐ 4.8 (95+ Bookings)',
      city: 'Hyderabad',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60'
    }
  ];

  const handleBookingSubmit = (e, draper) => {
    e.preventDefault();
    if (!bookingDetails.customerName || !bookingDetails.eventDate) {
      alert('దయచేసి మీ పేరు మరియు ఈవెంట్ తేదీని ఎంటర్ చేయండి!');
      return;
    }

    const newBooking = {
      id: 'DRP-' + Math.floor(100 + Math.random() * 900),
      customerName: bookingDetails.customerName,
      serviceType: draper.specialization,
      eventDate: bookingDetails.eventDate,
      timeSlot: bookingDetails.timeSlot,
      venue: bookingDetails.venue,
      status: 'Pending Acceptance'
    };

    const existingBookings = JSON.parse(localStorage.getItem('draperBookings') || '[]');
    localStorage.setItem('draperBookings', JSON.stringify([newBooking, ...existingBookings]));

    alert(`🎉 Success! Draper booked with ${draper.name}. The request has been sent to the draper dashboard.`);
    setSelectedDraper(null);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button className="btn-secondary" onClick={onBack} style={{ fontWeight: 700 }}>
          ← Back to Catalog
        </button>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#db2777', background: '#fdf2f8', padding: '4px 14px', borderRadius: '12px', border: '1px solid #fce7f0' }}>
          🧵 Verified Saree Drapers in Hyderabad
        </span>
      </div>

      <h2 style={{ color: '#831843', marginBottom: '1.5rem' }}>Book Professional Saree Drapers & Pre-pleating Experts</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {drapersList.map(draper => (
          <div key={draper.id} style={{ background: '#ffffff', border: '2px solid #fce7f0', borderRadius: '20px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
            <img src={draper.image} alt={draper.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '14px', marginBottom: '1rem' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, background: '#fdf2f8', color: '#db2777', padding: '2px 8px', borderRadius: '6px' }}>{draper.rating}</span>
            <h3 style={{ margin: '8px 0 4px', color: '#1f161a', fontSize: '1.2rem' }}>{draper.name}</h3>
            <p style={{ fontSize: '0.85rem', color: '#705b64', margin: '0 0 8px' }}>{draper.specialization}</p>
            <p style={{ fontSize: '0.9rem', fontWeight: 800, color: '#047857', marginBottom: '1rem' }}>Fee: {draper.price} / draping</p>

            <button className="btn-primary" onClick={() => setSelectedDraper(draper)} style={{ width: '100%' }}>
              📅 Book This Draper
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal / Form */}
      {selectedDraper && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <form onSubmit={(e) => handleBookingSubmit(e, selectedDraper)} style={{ background: '#ffffff', padding: '2rem', borderRadius: '24px', width: '90%', maxWidth: '450px', border: '2px solid #fbcfe8' }}>
            <h3 style={{ color: '#831843', marginBottom: '0.5rem' }}>Book {selectedDraper.name}</h3>
            <p style={{ fontSize: '0.85rem', color: '#705b64', marginBottom: '1.5rem' }}>Fill in your event details for doorstep service.</p>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#705b64' }}>Your Name</label>
              <input type="text" placeholder="Kurella Chathurya" value={bookingDetails.customerName} onChange={e => setBookingDetails({ ...bookingDetails, customerName: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #fbcfe8', marginTop: '4px' }} required />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#705b64' }}>Event Date</label>
              <input type="date" value={bookingDetails.eventDate} onChange={e => setBookingDetails({ ...bookingDetails, eventDate: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #fbcfe8', marginTop: '4px' }} required />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#705b64' }}>Venue (Hyderabad)</label>
              <input type="text" placeholder="Jubilee Hills, Hyderabad" value={bookingDetails.venue} onChange={e => setBookingDetails({ ...bookingDetails, venue: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1.5px solid #fbcfe8', marginTop: '4px' }} required />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button type="submit" className="btn-primary" style={{ flex: 1 }}>Confirm Booking</button>
              <button type="button" className="btn-secondary" onClick={() => setSelectedDraper(null)} style={{ flex: 1 }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default DraperDirectory;