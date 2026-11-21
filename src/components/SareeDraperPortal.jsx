import React, { useState } from 'react';

function SareeDraperPortal({ currentUser, onBackToShop }) {
  const [selectedArea, setSelectedArea] = useState('ALL');
  const [bookingModalDraper, setBookingModalDraper] = useState(null);
  const [confirmedReceipt, setConfirmedReceipt] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState({
    name: 'Doorstep Event Draping',
    price: 399
  });
  const [serviceMode, setServiceMode] = useState('Home Visit');
  const [eventDate, setEventDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('6:00 AM Muhurtham Slot');
  const [paymentMethod, setPaymentMethod] = useState('UPI (GPay / PhonePe / Paytm)');
  const [upiId, setUpiId] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  const drapingPackages = [
    { name: 'Pre-Pleating & Box Folding', price: 199 },
    { name: 'Doorstep Event Draping', price: 399 },
    { name: 'Bridal Heavy Silk + Dupatta Styling', price: 599 }
  ];

  const timeSlots = [
    '6:00 AM Muhurtham Slot',
    '9:30 AM Morning Event',
    '2:00 PM Afternoon Reception',
    '6:30 PM Sangeet / Evening'
  ];

  const paymentOptions = [
    'UPI (GPay / PhonePe / Paytm)',
    'Credit / Debit Card',
    'Pay After Draping (Cash / UPI)'
  ];

  const areas = ['ALL', 'Banjara Hills', 'Madhapur', 'Amberpet', 'Uppal'];

  const [drapers, setDrapers] = useState([
    {
      id: 'DRP-01',
      name: 'Lavanya Bridal Draping Studio',
      specialty: 'Kanjeevaram, Silk & Lehenga Dupatta Draping',
      area: 'Banjara Hills & Jubilee Hills',
      fee: 399,
      rating: '4.9 ★ (128 bookings)',
      phone: '9848011223',
      portfolio: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&auto=format&fit=crop&q=60'
      ]
    },
    {
      id: 'DRP-02',
      name: 'Sneha Saree Pre-Pleating & Styling',
      specialty: 'Box Folding, Pre-Pleating & Doorstep Draping',
      area: 'Madhapur & Kondapur',
      fee: 349,
      rating: '4.8 ★ (94 bookings)',
      phone: '9848022334',
      portfolio: [
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=60'
      ]
    },
    {
      id: 'DRP-03',
      name: 'Ananya Traditional Couture Stylist',
      specialty: 'Bridal South Indian & Bengali Saree Draping',
      area: 'Amberpet & Uppal',
      fee: 299,
      rating: '4.9 ★ (76 bookings)',
      phone: '9848033445',
      portfolio: [
        'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=60'
      ]
    }
  ]);

  const [bookings, setBookings] = useState([
    {
      id: 'DBK-501',
      customerName: 'Keerthi Reddy',
      draperName: 'Lavanya Bridal Draping Studio',
      draperPhone: '9848011223',
      eventDate: 'Tomorrow',
      timeSlot: '6:00 AM Muhurtham Slot',
      serviceMode: 'Home Visit',
      location: 'Road No 10, Banjara Hills',
      service: 'Bridal Heavy Silk + Dupatta Styling',
      fee: 599,
      paymentMethod: 'UPI Paid ✔',
      status: 'Pending Confirmation'
    },
    {
      id: 'DBK-498',
      customerName: 'Divya Sharma',
      draperName: 'Sneha Saree Pre-Pleating & Styling',
      draperPhone: '9848022334',
      eventDate: 'Yesterday',
      timeSlot: '6:30 PM Sangeet / Evening',
      serviceMode: 'Salon Visit',
      location: 'Madhapur Studio',
      service: 'Doorstep Event Draping',
      fee: 399,
      paymentMethod: 'UPI Paid ✔',
      status: 'Completed ✔'
    }
  ]);

  const [newService, setNewService] = useState({
    name: currentUser?.name || '',
    specialty: 'Bridal Silk & Pre-Pleating Service',
    area: currentUser?.area || 'Amberpet & Uppal',
    fee: 399
  });

  const handlePublishDraperProfile = (e) => {
    e.preventDefault();
    if (!newService.name.trim()) return;
    const entry = {
      id: `DRP-${Date.now().toString().slice(-3)}`,
      name: newService.name,
      specialty: newService.specialty,
      area: newService.area,
      fee: Number(newService.fee) || 399,
      rating: '5.0 ★ (New Verified Stylist)',
      phone: currentUser?.phone || '9876543210',
      portfolio: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&auto=format&fit=crop&q=60'
      ]
    };
    setDrapers([entry, ...drapers]);
    alert('🎉 Your Saree Draper profile is now live in the directory!');
  };

  const handleConfirmDraperBooking = (e) => {
    e.preventDefault();
    if (!eventDate) return alert('Please select your event date!');
    if (paymentMethod.startsWith('UPI') && !upiId.trim()) {
      return alert('Please enter your UPI ID (e.g., name@upi or 9876543210@ybl).');
    }

    setIsPaying(true);
    const finalFee = selectedPackage.price + (serviceMode === 'Home Visit' ? 50 : 0);
    const payLabel = paymentMethod.startsWith('Pay After')
      ? 'Pay After Service (Cash/UPI)'
      : `Paid Online (${paymentMethod.split(' ')[0]}) ✔`;

    setTimeout(() => {
      const newReq = {
        id: `DBK-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: currentUser?.name || 'Zyro Customer',
        draperName: bookingModalDraper.name,
        draperPhone: bookingModalDraper.phone,
        eventDate,
        timeSlot,
        serviceMode,
        location: bookingModalDraper.area,
        service: selectedPackage.name,
        fee: finalFee,
        paymentMethod: payLabel,
        status: 'Booking Confirmed'
      };
      setBookings([newReq, ...bookings]);
      setConfirmedReceipt(newReq);
      setIsPaying(false);
      setBookingModalDraper(null);
      setUpiId('');
    }, 600);
  };

  const handleWhatsApp = (phone, name) => {
    const msg = `Namaste ${name}! Zyro Saree Draper Portal nundi event draping slot gurinchi message chesthunnanu.`;
    window.open(`https://api.whatsapp.com/send?phone=${phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(msg)}`, '_blank');
  };

  const isDraperUser = currentUser?.role === 'DRAPER';

  const filteredDrapers = selectedArea === 'ALL'
    ? drapers
    : drapers.filter((d) => d.area.toLowerCase().includes(selectedArea.toLowerCase()));

  const completedCount = bookings.filter((b) => b.status.includes('Completed')).length + 18;
  const upcomingCount = bookings.filter((b) => !b.status.includes('Completed')).length;
  const totalDraperEarnings = 8450 + bookings.reduce((sum, b) => sum + Number(b.fee || 0), 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '8px' }}>
        <button className="btn-secondary" onClick={onBackToShop}>← Back to Marketplace</button>
        <span style={{ background: '#fdf2f8', color: '#be185d', padding: '6px 12px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 800 }}>
          {isDraperUser ? '💄 Draper Partner Dashboard' : '✨ Verified Local Saree Drapers'}
        </span>
      </div>

      {/* BOOKING & PAYMENT CONFIRMATION RECEIPT CARD */}
      {confirmedReceipt && (
        <div style={{
          background: '#f0fdf4',
          border: '2px solid #22c55e',
          borderRadius: '18px',
          padding: '1.3rem',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 24px rgba(34, 197, 94, 0.12)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontWeight: 900, fontSize: '1rem', color: '#15803d' }}>
              🎉 Saree Draping Confirmed! (#{confirmedReceipt.id})
            </span>
            <button
              type="button"
              onClick={() => setConfirmedReceipt(null)}
              style={{ background: 'none', border: 'none', color: '#15803d', fontWeight: 800, cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '0.82rem', color: '#1f2937', marginBottom: '12px' }}>
            <div><strong>Stylist:</strong> {confirmedReceipt.draperName}</div>
            <div><strong>Package:</strong> {confirmedReceipt.service}</div>
            <div><strong>Mode:</strong> {confirmedReceipt.serviceMode}</div>
            <div><strong>Date & Slot:</strong> {confirmedReceipt.eventDate} • {confirmedReceipt.timeSlot}</div>
            <div><strong>Payment:</strong> <span style={{ color: '#15803d', fontWeight: 800 }}>{confirmedReceipt.paymentMethod}</span></div>
            <div><strong>Amount:</strong> <span style={{ color: '#e11d48', fontWeight: 900 }}>₹{confirmedReceipt.fee}</span></div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ fontSize: '0.78rem', padding: '7px 14px' }}
              onClick={() => handleWhatsApp(confirmedReceipt.draperPhone, confirmedReceipt.draperName)}
            >
              �� Coordinate on WhatsApp with Stylist
            </button>
            <span style={{ fontSize: '0.75rem', color: '#166534', alignSelf: 'center', fontWeight: 700 }}>
              ✔ Receipt saved in My Saree Draping Appointments
            </span>
          </div>
        </div>
      )}

      {/* DRAPER EARNINGS & COMPLETED BOOKINGS COUNTER */}
      {isDraperUser && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '12px', marginBottom: '1.3rem' }}>
            <div style={{ background: '#fff1f2', border: '1.5px solid #fecdd3', borderRadius: '16px', padding: '14px' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#705b64' }}>Total Draper Earnings</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#e11d48', margin: '4px 0' }}>₹{totalDraperEarnings.toLocaleString('en-IN')}</div>
              <div style={{ fontSize: '0.7rem', color: '#4b5563' }}>Direct UPI / Cash payouts</div>
            </div>
            <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '16px', padding: '14px' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#705b64' }}>Completed Drapings</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#15803d', margin: '4px 0' }}>{completedCount} Sarees</div>
              <div style={{ fontSize: '0.7rem', color: '#4b5563' }}>4.9 ★ Avg Customer Rating</div>
            </div>
            <div style={{ background: '#fdf2f8', border: '1.5px solid #fbcfe8', borderRadius: '16px', padding: '14px' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#705b64' }}>Upcoming Slots</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#be185d', margin: '4px 0' }}>{upcomingCount} Active</div>
              <div style={{ fontSize: '0.7rem', color: '#4b5563' }}>Scheduled event bookings</div>
            </div>
          </div>

          <div style={{ background: '#fff1f2', border: '1.5px solid #fecdd3', borderRadius: '18px', padding: '1.3rem', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: '0 0 10px', color: '#be185d' }}>💄 Welcome, {currentUser.name} — Draper Partner Hub</h3>
            <form onSubmit={handlePublishDraperProfile} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Studio / Stylist Name"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #fbcfe8' }}
                required
              />
              <input
                type="text"
                placeholder="Draping Specialty"
                value={newService.specialty}
                onChange={(e) => setNewService({ ...newService, specialty: e.target.value })}
                style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #fbcfe8' }}
                required
              />
              <input
                type="text"
                placeholder="Service Areas (e.g. Amberpet, Uppal)"
                value={newService.area}
                onChange={(e) => setNewService({ ...newService, area: e.target.value })}
                style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #fbcfe8' }}
                required
              />
              <input
                type="number"
                placeholder="Starting Fee (₹)"
                value={newService.fee}
                onChange={(e) => setNewService({ ...newService, fee: e.target.value })}
                style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #fbcfe8' }}
                required
              />
              <button type="submit" className="btn-primary" style={{ padding: '8px 14px' }}>+ Publish Draper Profile</button>
            </form>

            <h4 style={{ margin: '0 0 8px', fontSize: '0.9rem', color: '#831843' }}>📅 Client Draping Bookings</h4>
            {bookings.map((bk) => (
              <div key={bk.id} style={{ background: '#fff', padding: '10px 12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', border: '1px solid #fce7f0', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <strong>{bk.customerName}</strong> • <span style={{ color: '#e11d48', fontWeight: 700 }}>{bk.service}</span> ({bk.serviceMode})
                  <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                    📍 {bk.location} | 📅 {bk.eventDate} • 🕒 {bk.timeSlot} | ₹{bk.fee} ({bk.paymentMethod})
                  </div>
                </div>
                {bk.status === 'Pending Confirmation' ? (
                  <button
                    className="btn-primary"
                    style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                    onClick={() => setBookings(bookings.map(b => b.id === bk.id ? { ...b, status: 'Accepted ✔' } : b))}
                  >
                    Accept Booking
                  </button>
                ) : (
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#15803d' }}>{bk.status}</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* AREA / PINCODE FILTER PILLS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '1.2rem', background: '#fff', padding: '10px 14px', borderRadius: '14px', border: '1px solid #fce7f0' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#705b64' }}>📍 Filter by Hyderabad Area:</span>
        {areas.map((area) => (
          <button
            key={area}
            type="button"
            onClick={() => setSelectedArea(area)}
            style={{
              padding: '5px 12px',
              borderRadius: '16px',
              border: '1.5px solid',
              borderColor: selectedArea === area ? '#e11d48' : '#fce7f0',
              background: selectedArea === area ? '#fff1f2' : '#ffffff',
              color: selectedArea === area ? '#e11d48' : '#4b5563',
              fontWeight: 700,
              fontSize: '0.76rem',
              cursor: 'pointer'
            }}
          >
            {area === 'ALL' ? 'All Areas' : area}
          </button>
        ))}
      </div>

      {/* DRAPER CARDS WITH PORTFOLIO GALLERY */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))', gap: '14px', marginBottom: '1.5rem' }}>
        {filteredDrapers.map((d) => (
          <div key={d.id} style={{ background: '#ffffff', border: '1.5px solid #fce7f0', borderRadius: '18px', padding: '1.2rem', boxShadow: '0 6px 18px rgba(225,29,72,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <span style={{ background: '#fdf2f8', color: '#be185d', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '8px' }}>
                {d.rating}
              </span>
              <span style={{ fontWeight: 900, fontSize: '1.05rem', color: '#e11d48' }}>From ₹199</span>
            </div>

            <h3 style={{ margin: '6px 0 4px', fontSize: '1rem', color: '#1f161a' }}>{d.name}</h3>
            <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#4b5563' }}>{d.specialty}</p>

            {d.portfolio && d.portfolio.length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#705b64', marginBottom: '4px' }}>✨ Past Draping Portfolio:</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {d.portfolio.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt="Draping look"
                      style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #fbcfe8' }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div style={{ fontSize: '0.75rem', color: '#166534', background: '#f0fdf4', padding: '4px 8px', borderRadius: '8px', marginBottom: '12px' }}>
              📍 {d.area}
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-primary"
                style={{ flex: 1, padding: '8px', fontSize: '0.8rem' }}
                onClick={() => setBookingModalDraper(d)}
              >
                💄 Select Style & Book
              </button>
              <button className="btn-secondary" style={{ padding: '8px 10px', fontSize: '0.8rem' }} onClick={() => handleWhatsApp(d.phone, d.name)}>
                💬 Chat
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* YOUR ACTIVE SAREE DRAPING BOOKINGS LIST */}
      {!isDraperUser && (
        <div style={{ background: '#ffffff', border: '1.5px solid #fce7f0', borderRadius: '18px', padding: '1.2rem' }}>
          <h4 style={{ margin: '0 0 10px', color: '#1f161a' }}>📅 My Saree Draping Appointments</h4>
          {bookings.map((bk) => (
            <div key={bk.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #fce7f0', padding: '10px 0', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.88rem' }}>{bk.draperName || 'Verified Zyro Stylist'} (#{bk.id})</div>
                <div style={{ fontSize: '0.76rem', color: '#4b5563' }}>
                  {bk.service} • {bk.serviceMode} • 📅 {bk.eventDate} ({bk.timeSlot})
                </div>
                <div style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 700, marginTop: '2px' }}>
                  💳 {bk.paymentMethod}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 900, color: '#e11d48', fontSize: '0.88rem' }}>₹{bk.fee}</span>
                <span style={{ background: '#f0fdf4', color: '#15803d', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '8px' }}>
                  {bk.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DRAPING STYLE, TIME SLOT & PAYMENT MODAL */}
      {bookingModalDraper && (
        <div className="modal-overlay" onClick={() => setBookingModalDraper(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '470px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ color: '#be185d', margin: '0 0 4px' }}>Book {bookingModalDraper.name}</h3>
            <p style={{ fontSize: '0.78rem', color: '#705b64', margin: '0 0 12px' }}>📍 {bookingModalDraper.area}</p>

            <form onSubmit={handleConfirmDraperBooking}>
              {/* 1. PACKAGE */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '0.76rem', fontWeight: 800, display: 'block', marginBottom: '5px' }}>1. Select Draping Package:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {drapingPackages.map((pkg) => (
                    <div
                      key={pkg.name}
                      onClick={() => setSelectedPackage(pkg)}
                      style={{
                        padding: '7px 10px',
                        borderRadius: '10px',
                        border: `1.5px solid ${selectedPackage.name === pkg.name ? '#e11d48' : '#fce7f0'}`,
                        background: selectedPackage.name === pkg.name ? '#fff1f2' : '#fff',
                        display: 'flex',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 700
                      }}
                    >
                      <span>{pkg.name}</span>
                      <span style={{ color: '#e11d48', fontWeight: 900 }}>₹{pkg.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. SERVICE MODE */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '0.76rem', fontWeight: 800, display: 'block', marginBottom: '5px' }}>2. Service Mode:</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setServiceMode('Home Visit')}
                    style={{
                      flex: 1,
                      padding: '7px',
                      borderRadius: '10px',
                      border: `1.5px solid ${serviceMode === 'Home Visit' ? '#e11d48' : '#e5e7eb'}`,
                      background: serviceMode === 'Home Visit' ? '#fff1f2' : '#fff',
                      fontWeight: 700,
                      fontSize: '0.76rem',
                      cursor: 'pointer'
                    }}
                  >
                    🏠 Home Visit (+₹50)
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceMode('Salon Visit')}
                    style={{
                      flex: 1,
                      padding: '7px',
                      borderRadius: '10px',
                      border: `1.5px solid ${serviceMode === 'Salon Visit' ? '#e11d48' : '#e5e7eb'}`,
                      background: serviceMode === 'Salon Visit' ? '#fff1f2' : '#fff',
                      fontWeight: 700,
                      fontSize: '0.76rem',
                      cursor: 'pointer'
                    }}
                  >
                    🏪 Salon Visit (Free)
                  </button>
                </div>
              </div>

              {/* 3 & 4. DATE & TIME SLOT */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: '4px' }}>3. Event Date:</label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    style={{ width: '100%', padding: '7px', borderRadius: '10px', border: '1px solid #fbcfe8', fontSize: '0.78rem' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.74rem', fontWeight: 800, display: 'block', marginBottom: '4px' }}>4. Time Slot:</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    style={{ width: '100%', padding: '7px', borderRadius: '10px', border: '1px solid #fbcfe8', fontSize: '0.76rem' }}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 5. PAYMENT METHOD SELECTOR */}
              <div style={{ marginBottom: '12px', background: '#fff5f8', padding: '10px', borderRadius: '12px', border: '1px solid #fbcfe8' }}>
                <label style={{ fontSize: '0.76rem', fontWeight: 800, display: 'block', marginBottom: '6px', color: '#831843' }}>
                  5. Choose Payment Option:
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {paymentOptions.map((opt) => (
                    <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="draperPayment"
                        checked={paymentMethod === opt}
                        onChange={() => setPaymentMethod(opt)}
                        style={{ accentColor: '#e11d48' }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>

                {paymentMethod.startsWith('UPI') && (
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g. chathurya@ybl)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    style={{ width: '100%', marginTop: '8px', padding: '7px 10px', borderRadius: '8px', border: '1px solid #fbcfe8', fontSize: '0.78rem' }}
                  />
                )}
              </div>

              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#e11d48', marginBottom: '10px' }}>
                Total Payable: ₹{selectedPackage.price + (serviceMode === 'Home Visit' ? 50 : 0)}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" className="btn-secondary" onClick={() => setBookingModalDraper(null)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={isPaying}>
                  {isPaying
                    ? 'Processing Payment...'
                    : paymentMethod.startsWith('Pay After')
                      ? 'Confirm Slot (Pay Later)'
                      : `Pay ₹${selectedPackage.price + (serviceMode === 'Home Visit' ? 50 : 0)} & Book`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SareeDraperPortal;
