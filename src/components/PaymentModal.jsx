import React from 'react';

function PaymentModal({
  isOpen,
  onClose,
  selectedProduct,
  rentDays,
  deliveryMethod,
  paymentMethod,
  setPaymentMethod,
  paymentStatus,
  transactionId,
  onExecutePayment,
  onFinishBooking
}) {
  if (!isOpen || !selectedProduct) return null;

  const totalAmount =
    (selectedProduct.rentalPricePerDay * rentDays) +
    (selectedProduct.securityDeposit || 0) +
    (deliveryMethod === 'delivery' ? 150 : 0);

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '440px', textAlign: 'center' }}>
        {paymentStatus === 'idle' ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #fce7f0', paddingBottom: '10px', marginBottom: '1rem' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#db2777' }}>ZYRO SECURE CHECKOUT</span>
                <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#1f161a' }}>Pay via UPI / Cards</h3>
              </div>
              <button className="btn-secondary" style={{ padding: '2px 8px' }} onClick={onClose}>✕</button>
            </div>

            <div style={{ background: '#fdf2f8', padding: '14px', borderRadius: '16px', marginBottom: '1.2rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', color: '#705b64' }}>Amount to Pay (Rent + Deposit):</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#831843', marginTop: '2px' }}>
                ₹{totalAmount}
              </div>
              <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>
                🛡️ Includes 100% Refundable Deposit: ₹{selectedProduct.securityDeposit || 0}
              </span>
            </div>

            <div style={{ textAlign: 'left', marginBottom: '1.2rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#705b64', display: 'block', marginBottom: '8px' }}>
                Select Payment Option:
              </label>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1.5px solid', borderColor: paymentMethod === 'gpay' ? '#db2777' : '#e5e7eb', borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'gpay' ? '#fff9fb' : '#fff' }}>
                  <input type="radio" name="payMethod" checked={paymentMethod === 'gpay'} onChange={() => setPaymentMethod('gpay')} />
                  <span style={{ fontSize: '1.1rem' }}>📱</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Google Pay / PhonePe UPI</div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1.5px solid', borderColor: paymentMethod === 'paytm' ? '#db2777' : '#e5e7eb', borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'paytm' ? '#fff9fb' : '#fff' }}>
                  <input type="radio" name="payMethod" checked={paymentMethod === 'paytm'} onChange={() => setPaymentMethod('paytm')} />
                  <span style={{ fontSize: '1.1rem' }}>⚡</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Paytm / BHIM UPI ID</div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1.5px solid', borderColor: paymentMethod === 'card' ? '#db2777' : '#e5e7eb', borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'card' ? '#fff9fb' : '#fff' }}>
                  <input type="radio" name="payMethod" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  <span style={{ fontSize: '1.1rem' }}>💳</span>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Credit / Debit Card</div>
                </label>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }} onClick={onExecutePayment}>
              🔒 Pay ₹{totalAmount} Securely
            </button>
            <p style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '8px' }}>
              Encrypted with 256-bit bank grade security • Instant Deposit Escrow
            </p>
          </div>
        ) : paymentStatus === 'processing' ? (
          <div style={{ padding: '2rem 1rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <h3 style={{ color: '#be185d', margin: '0 0 6px' }}>Processing Payment...</h3>
            <p style={{ fontSize: '0.85rem', color: '#705b64', margin: 0 }}>
              Connecting with UPI Gateway & Verifying Security Deposit Escrow...
            </p>
          </div>
        ) : (
          <div style={{ padding: '1.5rem 1rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>✅</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#047857', margin: '0 0 4px' }}>
              Payment Successful!
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#4b5563', margin: 0 }}>
              Rental Booking & Deposit Escrow confirmed.
            </p>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '10px', margin: '1.2rem 0', textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 800 }}>TRANSACTION RECEIPT</div>
              <div style={{ fontSize: '0.85rem', color: '#1f161a', fontWeight: 700, margin: '4px 0' }}>ID: {transactionId}</div>
              <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>Status: Verified & Added to Active Rentals</div>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '10px' }} onClick={onFinishBooking}>
              View Order in Profile →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentModal;