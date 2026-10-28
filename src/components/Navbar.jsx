import React from 'react';

function Navbar({
  currentUser,
  selectedRole,
  activeView,
  wishlistCount,
  authView,
  navigateTo,
  onLogout,
  onSwitchRole
}) {
  return (
    <nav className="navbar">
      <div className="brand-wrapper" onClick={() => navigateTo('shop')}>
        <img 
          src="/logo.png" 
          alt="Zyro Logo" 
          className="brand-logo-img" 
          onError={(e) => { e.target.style.display = 'none'; }} 
        />
        <div className="brand-title">Zyro.</div>
      </div>

      <div className="user-badge">
        {currentUser && (
          <>
            {selectedRole === 'customer' ? (
              <>
                <button 
                  className={`nav-btn ${activeView === 'ai-stylist' ? 'active-nav-pill' : ''}`} 
                  onClick={() => navigateTo('ai-stylist')}
                >
                  ✨ AI Stylist Studio
                </button>
                <button 
                  className={`nav-btn ${activeView === 'wishlist' ? 'active-nav-pill' : ''}`} 
                  onClick={() => navigateTo(activeView === 'wishlist' ? 'shop' : 'wishlist')}
                >
                  ❤️ Wishlist ({wishlistCount})
                </button>
                <button 
                  className={`nav-btn ${activeView === 'profile' ? 'active-nav-pill' : ''}`} 
                  onClick={() => navigateTo(activeView === 'profile' ? 'shop' : 'profile')}
                >
                  👤 {currentUser.name || 'Profile'}
                </button>
              </>
            ) : (
              <button 
                className={`nav-btn ${activeView === 'renter-dashboard' ? 'active-nav-pill' : ''}`} 
                onClick={() => navigateTo('renter-dashboard')}
              >
                👗 Renter Dashboard
              </button>
            )}
            <button className="btn-secondary" onClick={onLogout}>
              Logout
            </button>
          </>
        )}

        {!currentUser && authView !== 'role-select' && (
          <button className="btn-secondary" onClick={onSwitchRole}>
            ⇄ Switch Role
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;