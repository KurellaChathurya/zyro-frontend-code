import React, { useRef, useEffect } from 'react';

function AIChatbot({
  isChatOpen,
  setIsChatOpen,
  chatMessages,
  chatInput,
  setChatInput,
  isChatLoading,
  onSendMessage
}) {
  const chatMessagesEndRef = useRef(null);

  useEffect(() => {
    if (isChatOpen && chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {!isChatOpen ? (
        <button
          onClick={() => setIsChatOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '30px',
            padding: '12px 20px',
            fontSize: '0.95rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(219, 39, 119, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>💬</span> Chat with Zyro AI
        </button>
      ) : (
        <div style={{
          width: '360px',
          height: '500px',
          background: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 12px 36px rgba(0,0,0,0.2)',
          border: '1.5px solid #fce7f0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
            color: '#fff',
            padding: '12px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800 }}>✨ Zyro AI Assistant</h4>
              <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>Styling • Sizing • Policies</span>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          <div style={{ flex: 1, padding: '14px', overflowY: 'auto', background: '#fff9fb', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.sender === 'user' ? '#db2777' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : '#1f161a',
                  border: msg.sender === 'user' ? 'none' : '1px solid #fce7f0',
                  padding: '8px 12px',
                  borderRadius: '14px',
                  maxWidth: '82%',
                  fontSize: '0.85rem',
                  lineHeight: '1.4',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                }}
              >
                {msg.text}
              </div>
            ))}
            {isChatLoading && (
              <div style={{ alignSelf: 'flex-start', background: '#fdf2f8', padding: '6px 12px', borderRadius: '12px', fontSize: '0.75rem', color: '#be185d', fontWeight: 700 }}>
                Zyro AI is thinking...
              </div>
            )}
            <div ref={chatMessagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '6px 12px', background: '#fff', borderTop: '1px solid #fce7f0' }}>
            {[
              '💰 Deposit Refund Policy',
              '👗 Sizing & Alteration',
              '📍 Pickup Points in Hyd',
              '✨ Wedding Styling Advice'
            ].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setChatInput(chip)}
                style={{
                  background: '#fdf2f8',
                  color: '#be185d',
                  border: '1px solid #fbcfe8',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          <form onSubmit={onSendMessage} style={{ padding: '10px', background: '#ffffff', borderTop: '1px solid #fce7f0', display: 'flex', gap: '6px' }}>
            <input
              type="text"
              placeholder="Ask about size, look, deposit..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{ flex: 1, padding: '8px 12px', borderRadius: '10px', border: '1px solid #fbcfe8', fontSize: '0.85rem', outline: 'none' }}
            />
            <button
              type="submit"
              disabled={isChatLoading}
              style={{ background: '#db2777', color: '#fff', border: 'none', borderRadius: '10px', padding: '0 14px', fontWeight: 800, cursor: 'pointer' }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AIChatbot;