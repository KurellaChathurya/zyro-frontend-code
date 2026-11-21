import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { getAllItems, createItem } from './services/itemService';
import Register from './components/Register';
import Login from './components/Login';
import OwnerEarningsSummary from './components/OwnerEarningsSummary';
import CatalogFilters from './components/CatalogFilters';
import SareeDrapingAddon from './components/SareeDrapingAddon';
import SareeDraperPortal from './components/SareeDraperPortal';
import { HowZyroWorksModal, LiveOrderTrackerBanner } from './components/ZyroDemoFeatures';
import './App.css';

import { SHOWCASE_PRODUCTS } from './data/showcaseProducts';

function MainApp({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState('customer');
  const [activeView, setActiveView] = useState('shop');
  const [profileTab, setProfileTab] = useState('orders');

  // Products & Filters
  const [items, setItems] = useState(SHOWCASE_PRODUCTS);
  const [filteredItems, setFilteredItems] = useState(SHOWCASE_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedGender, setSelectedGender] = useState('ALL');
  const [filterSize, setFilterSize] = useState('ALL');
  const [maxBudget, setMaxBudget] = useState('ALL');

  const [isListening, setIsListening] = useState(false);
  const [isImageSearching, setIsImageSearching] = useState(false);
  const [searchImagePreview, setSearchImagePreview] = useState(null);

  // AI Stylist Studio States
  const [stylistInputs, setStylistInputs] = useState({
    eventType: 'Wedding Reception',
    skinTone: 'Fair / Cool Undertone',
    bodyFit: 'Hourglass / Regular Fit',
    budgetRange: '2500'
  });
  const [userStylistPhoto, setUserStylistPhoto] = useState(null);
  const [isStylistCameraActive, setIsStylistCameraActive] = useState(false);
  const [stylistResult, setStylistResult] = useState(null);
  const [selectedBundleItems, setSelectedBundleItems] = useState({
    outfit: true,
    jewellery: true,
    accessory: false
  });

  // Floating Chatbot States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Namaste! Welcome to Zyro Couture. Ask me about dresses, sizing, pickup locations, or wedding styling!' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Checkout & Product Details
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [rentDays, setRentDays] = useState(3);
  const [deliveryMethod, setDeliveryMethod] = useState('self-pickup');
  const [includeDraping, setIncludeDraping] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Renter Inspection & Listing States
  const [inspectingOrder, setInspectingOrder] = useState(null);
  const [damageReason, setDamageReason] = useState('');
  const [damageFee, setDamageFee] = useState(0);
  const [alertMessage, setAlertMessage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: 'Dresses',
    rentalPricePerDay: '',
    securityDeposit: '',
    sizes: 'M, L',
    bookedDates: '',
    pickupAddress: '',
    city: 'Hyderabad',
    pincode: '',
    pickupMode: 'Both (Self-Pickup & Courier)',
    ownerPhone: '9876543210',
    imageUrl: '',
    available: true
  });
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const stylistVideoRef = useRef(null);
  const stylistCanvasRef = useRef(null);
  const imageSearchInputRef = useRef(null);

  // Orders & Renter Wardrobe Data
  const [activeRentals, setActiveRentals] = useState([
    {
      id: 'ZYR-9041',
      title: 'Pink Heritage Bridal Silk Lehenga',
      category: 'Dresses',
      days: 3,
      pickupAddress: 'Road No 12, Banjara Hills, Hyderabad',
      pickupMode: 'Self-Pickup by Customer',
      ownerPhone: '9848012345',
      securityDeposit: 4000,
      amount: '₹4,500',
      status: 'Returned - Inspection Pending',
      inspectionNote: '',
      date: '03 Oct 2026'
    }
  ]);

  const [pastRentals] = useState([
    {
      id: 'ZYR-8120',
      title: 'Emerald Kundan Choker Necklace Set',
      category: 'Jewellery',
      days: 2,
      pickupAddress: 'Kondapur, Hyderabad',
      pickupMode: 'Zyro Courier',
      amount: '₹1,600',
      status: 'Returned & Full Deposit Refunded',
      date: '20 Sep 2026'
    }
  ]);

  const [renterListings, setRenterListings] = useState([
    {
      id: 'LST-101',
      title: 'Heavy Zardozi Velvet Bridal Lehenga',
      category: 'Dresses',
      rentalPricePerDay: 2499,
      securityDeposit: 5000,
      sizes: 'S, M, L',
      bookedDates: '12 Oct - 15 Oct 2026',
      pickupAddress: 'Flat 204, Fortune Heights, Madhapur',
      city: 'Hyderabad',
      ownerPhone: '9848012345',
      status: 'Active / Available',
      imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60'
    }
  ]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'DRAPER') {
        setSelectedPortal('draper');
        setActiveView('draper-portal');
      } else if (currentUser.role === 'RENTER' || currentUser.role === 'OWNER') {
        setSelectedPortal('renter');
        setActiveView('renter-dashboard');
      } else {
        setSelectedPortal('customer');
        setActiveView('shop');
      }
    }
  }, [currentUser]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  const fetchItems = () => {
    setLoading(true);
    getAllItems()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setItems([...res.data, ...SHOWCASE_PRODUCTS]);
        }
        setLoading(false);
      })
      .catch(() => {
        setItems(SHOWCASE_PRODUCTS);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Combined Filter Logic (Category + Size + Max Budget + Search)
  useEffect(() => {
    let result = items;
    if (activeView === 'wishlist') {
      result = result.filter(item => wishlist.includes(item.id));
    }
    if (selectedCategory !== 'ALL') {
      result = result.filter(item => item.category?.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (filterSize !== 'ALL') {
      result = result.filter(item => (item.sizes || 'S, M, L, XL').toUpperCase().includes(filterSize));
    }
    if (maxBudget !== 'ALL') {
      result = result.filter(item => Number(item.rentalPricePerDay) <= Number(maxBudget));
    }
    if (selectedGender !== 'ALL') {
      result = result.filter(item => {
        const text = ((item.title || '') + ' ' + (item.description || '')).toLowerCase();
        return text.includes(selectedGender.toLowerCase());
      });
    }
    if (searchTerm.trim() !== '') {
      result = result.filter(item =>
        (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.pickupAddress || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.city || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredItems(result);
  }, [searchTerm, selectedCategory, selectedGender, filterSize, maxBudget, activeView, items, wishlist]);

  const handlePortalClick = (portalName) => {
    setSelectedPortal(portalName);
    if (portalName === 'ai-stylist') {
      setActiveView('ai-stylist');
    } else if (portalName === 'customer') {
      if (currentUser) {
        setActiveView('shop');
      } else {
        navigate('/register', { state: { role: 'customer' } });
      }
    } else if (portalName === 'draper') {
      if (currentUser) {
        setActiveView('draper-portal');
      } else {
        navigate('/register', { state: { role: 'draper' } });
      }
    } else if (portalName === 'renter') {
      if (currentUser) {
        setActiveView('renter-dashboard');
      } else {
        navigate('/register', { state: { role: 'renter' } });
      }
    }
  };

  const handleGenerateAIStylistLook = () => {
    if (!userStylistPhoto) {
      return alert("Please upload or snap your photo first so AI can match your complexion & silhouette!");
    }
    const budgetNum = parseInt(stylistInputs.budgetRange) || 3000;
    const matchingDress = items.find(i => i.rentalPricePerDay <= budgetNum && i.category === 'Dresses') || SHOWCASE_PRODUCTS[0];

    setStylistResult({
      analysis: `Tailored for ${stylistInputs.skinTone} & ${stylistInputs.bodyFit} for ${stylistInputs.eventType}.`,
      outfit: {
        id: matchingDress.id,
        title: matchingDress.title,
        price: matchingDress.rentalPricePerDay,
        securityDeposit: matchingDress.securityDeposit || 3500,
        imageUrl: matchingDress.imageUrl,
        pickupAddress: matchingDress.pickupAddress || 'Banjara Hills, Hyderabad'
      },
      jewellery: {
        id: 'JW-302',
        title: 'Polki Kundan Heritage Choker Set with Drop Jhumkas',
        price: 599,
        securityDeposit: 1500,
        imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60'
      },
      accessory: {
        id: 'AC-105',
        title: 'Hand-Embroidered Velvet Zari Clutch / Potli',
        price: 299,
        securityDeposit: 800,
        imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60'
      }
    });
    setSelectedBundleItems({ outfit: true, jewellery: true, accessory: false });
  };

  const getBundleTotal = () => {
    if (!stylistResult) return 0;
    let total = 0;
    if (selectedBundleItems.outfit) total += stylistResult.outfit.price;
    if (selectedBundleItems.jewellery) total += stylistResult.jewellery.price;
    if (selectedBundleItems.accessory) total += stylistResult.accessory.price;
    return total;
  };

  const handleBookCuratedLook = () => {
    if (!currentUser) {
      alert("Please Sign In or Register first to book your curated look!");
      return navigate('/login', { state: { role: 'customer' } });
    }
    if (!selectedBundleItems.outfit && !selectedBundleItems.jewellery && !selectedBundleItems.accessory) {
      return alert("Select at least one item to proceed!");
    }
    setSelectedProduct({
      title: `AI Curated Look (${stylistInputs.eventType})`,
      category: 'Curated Bundle',
      rentalPricePerDay: getBundleTotal(),
      securityDeposit: (selectedBundleItems.outfit ? stylistResult.outfit.securityDeposit : 0) +
                       (selectedBundleItems.jewellery ? stylistResult.jewellery.securityDeposit : 0),
      pickupAddress: stylistResult.outfit.pickupAddress,
      ownerPhone: '9876543210'
    });
    setIsCheckoutOpen(true);
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice search not supported in this browser.");
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => { setSearchTerm(e.results[0][0].transcript); setIsListening(false); };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleImageSearchUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSearchImagePreview(reader.result);
        setIsImageSearching(true);
        const clean = file.name.split('.')[0].replace(/[-_]/g, ' ');
        setSearchTerm(clean.length > 2 ? clean : 'Lehenga');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || isChatLoading) return;
    const userText = inputMsg.trim();
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMsg('');
    setIsChatLoading(true);
    try {
      const res = await fetch('https://zyro-backend-wsml.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { sender: 'bot', text: data.reply || data.response || "How can I assist with your styling?" }]);
    } catch {
      setChatMessages(prev => [...prev, { sender: 'bot', text: 'Zyro AI is waking up. Please try sending your message again in a few seconds!' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleWhatsAppChat = (phone, title) => {
    const text = `Namaste! Zyro app lo mee '${title}' outfit gurinchi pickup & availability coordinate cheyadaniki message chesthunaanu.`;
    window.open(`https://api.whatsapp.com/send?phone=${phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleApproveRefund = (ord) => {
    setAlertMessage(`✅ Verification Complete: Order #${ord.id} has no damage. Security deposit ₹${ord.securityDeposit} initiated to customer!`);
    setActiveRentals(activeRentals.map(o => o.id === ord.id ? { ...o, status: 'Verified: Full Deposit Refunded' } : o));
    setInspectingOrder(null);
  };

  const handleReportDamage = (ord) => {
    if (!damageReason.trim() || damageFee <= 0) return alert("Enter damage reason & deduction fee.");
    const remaining = (ord.securityDeposit || 4000) - Number(damageFee);
    setAlertMessage(`⚠️ Inspection Alert: Order #${ord.id} damage reported: '${damageReason}'. Deducted ₹${damageFee}. Remaining ₹${remaining} refunded.`);
    setActiveRentals(activeRentals.map(o => o.id === ord.id ? { ...o, status: `Damage Deducted (₹${damageFee})`, inspectionNote: damageReason } : o));
    setInspectingOrder(null);
    setDamageReason('');
    setDamageFee(0);
  };

  const startStylistCamera = async () => {
    setIsStylistCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (stylistVideoRef.current) stylistVideoRef.current.srcObject = stream;
    } catch { alert("Camera permission denied."); setIsStylistCameraActive(false); }
  };

  const stopStylistCamera = () => {
    if (stylistVideoRef.current?.srcObject) {
      stylistVideoRef.current.srcObject.getTracks().forEach(t => t.stop());
      stylistVideoRef.current.srcObject = null;
    }
    setIsStylistCameraActive(false);
  };

  const captureStylistPhoto = () => {
    if (stylistVideoRef.current && stylistCanvasRef.current) {
      const c = stylistCanvasRef.current;
      const v = stylistVideoRef.current;
      c.width = v.videoWidth || 640; c.height = v.videoHeight || 480;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      setUserStylistPhoto(c.toDataURL('image/jpeg', 0.85));
      stopStylistCamera();
    }
  };

  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch { alert("Camera permission denied."); setIsCameraActive(false); }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const c = canvasRef.current;
      const v = videoRef.current;
      c.width = v.videoWidth || 640; c.height = v.videoHeight || 480;
      c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      const url = c.toDataURL('image/jpeg', 0.85);
      setCapturedImage(url);
      setNewItem(prev => ({ ...prev, imageUrl: url }));
      stopCamera();
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.title.trim() || !newItem.pickupAddress.trim()) return alert("Title & Pickup Address are required!");
    setSubmitting(true);
    try {
      const img = capturedImage || newItem.imageUrl || SHOWCASE_PRODUCTS[0].imageUrl;
      const payload = {
        ...newItem,
        rentalPricePerDay: parseFloat(newItem.rentalPricePerDay) || 0,
        securityDeposit: parseFloat(newItem.securityDeposit) || 0,
        imageUrl: img
      };
      await createItem(payload);
      const created = { id: `LST-${Date.now().toString().slice(-4)}`, ...payload, bookedDates: payload.bookedDates || 'Available Now', status: 'Active / Available' };
      setRenterListings([created, ...renterListings]);
      setItems([created, ...items]);
      alert("🎉 Outfit listed on Zyro!");
      setIsModalOpen(false);
      setCapturedImage(null);
    } catch { alert("Listing error."); } finally { setSubmitting(false); }
  };

  const handleConfirmOrder = () => {
    if (!agreedToTerms) return alert("Please agree to the Garment Care & Damage Protection Policy.");
    const total = (selectedProduct.rentalPricePerDay * rentDays) +
                  (selectedProduct.securityDeposit || 0) +
                  (deliveryMethod === 'delivery' ? 150 : 0) +
                  (includeDraping ? 299 : 0);
    const newOrd = {
      id: `ZYR-${Math.floor(1000 + Math.random() * 9000)}`,
      title: includeDraping ? `${selectedProduct.title} + Saree Draping` : selectedProduct.title,
      category: selectedProduct.category,
      days: rentDays,
      amount: `₹${total}`,
      securityDeposit: selectedProduct.securityDeposit || 4000,
      pickupAddress: selectedProduct.pickupAddress || 'Banjara Hills, Hyderabad',
      pickupMode: deliveryMethod === 'self-pickup' ? 'Self-Pickup by Customer' : 'Zyro Courier',
      ownerPhone: selectedProduct.ownerPhone || '9876543210',
      status: 'Booking Confirmed',
      date: 'Today'
    };
    setActiveRentals([newOrd, ...activeRentals]);
    setIsCheckoutOpen(false);
    setSelectedProduct(null);
    setIncludeDraping(false);
    setAgreedToTerms(false);
    alert("🎉 Rental Booking Confirmed!");
  };

  const handleLogout = () => {
    localStorage.removeItem('zyroUser');
    setCurrentUser(null);
    setActiveView('shop');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafaf9' }}>
      
      {alertMessage && (
        <div style={{ background: '#fdf2f8', borderBottom: '2px solid #db2777', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50 }}>
          <span style={{ fontSize: '0.85rem', color: '#be185d', fontWeight: 700 }}>{alertMessage}</span>
          <button className="btn-secondary" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => setAlertMessage(null)}>✕</button>
        </div>
      )}

      <div style={{ display: 'flex', flex: 1, flexWrap: 'wrap' }}>
        
        {/* LEFT SIDEBAR PANEL */}
        <aside style={{
          width: '310px',
          minWidth: '290px',
          background: '#ffffff',
          borderRight: '1.5px solid #fce7f0',
          padding: '1.5rem 1.2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '4px 0 24px rgba(236,72,153,0.03)'
        }}>
          <div>
            <div 
              onClick={() => setActiveView('shop')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '1.8rem', paddingBottom: '1rem', borderBottom: '1.5px solid #fdf2f8' }}
            >
              <img src="/logo.png" alt="Zyro" style={{ width: '36px', height: '36px', borderRadius: '10px' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <div>
                <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: '#e11d48', letterSpacing: '-0.5px' }}>Zyro.</h1>
                <span style={{ fontSize: '0.7rem', color: '#705b64', fontWeight: 700 }}>Peer-to-Peer Rental Couture</span>
              </div>
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.8rem' }}>
              Select Portal
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '1.8rem' }}>
              <div
                onClick={() => handlePortalClick('customer')}
                style={{
                  padding: '14px',
                  borderRadius: '16px',
                  border: `2px solid ${selectedPortal === 'customer' ? '#e11d48' : '#fce7f0'}`,
                  background: selectedPortal === 'customer' ? '#fff1f2' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🛍️</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#1f161a' }}>Customer Portal</h4>
                    <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#705b64' }}>Browse, rent dresses & jewellery</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => handlePortalClick('renter')}
                style={{
                  padding: '14px',
                  borderRadius: '16px',
                  border: `2px solid ${selectedPortal === 'renter' ? '#e11d48' : '#fce7f0'}`,
                  background: selectedPortal === 'renter' ? '#fff1f2' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.5rem' }}>👗</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#1f161a' }}>Owner / Renter Portal</h4>
                    <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#705b64' }}>List outfits & manage pickups</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => handlePortalClick('draper')}
                style={{
                  padding: '14px',
                  borderRadius: '16px',
                  border: `2px solid ${selectedPortal === 'draper' ? '#e11d48' : '#fce7f0'}`,
                  background: selectedPortal === 'draper' ? '#fff1f2' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.5rem' }}>🥻</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#1f161a' }}>Saree Draper Portal</h4>
                    <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#705b64' }}>Book stylists or register as draper</p>
                  </div>
                </div>
              </div>

              <div
                onClick={() => handlePortalClick('ai-stylist')}
                style={{
                  padding: '14px',
                  borderRadius: '16px',
                  border: `2px solid ${selectedPortal === 'ai-stylist' ? '#be185d' : '#fbcfe8'}`,
                  background: selectedPortal === 'ai-stylist' ? 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)' : '#fff9fb',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.5rem' }}>✨</span>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#831843' }}>AI Virtual Stylist</h4>
                    <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#be185d' }}>Photo match & look builder</p>
                  </div>
                </div>
              </div>
            </div>

            {currentUser && (
              <div style={{ background: '#fff1f2', padding: '14px', borderRadius: '18px', border: '1px solid #fecdd3' }}>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#1f161a' }}>👤 {currentUser.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#705b64', marginBottom: '12px' }}>{currentUser.phone || currentUser.email}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button className="btn-secondary" style={{ width: '100%', textAlign: 'left', fontSize: '0.8rem' }} onClick={() => setActiveView('shop')}>
                    🏠 Browse Marketplace
                  </button>
                  <button className="btn-secondary" style={{ width: '100%', textAlign: 'left', fontSize: '0.8rem' }} onClick={() => setActiveView('wishlist')}>
                    ❤️ Saved Wishlist ({wishlist.length})
                  </button>
                  <button className="btn-secondary" style={{ width: '100%', textAlign: 'left', fontSize: '0.8rem' }} onClick={() => setActiveView('profile')}>
                    📦 My Rentals & Refunds
                  </button>
                  <button className="btn-secondary" style={{ width: '100%', textAlign: 'left', fontSize: '0.8rem' }} onClick={() => setActiveView('renter-dashboard')}>
                    👗 Renter Wardrobe Panel
                  </button>
                  <button className="btn-primary" style={{ width: '100%', marginTop: '6px', fontSize: '0.8rem' }} onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          <div style={{ fontSize: '0.7rem', color: '#9ca3af', textAlign: 'center', marginTop: '1.5rem' }}>
            Zyro Royal Collections • Hyderabad
          </div>
        </aside>

        {/* RIGHT MAIN SHOWCASE & WORKSPACE */}
        <main style={{ flex: 1, padding: '1.5rem 2rem', minWidth: '320px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: '#1f161a' }}>
                {activeView === 'draper-portal' ? '🥻 Saree Draper Service Portal' :
                 activeView === 'ai-stylist' ? '✨ AI Virtual Stylist Studio' :
                 activeView === 'renter-dashboard' ? '👗 Renter Wardrobe & Inspections' :
                 activeView === 'profile' ? '👤 My Rental Account' :
                 activeView === 'wishlist' ? '❤️ My Saved Wishlist' :
                 'Royal Couture, Dresses & Jewellery'}
              </h2>
              <p style={{ margin: '2px 0 0', fontSize: '0.85rem', color: '#705b64' }}>
                Rent designer ethnic wear directly from verified local owners in your city
              </p>
            </div>

            {!currentUser && (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-secondary" onClick={() => navigate('/login', { state: { role: 'customer' } })}>
                  Sign In
                </button>
                <button className="btn-primary" onClick={() => navigate('/register', { state: { role: 'customer' } })}>
                  Create Account
                </button>
              </div>
            )}
          </div>

          <div style={{ background: "linear-gradient(90deg, #e11d48, #be185d)", color: "#fff", padding: "10px 16px", borderRadius: "14px", marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 800 }}>🎉 Zyro Wedding Combo: Rent any Saree/Lehenga + Book a 🥻 Saree Draper & get instant ₹100 OFF!</span>
            <button type="button" onClick={() => setActiveView('draper-portal')} style={{ background: "#fff", color: "#be185d", border: "none", padding: "5px 12px", borderRadius: "10px", fontWeight: 800, fontSize: "0.75rem", cursor: "pointer" }}>Explore 🥻 Drapers</button>
          </div>
          <LiveOrderTrackerBanner />
          {showHowItWorks && <HowZyroWorksModal onClose={() => setShowHowItWorks(false)} />}
          {activeView === 'draper-portal' && (
            <SareeDraperPortal currentUser={currentUser} onBackToShop={() => setActiveView('shop')} />
          )}

          {/* VIEW 1: AI VIRTUAL STYLIST STUDIO */}
          {activeView === 'ai-stylist' && (
            <div style={{ background: '#ffffff', border: '2px solid #fce7f0', borderRadius: '24px', padding: '1.8rem', boxShadow: '0 8px 24px rgba(236,72,153,0.06)' }}>
              <button onClick={() => setActiveView('shop')} className="btn-secondary" style={{ marginBottom: '1rem' }}>
                ← Back to All Products
              </button>

              <div style={{ background: '#fdf2f8', border: '1.5px dashed #f472b6', borderRadius: '18px', padding: '1.2rem', textAlign: 'center', marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#be185d', margin: '0 0 6px' }}>Step 1: Upload or Snap Your Photo</h4>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
                  <button type="button" className="btn-secondary" onClick={startStylistCamera}>📷 Open Camera</button>
                  <label className="btn-secondary" style={{ cursor: 'pointer' }}>
                    📁 Upload Photo
                    <input type="file" accept="image/*" onChange={(e) => {
                      const f = e.target.files[0];
                      if (f) { const r = new FileReader(); r.onloadend = () => setUserStylistPhoto(r.result); r.readAsDataURL(f); }
                    }} style={{ display: 'none' }} />
                  </label>
                </div>

                {isStylistCameraActive && (
                  <div style={{ maxWidth: '300px', margin: '0 auto 10px' }}>
                    <video ref={stylistVideoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '10px' }} />
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '6px' }}>
                      <button type="button" className="btn-primary" onClick={captureStylistPhoto}>📸 Capture</button>
                      <button type="button" className="btn-secondary" onClick={stopStylistCamera}>Cancel</button>
                    </div>
                  </div>
                )}
                <canvas ref={stylistCanvasRef} style={{ display: 'none' }} />

                {userStylistPhoto && (
                  <img src={userStylistPhoto} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', border: '3px solid #e11d48', marginTop: '8px' }} />
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '1.2rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800 }}>Event Type</label>
                  <select style={{ width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #fbcfe8', marginTop: '4px' }} value={stylistInputs.eventType} onChange={(e) => setStylistInputs({ ...stylistInputs, eventType: e.target.value })}>
                    <option>Wedding Reception</option>
                    <option>Sangeet Night</option>
                    <option>Haldi Ceremony</option>
                    <option>Engagement</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800 }}>Complexion Undertone</label>
                  <select style={{ width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #fbcfe8', marginTop: '4px' }} value={stylistInputs.skinTone} onChange={(e) => setStylistInputs({ ...stylistInputs, skinTone: e.target.value })}>
                    <option>Fair / Cool Undertone</option>
                    <option>Wheatish / Warm Undertone</option>
                    <option>Dusky / Rich Undertone</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800 }}>Daily Budget Limit</label>
                  <select style={{ width: '100%', padding: '8px', borderRadius: '10px', border: '1px solid #fbcfe8', marginTop: '4px' }} value={stylistInputs.budgetRange} onChange={(e) => setStylistInputs({ ...stylistInputs, budgetRange: e.target.value })}>
                    <option value="1500">Under ₹1,500 / day</option>
                    <option value="2500">₹1,500 - ₹2,500 / day</option>
                    <option value="5000">Above ₹2,500 / day</option>
                  </select>
                </div>
              </div>

              <button className="btn-primary" style={{ padding: '10px 24px' }} onClick={handleGenerateAIStylistLook}>
                ✨ Generate Custom AI Look & Matching Pieces
              </button>

              {stylistResult && (
                <div style={{ marginTop: '1.5rem', borderTop: '1.5px solid #fce7f0', paddingTop: '1.5rem' }}>
                  <p style={{ fontSize: '0.85rem', color: '#047857', fontWeight: 700, marginBottom: '1rem' }}>✔ {stylistResult.analysis}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.2rem' }}>
                    <div style={{ border: '1.5px solid #fbcfe8', padding: '12px', borderRadius: '14px', background: '#fff9fb' }}>
                      <label style={{ fontWeight: 800, fontSize: '0.85rem', color: '#be185d', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input type="checkbox" checked={selectedBundleItems.outfit} onChange={(e) => setSelectedBundleItems({ ...selectedBundleItems, outfit: e.target.checked })} />
                        Outfit (₹{stylistResult.outfit.price}/day)
                      </label>
                      <img src={stylistResult.outfit.imageUrl} alt="Dress" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', margin: '8px 0' }} />
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{stylistResult.outfit.title}</div>
                    </div>

                    <div style={{ border: '1.5px solid #fbcfe8', padding: '12px', borderRadius: '14px', background: '#fff9fb' }}>
                      <label style={{ fontWeight: 800, fontSize: '0.85rem', color: '#be185d', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input type="checkbox" checked={selectedBundleItems.jewellery} onChange={(e) => setSelectedBundleItems({ ...selectedBundleItems, jewellery: e.target.checked })} />
                        Jewellery (₹{stylistResult.jewellery.price}/day)
                      </label>
                      <img src={stylistResult.jewellery.imageUrl} alt="Jewellery" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', margin: '8px 0' }} />
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{stylistResult.jewellery.title}</div>
                    </div>

                    <div style={{ border: '1.5px solid #fbcfe8', padding: '12px', borderRadius: '14px', background: '#fff9fb' }}>
                      <label style={{ fontWeight: 800, fontSize: '0.85rem', color: '#be185d', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <input type="checkbox" checked={selectedBundleItems.accessory} onChange={(e) => setSelectedBundleItems({ ...selectedBundleItems, accessory: e.target.checked })} />
                        Potli Clutch (₹{stylistResult.accessory.price}/day)
                      </label>
                      <img src={stylistResult.accessory.imageUrl} alt="Potli" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '10px', margin: '8px 0' }} />
                      <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{stylistResult.accessory.title}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fdf2f8', padding: '1rem', borderRadius: '14px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#e11d48' }}>Selected Total: ₹{getBundleTotal()} / day</div>
                    <button className="btn-primary" onClick={handleBookCuratedLook}>🛍️ Book Selected Items</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: RENTER DASHBOARD + OWNER EARNINGS SUMMARY */}
          {activeView === 'renter-dashboard' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <button className="btn-secondary" onClick={() => setActiveView('shop')}>← Back to Showcase</button>
                <button className="btn-primary" onClick={() => setIsModalOpen(true)}>+ List New Outfit</button>
              </div>

              <OwnerEarningsSummary listingsCount={renterListings.length} activeRentals={activeRentals} />

              <div style={{ background: '#fff', border: '1.5px solid #fce7f0', borderRadius: '18px', padding: '1.2rem', marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#be185d', margin: '0 0 10px' }}>🔍 Pending Returns & Deposit Verification</h4>
                {activeRentals.filter(r => r.status.includes('Inspection Pending')).map(ord => (
                  <div key={ord.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fdf2f8', padding: '10px', borderRadius: '12px' }}>
                    <div>
                      <strong>{ord.title} (#{ord.id})</strong>
                      <div style={{ fontSize: '0.8rem', color: '#4b5563' }}>Security Deposit Held: ₹{ord.securityDeposit}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn-primary" style={{ padding: '5px 10px', fontSize: '0.75rem' }} onClick={() => handleApproveRefund(ord)}>✅ Release Refund</button>
                      <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.75rem', color: '#b91c1c' }} onClick={() => setInspectingOrder(ord)}>⚠️ Report Damage</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: '#fff', border: '1.5px solid #fce7f0', borderRadius: '18px', padding: '1.2rem' }}>
                <h4 style={{ margin: '0 0 10px' }}>Your Listed Outfits & Pickup Locations</h4>
                {renterListings.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #fce7f0', padding: '10px 0' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <img src={item.imageUrl} alt={item.title} style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{item.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>📍 Pickup: {item.pickupAddress} • 📅 {item.bookedDates}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 900, color: '#e11d48' }}>₹{item.rentalPricePerDay}/day</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: CUSTOMER PROFILE */}
          {activeView === 'profile' && (
            <div>
              <button className="btn-secondary" onClick={() => setActiveView('shop')} style={{ marginBottom: '1rem' }}>← Back to Shop</button>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
                <button className={`profile-tab ${profileTab === 'orders' ? 'active' : ''}`} onClick={() => setProfileTab('orders')}>Active Rentals</button>
                <button className={`profile-tab ${profileTab === 'past' ? 'active' : ''}`} onClick={() => setProfileTab('past')}>Past Rentals</button>
              </div>
              {profileTab === 'orders' ? activeRentals.map(ord => (
                <div key={ord.id} className="meesho-order-card" style={{ marginBottom: '10px' }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{ord.title} (#{ord.id})</div>
                    <div style={{ fontSize: '0.8rem', color: '#4b5563' }}>📍 Pickup: {ord.pickupAddress} • Status: <strong>{ord.status}</strong></div>
                  </div>
                  <button className="btn-secondary" style={{ fontSize: '0.75rem' }} onClick={() => handleWhatsAppChat(ord.ownerPhone, ord.title)}>💬 Chat Owner</button>
                </div>
              )) : pastRentals.map(ord => (
                <div key={ord.id} className="meesho-order-card" style={{ marginBottom: '10px' }}>
                  <div><strong>{ord.title}</strong> ({ord.date})</div>
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>{ord.status}</span>
                </div>
              ))}
            </div>
          )}

          {/* VIEW 4: DEFAULT PRODUCTS SHOWCASE + SIZE & BUDGET FILTERS */}
          {(activeView === 'shop' || activeView === 'wishlist') && (
            <div>
              <div className="toolbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '250px', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="text"
                    className="search-input"
                    placeholder={isListening ? "Listening... Speak now!" : "Search bridal lehengas, silk sarees, jewellery, accessories..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', paddingRight: '70px' }}
                  />
                  <button type="button" onClick={handleVoiceSearch} title="Voice Search" style={{ position: 'absolute', right: '38px', border: 'none', background: 'transparent', fontSize: '1.1rem', cursor: 'pointer' }}>
                    {isListening ? '🔴' : '🎙️'}
                  </button>
                  <button type="button" onClick={() => imageSearchInputRef.current.click()} title="Photo Search" style={{ position: 'absolute', right: '8px', border: 'none', background: 'transparent', fontSize: '1.1rem', cursor: 'pointer' }}>
                    📸
                  </button>
                  <input type="file" ref={imageSearchInputRef} accept="image/*" onChange={handleImageSearchUpload} style={{ display: 'none' }} />
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {['ALL', 'Dresses', 'Jewellery', 'Accessories'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '20px',
                        border: '1.5px solid',
                        borderColor: selectedCategory === cat ? '#e11d48' : '#fce7f0',
                        background: selectedCategory === cat ? '#e11d48' : '#fff',
                        color: selectedCategory === cat ? '#fff' : '#4b5563',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {cat === 'ALL' ? 'All Collections' : cat}
                    </button>
                  ))}
                </div>
              </div>

              <CatalogFilters
                selectedSize={filterSize}
                setSelectedSize={setFilterSize}
                maxBudget={maxBudget}
                setMaxBudget={setMaxBudget}
              />

              {isImageSearching && searchImagePreview && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff1f2', padding: '8px 14px', borderRadius: '12px', marginBottom: '1rem' }}>
                  <img src={searchImagePreview} alt="Search" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#be185d' }}>Showing matches for your uploaded photo</span>
                  <button className="btn-secondary" style={{ marginLeft: 'auto', fontSize: '0.75rem' }} onClick={() => { setIsImageSearching(false); setSearchTerm(''); }}>✕ Clear</button>
                </div>
              )}

              {loading ? (
                <p>Loading collections...</p>
              ) : (
                <div className="cards-grid">
                  {filteredItems.map(item => (
                    <div key={item.id} className="product-card" onClick={() => setSelectedProduct(item)}>
                      <button
                        className="like-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          wishlist.includes(item.id) ? setWishlist(wishlist.filter(i => i !== item.id)) : setWishlist([...wishlist, item.id]);
                        }}
                      >
                        {wishlist.includes(item.id) ? '❤️' : '🤍'}
                      </button>

                      <img src={item.imageUrl || SHOWCASE_PRODUCTS[0].imageUrl} alt={item.title} className="product-img" />

                      <div className="product-body">
                        <div className="tags-row">
                          <span className="tag tag-cat">{item.category}</span>
                          <span className="tag tag-gender" style={{ background: '#f0fdf4', color: '#166534' }}>📍 {item.city || 'Hyderabad'}</span>
                        </div>

                        <h3 className="product-title">{item.title}</h3>
                        <div style={{ margin: '4px 0' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9a3412', background: '#ffedd5', padding: '2px 6px', borderRadius: '6px' }}>
                            📅 {item.bookedDates || 'Available Now'}
                          </span>
                        </div>

                        <div className="product-pricing">
                          <div>
                            <span className="price">₹{item.rentalPricePerDay}</span>
                            <span style={{ fontSize: '0.75rem', color: '#705b64' }}> / day</span>
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#705b64' }}>Deposit: ₹{item.securityDeposit}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <button className="btn-secondary" onClick={() => setSelectedProduct(null)}>← Back</button>
              <button className="btn-secondary" onClick={() => handleWhatsAppChat(selectedProduct.ownerPhone || '9876543210', selectedProduct.title)}>💬 Chat with Owner</button>
            </div>

            <div className="details-grid">
              <div>
                <img src={selectedProduct.imageUrl} alt={selectedProduct.title} style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '14px' }} />
                <div style={{ marginTop: '10px', background: '#fff5f8', padding: '10px', borderRadius: '12px', fontSize: '0.8rem' }}>
                  <strong>📍 Pickup Location:</strong> {selectedProduct.pickupAddress || 'Banjara Hills, Hyderabad'}
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '1.3rem', margin: '0 0 8px' }}>{selectedProduct.title}</h2>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#e11d48', marginBottom: '8px' }}>
                  ₹{selectedProduct.rentalPricePerDay} <span style={{ fontSize: '0.85rem', color: '#705b64', fontWeight: 400 }}>/ day</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '12px' }}>{selectedProduct.description}</p>

                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Rental Days:</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[2, 3, 5, 7].map(d => (
                      <button key={d} className={`size-pill ${rentDays === d ? 'active' : ''}`} onClick={() => setRentDays(d)}>{d} Days</button>
                    ))}
                  </div>
                </div>

                <button
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px' }}
                  onClick={() => {
                    if (!currentUser) {
                      setSelectedProduct(null);
                      alert("Please Sign In or Register first to rent this item!");
                      navigate('/login', { state: { role: 'customer' } });
                    } else {
                      setIsCheckoutOpen(true);
                    }
                  }}
                >
                  🛍️ Rent Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL + SAREE DRAPING ADD-ON */}
      {isCheckoutOpen && selectedProduct && (
        <div className="modal-overlay" onClick={() => setIsCheckoutOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <h3 style={{ color: '#be185d', margin: '0 0 12px' }}>Confirm Rental & Terms</h3>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <button type="button" onClick={() => setDeliveryMethod('self-pickup')} style={{ flex: 1, padding: '8px', borderRadius: '10px', border: `1.5px solid ${deliveryMethod === 'self-pickup' ? '#e11d48' : '#e5e7eb'}`, background: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>
                🏪 Self-Pickup (Free)
              </button>
              <button type="button" onClick={() => setDeliveryMethod('delivery')} style={{ flex: 1, padding: '8px', borderRadius: '10px', border: `1.5px solid ${deliveryMethod === 'delivery' ? '#e11d48' : '#e5e7eb'}`, background: '#fff', fontWeight: 700, fontSize: '0.8rem' }}>
                🚚 Courier (+₹150)
              </button>
            </div>

            <SareeDrapingAddon includeDraping={includeDraping} setIncludeDraping={setIncludeDraping} />

            <div style={{ background: '#fff5f8', padding: '10px', borderRadius: '12px', fontSize: '0.75rem', marginBottom: '12px' }}>
              <strong>🛡️ Damage & Care Rules:</strong> Dry-cleaned garment. Deposit released after owner inspection.
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontWeight: 700, cursor: 'pointer' }}>
                <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} />
                I agree to return the garment neatly without damage.
              </label>
            </div>

            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#e11d48', marginBottom: '12px' }}>
              Total Payable: ₹{(selectedProduct.rentalPricePerDay * rentDays) + (selectedProduct.securityDeposit || 0) + (deliveryMethod === 'delivery' ? 150 : 0) + (includeDraping ? 299 : 0)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn-secondary" onClick={() => setIsCheckoutOpen(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleConfirmOrder}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}

      {/* DAMAGE REPORT MODAL */}
      {inspectingOrder && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '420px' }}>
            <h3 style={{ color: '#b91c1c' }}>⚠️ Report Garment Damage</h3>
            <div className="form-group">
              <label>Reason</label>
              <textarea rows="2" value={damageReason} onChange={(e) => setDamageReason(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Deduction Fee (₹)</label>
              <input type="number" value={damageFee} onChange={(e) => setDamageFee(e.target.value)} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="btn-secondary" onClick={() => setInspectingOrder(null)}>Cancel</button>
              <button className="btn-primary" style={{ background: '#b91c1c' }} onClick={() => handleReportDamage(inspectingOrder)}>Send Alert</button>
            </div>
          </div>
        </div>
      )}

      {/* RENTER LIST ITEM MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ color: '#be185d' }}>List New Outfit for Rent</h3>
            <form onSubmit={handleAddItem}>
              <div className="form-group">
                <label>Photo</label>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <button type="button" className="btn-secondary" onClick={startCamera}>📷 Camera</button>
                  <label className="btn-secondary" style={{ cursor: 'pointer' }}>
                    📁 Upload
                    <input type="file" accept="image/*" onChange={(e) => {
                      const f = e.target.files[0];
                      if (f) { const r = new FileReader(); r.onloadend = () => { setCapturedImage(r.result); setNewItem(p => ({ ...p, imageUrl: r.result })); }; r.readAsDataURL(f); }
                    }} style={{ display: 'none' }} />
                  </label>
                </div>
                {isCameraActive && (
                  <div>
                    <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: '8px' }} />
                    <button type="button" className="btn-primary" onClick={capturePhoto}>Snap</button>
                    <button type="button" className="btn-secondary" onClick={stopCamera}>Cancel</button>
                  </div>
                )}
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                {capturedImage && <img src={capturedImage} alt="Preview" style={{ width: '100%', maxHeight: '140px', objectFit: 'contain' }} />}
              </div>
              <div className="form-group">
                <label>Title</label>
                <input type="text" required value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
                  <option value="Dresses">Dresses</option>
                  <option value="Jewellery">Jewellery</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Rent / Day (₹)</label>
                  <input type="number" required value={newItem.rentalPricePerDay} onChange={(e) => setNewItem({ ...newItem, rentalPricePerDay: e.target.value })} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Deposit (₹)</label>
                  <input type="number" required value={newItem.securityDeposit} onChange={(e) => setNewItem({ ...newItem, securityDeposit: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label>Pickup Address</label>
                <input type="text" required value={newItem.pickupAddress} onChange={(e) => setNewItem({ ...newItem, pickupAddress: e.target.value })} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={submitting}>Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FLOATING SPRING AI CHATBOT */}
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {isChatOpen && (
          <div style={{ width: '320px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.18)', border: '1.5px solid #fce7f0', overflow: 'hidden', marginBottom: '10px' }}>
            <div style={{ background: '#e11d48', color: '#fff', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>🤖 Zyro Gemini AI</span>
              <button onClick={() => setIsChatOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: '12px', height: '240px', overflowY: 'auto', background: '#fafaf9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {chatMessages.map((m, idx) => (
                <div key={idx} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', background: m.sender === 'user' ? '#e11d48' : '#fff', color: m.sender === 'user' ? '#fff' : '#1f161a', padding: '8px 12px', borderRadius: '14px', fontSize: '0.8rem', border: '1px solid #fce7f0' }}>
                  {m.text}
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>
            <form onSubmit={handleSendMessage} style={{ padding: '8px', borderTop: '1px solid #fce7f0', display: 'flex', gap: '6px' }}>
              <input type="text" placeholder="Ask Zyro AI..." value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} style={{ flex: 1, padding: '6px 10px', fontSize: '0.8rem', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              <button type="submit" className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Send</button>
            </form>
          </div>
        )}
        <button onClick={() => setIsChatOpen(!isChatOpen)} style={{ background: '#e11d48', color: '#fff', border: '2px solid #fff', borderRadius: '50px', padding: '10px 16px', boxShadow: '0 6px 20px rgba(225,29,72,0.4)', cursor: 'pointer', fontWeight: 800, fontSize: '0.85rem' }}>
          💬 {isChatOpen ? 'Close' : 'Zyro AI'}
        </button>
      </div>
    </div>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('zyroUser');
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainApp currentUser={currentUser} setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/register"
          element={<Register onRegisterSuccess={(user) => setCurrentUser(user)} />}
        />
        <Route
          path="/login"
          element={<Login onLoginSuccess={(user) => setCurrentUser(user)} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
