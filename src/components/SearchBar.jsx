import React, { useRef } from 'react';

function SearchBar({
  searchTerm,
  setSearchTerm,
  isListening,
  onVoiceSearch,
  searchImagePreview,
  onImageSearchUpload,
  onClearImageSearch,
  selectedGender,
  setSelectedGender,
  selectedCategory,
  setSelectedCategory,
  onOpenAddItem
}) {
  const imageSearchInputRef = useRef(null);

  return (
    <div style={{ margin: '1rem 0' }}>
      <div className="toolbar" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            className="search-input"
            placeholder={isListening ? "Listening... Speak now!" : "Search lehengas, sherwanis, jewellery, area..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', paddingRight: '72px', borderColor: isListening ? '#db2777' : '' }}
          />

          {/* 🎙️ Voice Search Button */}
          <button
            type="button"
            onClick={onVoiceSearch}
            title="Voice Search"
            style={{ position: 'absolute', right: '38px', background: isListening ? '#fee2e2' : 'transparent', border: 'none', fontSize: '1.1rem', cursor: 'pointer', padding: '4px' }}
          >
            {isListening ? '🔴' : '🎙️'}
          </button>

          {/* 📸 Photo Search Button */}
          <button
            type="button"
            onClick={() => imageSearchInputRef.current.click()}
            title="Search by Photo"
            style={{ position: 'absolute', right: '8px', background: 'transparent', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}
          >
            📸
          </button>
          <input
            type="file"
            ref={imageSearchInputRef}
            accept="image/*"
            onChange={onImageSearchUpload}
            style={{ display: 'none' }}
          />
        </div>

        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #fbcfe8', fontSize: '0.85rem' }}
        >
          <option value="ALL">All Genders</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid #fbcfe8', fontSize: '0.85rem' }}
        >
          <option value="ALL">All Categories</option>
          <option value="Dresses">Dresses</option>
          <option value="Jewellery">Jewellery</option>
        </select>

        <button className="btn-primary" onClick={onOpenAddItem}>+ List Item</button>
      </div>

      {/* Photo Filter Applied Badge */}
      {searchImagePreview && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fdf2f8', padding: '6px 12px', borderRadius: '10px', marginTop: '10px', width: 'fit-content' }}>
          <img src={searchImagePreview} alt="Filter" style={{ width: '28px', height: '28px', borderRadius: '6px', objectFit: 'cover' }} />
          <span style={{ fontSize: '0.8rem', color: '#be185d', fontWeight: 700 }}>Photo Search Active</span>
          <button type="button" onClick={onClearImageSearch} style={{ background: 'transparent', border: 'none', color: '#b91c1c', cursor: 'pointer', fontWeight: 800 }}>✕</button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;