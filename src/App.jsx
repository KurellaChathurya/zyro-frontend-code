import RenterPromoModal from './components/RenterPromoModal';
import React, { useEffect, useState, useRef } from 'react';
import { getAllItems } from './services/itemService';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PaymentModal from './components/PaymentModal';
import AIChatbot from './components/AIChatbot';
import CustomerProfile from './components/CustomerProfile';
import RenterDashboard from './components/RenterDashboard';
import RoleSelect from './components/RoleSelect';
import './App.css';

function App() {
  // ================== AUTH & ROLE STATES ==================
  const [selectedRole, setSelectedRole] = useState(null);
  const [authView, setAuthView] = useState('role-select');
  const [currentUser, setCurrentUser] = useState(null);

  // ================== NAVIGATION & VIEWS ==================
  const [activeView, setActiveView] = useState('shop');
  const [profileTab, setProfileTab] = useState('orders');

  // ================== CATALOG & SEARCH STATES ==================
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedGender, setSelectedGender] = useState('ALL');
  const [isListening, setIsListening] = useState(false);
  const [searchImagePreview, setSearchImagePreview] = useState(null);

  // Calendar Selection State
  const [rentalStartDate, setRentalStartDate] = useState('');
  const [rentalEndDate, setRentalEndDate] = useState('');

  // AI Stylist States
  const [stylistInputs, setStylistInputs] = useState({ 
    eventType: 'Wedding Reception', 
    skinTone: 'Wheatish / Warm Undertone', 
    bodyFit: 'Hourglass / Structured', 
    budgetRange: 5000, 
    colorPref: 'Royal Velvet Maroon / Gold' 
  });
  const [stylistPhoto, setStylistPhoto] = useState(null);
  const [isStylistCamActive, setIsStylistCamActive] = useState(false);
  const [stylistResult, setStylistResult] = useState(null);
  const [selectedCuratedItems, setSelectedCuratedItems] = useState({ outfit: true, jewellery: true, accessory: true });
  const stylistVideoRef = useRef(null);
  const stylistCanvasRef = useRef(null);

  // Floating Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Namaste! I am Zyro AI. Ask me about bridal styling, matching jewelry, sizing, or rental policies!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Product Selection & Checkout
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState('self-pickup');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Payment States
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('gpay');
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [transactionId, setTransactionId] = useState('');

  // Renter Promotional Ad & Setup Modal State
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  // Rentals & Listings
  const [activeRentals, setActiveRentals] = useState([
    { 
      id: 'ZYR-9041', 
      title: 'Pink Heritage Bridal Silk Lehenga', 
      category: 'Dresses', 
      days: 3, 
      rentalDates: '10 Oct - 13 Oct 2026', 
      pickupAddress: 'Road No 12, Banjara Hills, Hyderabad', 
      pickupMode: 'Self-Pickup by Customer', 
      ownerPhone: '9848012345', 
      securityDeposit: 4000, 
      amount: '₹4,500', 
      status: 'Returned - Inspection Pending', 
      inspectionNote: '', 
      damageProofUrl: null, 
      date: '03 Oct 2026' 
    }
  ]);

  const [pastRentals, setPastRentals] = useState([
    { 
      id: 'ZYR-8120', 
      title: 'Emerald Kundan Choker Necklace Set', 
      category: 'Jewellery', 
      days: 2, 
      pickupAddress: 'Kondapur, Hyderabad', 
      pickupMode: 'Zyro Courier', 
      amount: '₹1,600', 
      status: 'Returned & Full Deposit Refunded', 
      date: '20 Sep 2026', 
      review: { rating: 5, comment: 'Pristine shine, looked royal with my lehenga!' } 
    }
  ]);

  const [renterListings] = useState([
    { 
      id: 'LST-101', 
      title: 'Heavy Zardozi Velvet Bridal Lehenga', 
      category: 'Dresses', 
      rentalPricePerDay: 2499, 
      securityDeposit: 5000, 
      sizes: 'S, M, L', 
      bookedDates: '15 Oct - 18 Oct 2026', 
      pickupAddress: 'Flat 204, Fortune Heights, Madhapur', 
      city: 'Hyderabad', 
      pincode: '500081', 
      ownerPhone: '9848012345', 
      rating: 4.9, 
      reviewsCount: 19, 
      imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60' 
    },
    { 
      id: 'LST-102', 
      title: 'Imperial Velvet Groom Sherwani with Stole', 
      category: 'Dresses', 
      rentalPricePerDay: 1899, 
      securityDeposit: 4000, 
      sizes: 'L, XL', 
      bookedDates: '22 Oct - 25 Oct 2026', 
      pickupAddress: 'Plot 45, Jubilee Hills, Hyderabad', 
      city: 'Hyderabad', 
      pincode: '500033', 
      ownerPhone: '9988776655', 
      rating: 4.8, 
      reviewsCount: 14, 
      imageUrl: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=500&auto=format&fit=crop&q=60' 
    }
  ]);

  useEffect(() => {
    setLoading(true);
    getAllItems()
      .then(res => { setItems(res.data); setFilteredItems(res.data); setLoading(false); })
      .catch(() => { setItems(renterListings); setFilteredItems(renterListings); setLoading(false); });
  }, [renterListings]);

  useEffect(() => {
    let result = items.length ? items : renterListings;
    if (activeView === 'wishlist') result = result.filter(item => wishlist.includes(item.id));
    if (selectedCategory !== 'ALL') result = result.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());
    if (selectedGender !== 'ALL') {
      result = result.filter(item => ((item.title || '') + " " + (item.description || '')).toLowerCase().includes(selectedGender.toLowerCase()));
    }
    if (searchTerm.trim() !== '') {
      result = result.filter(item => (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || (item.pickupAddress || '').toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredItems(result);
  }, [searchTerm, selectedCategory, selectedGender, activeView, items, wishlist, renterListings]);

  // List Item Trigger
  const handleOpenAddItem = () => {
    const isRenter = (currentUser?.role || selectedRole || '').toLowerCase() === 'renter';
    if (!isRenter) {
      setIsPromoModalOpen(true);
    } else {
      navigateTo('renter-dashboard');
    }
  };

  // Convert customer to verified renter with closet onboarding details
  const handleUpgradeToRenter = (closetDetails) => {
    const updatedUser = { 
      ...(currentUser || {}), 
      role: 'renter',
      closetName: closetDetails?.closetName || 'My Designer Closet',
      city: closetDetails?.city || 'Hyderabad',
      pickupAddress: closetDetails?.pickupAddress || '',
      upiId: closetDetails?.upiId || ''
    };
    setCurrentUser(updatedUser);
    setSelectedRole('renter');
    setIsPromoModalOpen(false);
    setActiveView('renter-dashboard');
    alert(`🎉 Welcome ${updatedUser.closetName}! Your account has been upgraded to 'Zyro Verified Closet Renter'. You can now list items & manage payouts.`);
  };

  // 🎉 Celebration Confetti Burst Engine
  const triggerConfetti = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#ec4899', '#db2777', '#f472b6', '#fbbf24', '#34d399', '#60a5fa', '#a78bfa'];

    for (let i = 0; i < 120; i++) {
      pieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        w: Math.random() * 8 + 4,
        h: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18 - 3,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10
      });
    }

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.rot += p.rotSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (frame < 100) {
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(canvas);
      }
    };
    animate();
  };

  // Voice Search
  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Please open Google Chrome for Voice Search.");
    const rec = new SpeechRecognition();
    rec.lang = 'en-IN';
    rec.onstart = () => setIsListening(true);
    rec.onresult = (e) => { setSearchTerm(e.results[0][0].transcript); setIsListening(false); };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.start();
  };

  // Photo Search
  const handleImageSearchUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const r = new FileReader();
      r.onloadend = () => {
        setSearchImagePreview(r.result);
        const name = file.name.split('.')[0].replace(/[-_]/g, ' ');
        setSearchTerm(name.length > 2 ? name : 'Lehenga');
      };
      r.readAsDataURL(file);
    }
  };

  // Calendar Calculation
  const calculateDaysFromDates = () => {
    if (!rentalStartDate || !rentalEndDate) return 3;
    const s = new Date(rentalStartDate);
    const e = new Date(rentalEndDate);
    const diff = Math.ceil(Math.abs(e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };
  const calculatedDays = calculateDaysFromDates();

  // AI Stylist Look
  const generateAIStylistLook = () => {
    setStylistResult({
      theme: `${stylistInputs.eventType} Royal Lookboard`,
      outfit: { title: `Handcrafted ${stylistInputs.colorPref} Velvet Heritage Lehenga`, price: 2499, deposit: 4000, imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60' },
      jewellery: { title: 'Polki Kundan Choker & Matching Maang Tikka Set', price: 1200, deposit: 1500, imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60' },
      accessory: { title: 'Embroidered Velvet Zardozi Potli & Juttis', price: 550, deposit: 500, imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=500&auto=format&fit=crop&q=60' },
      hairRecommendation: 'Textured Soft Braided Bun with Fresh Jasmine Flowers',
      eventVerdict: `Apt for ${stylistInputs.eventType}! Perfectly matched to your complexion and body fit.`
    });
  };

  const calculateCuratedTotal = () => {
    if (!stylistResult) return { rent: 0, deposit: 0, total: 0 };
    let rent = (selectedCuratedItems.outfit ? stylistResult.outfit.price : 0) + (selectedCuratedItems.jewellery ? stylistResult.jewellery.price : 0) + (selectedCuratedItems.accessory ? stylistResult.accessory.price : 0);
    let deposit = (selectedCuratedItems.outfit ? stylistResult.outfit.deposit : 0) + (selectedCuratedItems.jewellery ? stylistResult.jewellery.deposit : 0) + (selectedCuratedItems.accessory ? stylistResult.accessory.deposit : 0);
    return { rent, deposit, total: rent + deposit };
  };

  const startStylistCam = async () => {
    setIsStylistCamActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (stylistVideoRef.current) stylistVideoRef.current.srcObject = stream;
    } catch {
      alert("Camera access denied.");
      setIsStylistCamActive(false);
    }
  };

  const stopStylistCam = () => {
    if (stylistVideoRef.current && stylistVideoRef.current.srcObject) {
      stylistVideoRef.current.srcObject.getTracks().forEach(t => t.stop());
      stylistVideoRef.current.srcObject = null;
    }
    setIsStylistCamActive(false);
  };

  const captureStylistPhoto = () => {
    if (stylistVideoRef.current && stylistCanvasRef.current) {
      const c = stylistCanvasRef.current;
      const v = stylistVideoRef.current;
      c.width = v.videoWidth || 640;
      c.height = v.videoHeight || 480;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      setStylistPhoto(c.toDataURL('image/jpeg', 0.85));
      stopStylistCam();
    }
  };

  const handleWhatsAppChat = (phone, title) => {
    window.open(`https://api.whatsapp.com/send?phone=${phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(`Namaste! Checking dress '${title}' on Zyro.`)}`, '_blank');
  };

  const handleApproveRefund = (ord) => {
    setActiveRentals(activeRentals.map(o => o.id === ord.id ? { ...o, status: 'Verified: Full Deposit Refunded' } : o));
    alert(`✅ Deposit of ₹${ord.securityDeposit} approved for refund to customer UPI!`);
  };

  const handleReportDamageWithProof = (ord, reason, fee, proofUrl) => {
    setActiveRentals(activeRentals.map(o => o.id === ord.id ? { ...o, status: `Damage Fee Deducted (₹${fee})`, inspectionNote: reason, damageProofUrl: proofUrl } : o));
    alert(`⚠️ Damage report submitted with photo proof for Order #${ord.id}!`);
  };

  // Payment Execution with Confetti Celebration
  const handleExecutePayment = () => {
    setPaymentStatus('processing');
    const txn = `ZYR-TXN-${Math.floor(100000 + Math.random() * 900000)}`;
    setTransactionId(txn);

    setTimeout(() => {
      setPaymentStatus('success');
      triggerConfetti(); // 🎉 Trigger Confetti Burst!

      const total = (selectedProduct.rentalPricePerDay * calculatedDays) + (selectedProduct.securityDeposit || 0) + (deliveryMethod === 'delivery' ? 150 : 0);
      const newOrd = {
        id: `ZYR-${Math.floor(1000 + Math.random() * 9000)}`,
        title: selectedProduct.title,
        category: selectedProduct.category,
        days: calculatedDays,
        rentalDates: `${rentalStartDate || 'Selected'} to ${rentalEndDate || 'End'}`,
        amount: `₹${total}`,
        securityDeposit: selectedProduct.securityDeposit || 4000,
        pickupAddress: selectedProduct.pickupAddress || 'Banjara Hills, Hyderabad',
        pickupMode: deliveryMethod === 'self-pickup' ? 'Self-Pickup' : 'Courier Delivery',
        ownerPhone: selectedProduct.ownerPhone || '9848012345',
        status: 'Booking Confirmed (Paid via UPI)',
        txnId: txn,
        date: 'Today'
      };
      setActiveRentals([newOrd, ...activeRentals]);
    }, 1200);
  };

  // Chatbot Handler
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;
    const userText = chatInput.trim();
    const updated = [...chatMessages, { sender: 'user', text: userText }];
    setChatMessages(updated);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setChatMessages([...updated, { sender: 'bot', text: data.reply || data.message }]);
    } catch {
      setTimeout(() => {
        let rep = "Namaste! Velvet lehengas & Kundan jewellery wedding receptions ki royal ga untai.";
        if (userText.toLowerCase().includes('deposit')) rep = "Security deposit 100% refundable! Verification tharuvatha UPI ki transfer avtundi.";
        setChatMessages([...updated, { sender: 'bot', text: rep }]);
      }, 500);
    } finally {
      setIsChatLoading(false);
    }
  };

  const navigateTo = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const curatedTotals = calculateCuratedTotal();

  return (
    <div>
      {/* ================== NAVBAR ================== */}
      <Navbar
        currentUser={currentUser}
        selectedRole={selectedRole}
        activeView={activeView}
        wishlistCount={wishlist.length}
        authView={authView}
        navigateTo={navigateTo}
        onLogout={() => { setCurrentUser(null); setSelectedRole(null); setAuthView('role-select'); }}
        onSwitchRole={() => { setAuthView('role-select'); setSelectedRole(null); }}
      />

      <div className="container">
        {/* ================== AUTH FLOW ================== */}
        {!currentUser ? (
          <div>
            {authView === 'role-select' ? (
              <RoleSelect 
                onSelectRole={(role) => {
                  setSelectedRole(role);
                  setAuthView('register');
                }} 
              />
            ) : (
              <div style={{ maxWidth: '440px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#db2777', background: '#fdf2f8', padding: '3px 12px', borderRadius: '12px' }}>
                    {selectedRole === 'customer' ? '🛍️ Customer Portal' : '👗 Renter & Boutique Partner Portal'}
                  </span>
                </div>

                {authView === 'login' ? (
                  <Login 
                    onLoginSuccess={(u) => { 
                      setCurrentUser(u); 
                      setActiveView(selectedRole === 'renter' ? 'renter-dashboard' : 'shop'); 
                    }} 
                    onSwitchToRegister={() => setAuthView('register')} 
                  />
                ) : (
                  <Register onSwitchToLogin={() => setAuthView('login')} />
                )}

                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <button className="btn-secondary" style={{ fontSize: '0.8rem' }} onClick={() => { setAuthView('role-select'); setSelectedRole(null); }}>
                    ← Back to Role Selection
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : activeView === 'ai-stylist' ? (
          /* ================== AI STYLIST STUDIO ================== */
          <div className="profile-wrapper">
            <button onClick={() => navigateTo('shop')} className="btn-secondary" style={{ marginBottom: '1.2rem', fontWeight: 700 }}>
              ← Back to Catalog Dashboard
            </button>

            <div style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #ffffff 100%)', border: '2px solid #fce7f0', borderRadius: '24px', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#831843' }}>✨ Zyro AI Virtual Stylist & Event Matchmaker</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '14px', margin: '1.5rem 0' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#705b64' }}>Your Photo</label>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={startStylistCam}>📷 Camera</button>
                    <label className="btn-secondary" style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
                      📁 Upload
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                        const f = e.target.files[0];
                        if (f) {
                          const r = new FileReader();
                          r.onloadend = () => setStylistPhoto(r.result);
                          r.readAsDataURL(f);
                        }
                      }} />
                    </label>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#705b64' }}>Event Type</label>
                  <select style={{ width: '100%', padding: '9px', borderRadius: '10px', border: '1px solid #fbcfe8', marginTop: '6px' }} value={stylistInputs.eventType} onChange={e => setStylistInputs({ ...stylistInputs, eventType: e.target.value })}>
                    <option>Wedding Reception</option><option>Sangeet Night</option><option>Haldi Ceremony</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#705b64' }}>Complexion</label>
                  <select style={{ width: '100%', padding: '9px', borderRadius: '10px', border: '1px solid #fbcfe8', marginTop: '6px' }} value={stylistInputs.skinTone} onChange={e => setStylistInputs({ ...stylistInputs, skinTone: e.target.value })}>
                    <option>Fair / Cool Undertone</option><option>Wheatish / Warm Undertone</option><option>Dusky / Deep Undertone</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#705b64' }}>Body Silhouette</label>
                  <select style={{ width: '100%', padding: '9px', borderRadius: '10px', border: '1px solid #fbcfe8', marginTop: '6px' }} value={stylistInputs.bodyFit} onChange={e => setStylistInputs({ ...stylistInputs, bodyFit: e.target.value })}>
                    <option>Hourglass / Structured</option><option>Flared A-Line</option><option>Slim Fit</option>
                  </select>
                </div>
              </div>

              {isStylistCamActive && (
                <div style={{ background: '#fff5f8', padding: '10px', borderRadius: '12px', textAlign: 'center', marginBottom: '12px' }}>
                  <video ref={stylistVideoRef} autoPlay playsInline style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '10px' }} />
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '8px' }}>
                    <button type="button" className="btn-primary" onClick={captureStylistPhoto}>📸 Snap Photo</button>
                    <button type="button" className="btn-secondary" onClick={stopStylistCam}>Cancel</button>
                  </div>
                </div>
              )}
              <canvas ref={stylistCanvasRef} style={{ display: 'none' }} />

              <button className="btn-primary" onClick={generateAIStylistLook}>✨ Generate Lookboard</button>

              {stylistResult && (
                <div style={{ marginTop: '1.5rem', background: '#fff', border: '1.5px solid #fbcfe8', borderRadius: '18px', padding: '1.2rem' }}>
                  <h3 style={{ color: '#831843' }}>{stylistResult.theme}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 700 }}>✔ {stylistResult.eventVerdict}</p>
                  <div style={{ margin: '12px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label><input type="checkbox" checked={selectedCuratedItems.outfit} onChange={e => setSelectedCuratedItems({ ...selectedCuratedItems, outfit: e.target.checked })} /> 👗 {stylistResult.outfit.title} (₹{stylistResult.outfit.price}/day)</label>
                    <label><input type="checkbox" checked={selectedCuratedItems.jewellery} onChange={e => setSelectedCuratedItems({ ...selectedCuratedItems, jewellery: e.target.checked })} /> 💎 {stylistResult.jewellery.title} (₹{stylistResult.jewellery.price}/day)</label>
                    <label><input type="checkbox" checked={selectedCuratedItems.accessory} onChange={e => setSelectedCuratedItems({ ...selectedCuratedItems, accessory: e.target.checked })} /> 👛 {stylistResult.accessory.title} (₹{stylistResult.accessory.price}/day)</label>
                  </div>
                  <strong>Total: ₹{curatedTotals.total}</strong>
                  <button className="btn-primary" style={{ marginLeft: '12px' }} onClick={() => { setSelectedProduct({ title: stylistResult.theme, category: 'Curated Ensemble', rentalPricePerDay: curatedTotals.rent, securityDeposit: curatedTotals.deposit, imageUrl: stylistResult.outfit.imageUrl, pickupAddress: 'Road 12, Banjara Hills, Hyd', ownerPhone: '9848012345' }); setIsCheckoutOpen(true); }}>🛍️ Rent Selected Look</button>
                </div>
              )}
            </div>
          </div>
        ) : activeView === 'renter-dashboard' ? (
          /* ================== RENTER DASHBOARD ================== */
          <RenterDashboard
            renterListings={renterListings}
            activeRentals={activeRentals}
            onBackToShop={() => navigateTo('shop')}
            onOpenAddItemModal={() => alert("Outfit Listing Modal")}
            onApproveRefund={handleApproveRefund}
            onReportDamageWithProof={handleReportDamageWithProof}
            onWhatsAppChat={handleWhatsAppChat}
          />
        ) : activeView === 'profile' ? (
          /* ================== CUSTOMER PROFILE ================== */
          <CustomerProfile
            currentUser={currentUser}
            profileTab={profileTab}
            setProfileTab={setProfileTab}
            activeRentals={activeRentals}
            pastRentals={pastRentals}
            onBackToShop={() => navigateTo('shop')}
            onWhatsAppChat={handleWhatsAppChat}
            onSubmitReview={(id, rating, comment) => {
              setPastRentals(pastRentals.map(o => o.id === id ? { ...o, review: { rating, comment } } : o));
            }}
          />
        ) : (
          /* ================== SHOP DASHBOARD ================== */
          <div>
            <div onClick={() => navigateTo('ai-stylist')} style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fff0f5 100%)', border: '2px dashed #f472b6', borderRadius: '24px', padding: '1.5rem 2rem', margin: '1rem 0 1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: 0, color: '#831843' }}>✨ Zyro AI Virtual Stylist & Event Matchmaker</h3>
                <p style={{ margin: '4px 0 0', color: '#705b64', fontSize: '0.85rem' }}>Personalized recommendations tailored for your event.</p>
              </div>
              <div style={{ fontWeight: 800, color: '#db2777' }}>Open Stylist Studio →</div>
            </div>

            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              isListening={isListening}
              onVoiceSearch={handleVoiceSearch}
              searchImagePreview={searchImagePreview}
              onImageSearchUpload={handleImageSearchUpload}
              onClearImageSearch={() => { setSearchImagePreview(null); setSearchTerm(''); }}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onOpenAddItem={handleOpenAddItem}
            />

            {loading ? <p>Loading items...</p> : (
              <div className="cards-grid">
                {filteredItems.map(item => (
                  <div key={item.id} className="product-card" onClick={() => setSelectedProduct(item)}>
                    <button className="like-btn" onClick={(e) => { e.stopPropagation(); wishlist.includes(item.id) ? setWishlist(wishlist.filter(i => i !== item.id)) : setWishlist([...wishlist, item.id]); }}>
                      {wishlist.includes(item.id) ? '❤️' : '🤍'}
                    </button>
                    <img src={item.imageUrl} alt={item.title} className="product-img" />
                    <div className="product-body">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="tag tag-cat">{item.category}</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#b45309' }}>
                          ⭐ {item.rating || '4.9'} ({item.reviewsCount || '15'})
                        </span>
                      </div>
                      <h3 className="product-title">{item.title}</h3>
                      <p style={{ fontSize: '0.75rem', color: '#705b64' }}>📍 {item.pickupAddress || 'Hyderabad'}</p>
                      <div className="product-pricing">
                        <span className="price">₹{item.rentalPricePerDay} / day</span>
                        <span style={{ fontSize: '0.8rem', color: '#705b64' }}>Deposit: ₹{item.securityDeposit}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================== PRODUCT DETAILS MODAL ================== */}
        {selectedProduct && !isCheckoutOpen && !isPaymentOpen && (
          <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button className="btn-secondary" style={{ padding: '4px 12px', fontSize: '0.85rem' }} onClick={() => setSelectedProduct(null)}>
                  ← Back to Catalog
                </button>
                <button className="btn-secondary" style={{ padding: '4px 10px' }} onClick={() => setSelectedProduct(null)}>✕</button>
              </div>

              <div style={{ display: 'flex', gap: '1.2rem' }}>
                <img src={selectedProduct.imageUrl} alt={selectedProduct.title} style={{ width: '240px', height: '240px', objectFit: 'cover', borderRadius: '14px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 800 }}>⭐ {selectedProduct.rating || '4.9'} Verified Rating</div>
                  <h2 style={{ margin: '4px 0' }}>{selectedProduct.title}</h2>
                  <p className="price" style={{ fontSize: '1.4rem' }}>₹{selectedProduct.rentalPricePerDay} / day</p>
                  
                  <div style={{ background: '#fff9fb', border: '1px solid #fce7f0', padding: '10px', borderRadius: '12px', margin: '10px 0' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 800, color: '#be185d', display: 'block', marginBottom: '6px' }}>
                      📅 Select Rental Dates (Calendar Range):
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="date" value={rentalStartDate} onChange={e => setRentalStartDate(e.target.value)} style={{ flex: 1, padding: '6px', borderRadius: '8px', border: '1px solid #fbcfe8', fontSize: '0.8rem' }} />
                      <input type="date" value={rentalEndDate} onChange={e => setRentalEndDate(e.target.value)} style={{ flex: 1, padding: '6px', borderRadius: '8px', border: '1px solid #fbcfe8', fontSize: '0.8rem' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#705b64', marginTop: '4px', display: 'block' }}>
                      Calculated Duration: <strong>{calculatedDays} Days</strong>
                    </span>
                  </div>

                  <button className="btn-primary" style={{ width: '100%', padding: '10px' }} onClick={() => setIsCheckoutOpen(true)}>
                    🛍️ Proceed to Rent ({calculatedDays} Days)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================== CHECKOUT MODAL ================== */}
        {selectedProduct && isCheckoutOpen && (
          <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button className="btn-secondary" style={{ padding: '3px 10px', fontSize: '0.85rem' }} onClick={() => setIsCheckoutOpen(false)}>
                  ← Back
                </button>
                <h3 style={{ color: '#be185d', margin: 0 }}>Rental Confirmation</h3>
                <span></span>
              </div>

              <p>Outfit: <strong>{selectedProduct.title}</strong></p>
              <p style={{ fontSize: '0.85rem', color: '#4b5563' }}>Dates: <strong>{rentalStartDate || 'Selected'} to {rentalEndDate || 'End'} ({calculatedDays} Days)</strong></p>

              <div style={{ background: '#fdf2f8', padding: '10px', borderRadius: '10px', margin: '10px 0' }}>
                <label><input type="radio" checked={deliveryMethod === 'self-pickup'} onChange={() => setDeliveryMethod('self-pickup')} /> 🏪 Self-Pickup (Free)</label><br/>
                <label><input type="radio" checked={deliveryMethod === 'delivery'} onChange={() => setDeliveryMethod('delivery')} /> 🚚 Courier (+₹150)</label>
              </div>

              <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', margin: '8px 0' }}>
                <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} />
                I agree to the Rental Care & Damage Protection Policy.
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1rem' }}>
                <button className="btn-secondary" onClick={() => setIsCheckoutOpen(false)}>Cancel</button>
                <button className="btn-primary" onClick={() => {
                  if (!agreedToTerms) return alert("Please accept damage policy.");
                  setIsCheckoutOpen(false);
                  setIsPaymentOpen(true);
                  setPaymentStatus('idle');
                }}>
                  💳 Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================== RENTER PROMOTIONAL & SETUP MODAL ================== */}
        <RenterPromoModal
          isOpen={isPromoModalOpen}
          onClose={() => setIsPromoModalOpen(false)}
          onUpgrade={handleUpgradeToRenter}
        />

        {/* ================== PAYMENT MODAL ================== */}
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
          selectedProduct={selectedProduct}
          rentDays={calculatedDays}
          deliveryMethod={deliveryMethod}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          paymentStatus={paymentStatus}
          transactionId={transactionId}
          onExecutePayment={handleExecutePayment}
          onFinishBooking={() => { setIsPaymentOpen(false); setSelectedProduct(null); setAgreedToTerms(false); }}
        />

        {/* ================== AI CHATBOT ================== */}
        <AIChatbot
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
          chatMessages={chatMessages}
          chatInput={chatInput}
          setChatInput={setChatInput}
          isChatLoading={isChatLoading}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}

export default App;