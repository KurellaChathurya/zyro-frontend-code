import React, { useState } from 'react';

function CustomerProfile({
  currentUser,
  profileTab,
  setProfileTab,
  activeRentals,
  pastRentals,
  onBackToShop,
  onWhatsAppChat,
  onSubmitReview
}) {
  // Review modal state
  const [reviewOrder, setReviewOrder] = useState(null);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // 📄 Instant Printable Invoice / PDF Bill Generator
  const handleDownloadInvoice = (order) => {
    const invoiceWindow = window.open('', '_blank');
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Zyro Rental Invoice - ${order.id}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #2d2327; }
            .invoice-card { max-width: 650px; margin: 0 auto; border: 2px solid #fce7f0; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(236,72,153,0.1); }
            .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px dashed #fce7f0; padding-bottom: 20px; }
            .brand-name { font-size: 26px; font-weight: 900; color: #be185d; }
            .invoice-title { font-size: 14px; color: #705b64; font-weight: 700; text-transform: uppercase; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 25px 0; font-size: 14px; }
            .table-wrap { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table-wrap th, .table-wrap td { padding: 12px; text-align: left; border-bottom: 1px solid #fce7f0; font-size: 14px; }
            .table-wrap th { background: #fff0f6; color: #be185d; }
            .total-row { font-size: 16px; font-weight: 800; color: #be185d; }
            .footer-note { font-size: 12px; color: #705b64; text-align: center; margin-top: 30px; border-top: 1px solid #fce7f0; padding-top: 15px; }
            @media print {
              body { padding: 0; }
              .btn-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-card">
            <div class="header">
              <div>
                <div class="brand-name">Zyro.</div>
                <div style="font-size: 12px; color: #836773;">Sustainable Luxury Fashion Rentals</div>
              </div>
              <div style="text-align: right;">
                <div class="invoice-title">Official Tax Invoice</div>
                <div style="font-weight: 800; color: #db2777;">Order #${order.id}</div>
                <div style="font-size: 12px; color: #705b64;">Date: ${order.date || 'Today'}</div>
              </div>
            </div>

            <div class="info-grid">
              <div>
                <strong>Billed To (Customer):</strong><br/>
                ${currentUser?.name || 'Valued Customer'}<br/>
                ${currentUser?.email || 'N/A'}<br/>
                Pickup Mode: ${order.pickupMode || 'Self-Pickup'}<br/>
                Pickup Location: ${order.pickupAddress || 'Banjara Hills, Hyderabad'}
              </div>
              <div>
                <strong>Rental Terms:</strong><br/>
                Rental Dates: ${order.rentalDates || 'Current Booking'}<br/>
                Duration: ${order.days || 3} Days<br/>
                Owner Helpline: ${order.ownerPhone || '+91 9848012345'}<br/>
                Deposit Status: 100% Refundable Post Inspection
              </div>
            </div>

            <table class="table-wrap">
              <thead>
                <tr>
                  <th>Item Description</th>
                  <th>Category</th>
                  <th>Security Deposit</th>
                  <th>Rental Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>${order.title}</strong></td>
                  <td>${order.category || 'Apparel'}</td>
                  <td>₹${order.securityDeposit || 4000}</td>
                  <td>${order.amount}</td>
                </tr>
                <tr class="total-row">
                  <td colspan="3" style="text-align: right;">Total Amount Paid (via UPI):</td>
                  <td>${order.amount}</td>
                </tr>
              </tbody>
            </table>

            <div class="footer-note">
              🛡️ Zyro Care Guarantee: Dry-cleaning and sanitization included.<br/>
              Security deposit will be credited back to your UPI ID within 24 hours of inspection.
            </div>

            <div style="text-align: center; margin-top: 25px;" class="btn-print">
              <button onclick="window.print()" style="padding: 10px 24px; background: #db2777; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                🖨️ Print or Save as PDF
              </button>
            </div>
          </div>
        </body>
      </html>
    `;
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return alert("Please share a quick comment!");
    onSubmitReview(reviewOrder.id, rating, reviewText);
    setReviewOrder(null);
    setReviewText('');
    setRating(5);
    alert("🌟 Thank you! Your review is now live on Zyro.");
  };

  return (
    <div className="profile-wrapper">
      <div style={{ marginBottom: '1.2rem' }}>
        <button onClick={onBackToShop} className="btn-secondary" style={{ fontWeight: 700 }}>
          ← Back to Shop
        </button>
      </div>

      {/* User Header Card */}
      <div style={{ background: '#ffffff', border: '1.5px solid #fce7f0', borderRadius: '24px', padding: '1.8rem', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: '0 8px 24px rgba(236,72,153,0.06)' }}>
        <div className="profile-avatar">
          {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{currentUser?.name}</h3>
          <p style={{ color: '#705b64', marginTop: '2px' }}>✉️ {currentUser?.email}</p>
          <span style={{ display: 'inline-block', marginTop: '6px', padding: '4px 10px', background: '#fdf2f8', color: '#db2777', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 'bold' }}>
            🛍️ Verified Customer & VIP Stylist Member
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="profile-stats-row">
        <div className="stat-box">
          <div className="stat-num">{activeRentals.length}</div>
          <div className="stat-label">Active Bookings</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">{pastRentals.length}</div>
          <div className="stat-label">Past Rentals</div>
        </div>
        <div className="stat-box">
          <div className="stat-num">₹{activeRentals.reduce((acc, curr) => acc + (curr.securityDeposit || 0), 0)}</div>
          <div className="stat-label">Secured Deposits</div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #fce7f0', marginBottom: '1.5rem' }}>
        <button 
          className={`profile-tab ${profileTab === 'orders' ? 'active' : ''}`}
          onClick={() => setProfileTab('orders')}
        >
          Present Bookings ({activeRentals.length})
        </button>
        <button 
          className={`profile-tab ${profileTab === 'past' ? 'active' : ''}`}
          onClick={() => setProfileTab('past')}
        >
          Previous Bookings ({pastRentals.length})
        </button>
      </div>

      {/* Present Bookings */}
      {profileTab === 'orders' ? (
        activeRentals.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#705b64', padding: '2rem' }}>No active bookings currently.</p>
        ) : (
          activeRentals.map(ord => (
            <div key={ord.id} className="meesho-order-card" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#db2777' }}>
                    {ord.id} • {ord.category}
                  </span>
                  <h4 style={{ margin: '4px 0', fontSize: '1.15rem' }}>{ord.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#705b64' }}>
                    📅 {ord.rentalDates || 'Dates confirmed'} ({ord.days || 3} Days)
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#836773', marginTop: '2px' }}>
                    📍 Pickup: <strong>{ord.pickupAddress || 'Road No 12, Banjara Hills'}</strong>
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#db2777', marginBottom: '4px' }}>
                    {ord.amount}
                  </div>
                  <span style={{ background: '#ecfdf5', color: '#047857', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {ord.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp & Download Invoice */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px dashed #fce7f0', paddingTop: '10px' }}>
                <button
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '4px 10px' }}
                  onClick={() => onWhatsAppChat(ord.ownerPhone || '9848012345', ord.title)}
                >
                  📲 WhatsApp Closet Owner
                </button>
                <button
                  className="btn-primary"
                  style={{ fontSize: '0.8rem', padding: '4px 12px' }}
                  onClick={() => handleDownloadInvoice(ord)}
                >
                  📄 Download Invoice (PDF)
                </button>
              </div>
            </div>
          ))
        )
      ) : (
        /* Past Bookings with Review Option */
        pastRentals.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#705b64', padding: '2rem' }}>No past bookings found.</p>
        ) : (
          pastRentals.map(ord => (
            <div key={ord.id} className="meesho-order-card" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#705b64' }}>{ord.id}</span>
                  <h4 style={{ margin: '3px 0', fontSize: '1.1rem' }}>{ord.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#705b64' }}>Completed on: {ord.date}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#64748b' }}>{ord.amount}</div>
                  <span style={{ background: '#f1f5f9', color: '#475569', padding: '3px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {ord.status}
                  </span>
                </div>
              </div>

              {/* Review Section */}
              {ord.review ? (
                <div style={{ background: '#fff5f8', padding: '8px 12px', borderRadius: '10px', fontSize: '0.85rem', border: '1px solid #fbcfe8' }}>
                  <span style={{ color: '#b45309', fontWeight: 800 }}>{'⭐'.repeat(ord.review.rating)} Verified Review:</span>
                  <p style={{ color: '#4b5563', margin: '2px 0 0' }}>"{ord.review.comment}"</p>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px dashed #fce7f0', paddingTop: '8px' }}>
                  <button 
                    className="btn-secondary" 
                    style={{ fontSize: '0.8rem', padding: '4px 10px' }}
                    onClick={() => handleDownloadInvoice(ord)}
                  >
                    📄 Invoice
                  </button>
                  <button 
                    className="btn-primary" 
                    style={{ fontSize: '0.8rem', padding: '4px 12px' }}
                    onClick={() => setReviewOrder(ord)}
                  >
                    ⭐ Write Rating & Review
                  </button>
                </div>
              )}
            </div>
          ))
        )
      )}

      {/* Review Modal */}
      {reviewOrder && (
        <div className="modal-overlay" onClick={() => setReviewOrder(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <h3 style={{ color: '#be185d', marginBottom: '8px' }}>Rate Your Rental Experience</h3>
            <p style={{ fontSize: '0.85rem', color: '#705b64', marginBottom: '14px' }}>
              How was <strong>{reviewOrder.title}</strong>? (Condition, fit, cleanliness)
            </p>

            <form onSubmit={handleReviewSubmit}>
              <div className="form-group">
                <label>Star Rating:</label>
                <div style={{ display: 'flex', gap: '8px', fontSize: '1.6rem', cursor: 'pointer', margin: '4px 0 10px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} onClick={() => setRating(star)}>
                      {star <= rating ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Review Comment:</label>
                <textarea
                  rows="3"
                  required
                  placeholder="e.g. Excellent fabric! Cleaned and smelled fresh. Received compliments all night!"
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setReviewOrder(null)}>Cancel</button>
                <button type="submit" className="btn-primary">Post Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerProfile;