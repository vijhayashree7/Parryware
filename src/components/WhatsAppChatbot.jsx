import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Constants ───────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const WA_BUSINESS_NUMBER = import.meta.env.VITE_WA_BUSINESS_NUMBER || '';
const SESSION_KEY = 'parryware_session_id';
const MESSAGES_KEY = 'parryware_chat_messages';
const MAX_LOCAL_MESSAGES = 60;

function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function loadLocalMessages() {
  try {
    return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveLocalMessages(messages) {
  const trimmed = messages.slice(-MAX_LOCAL_MESSAGES);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(trimmed));
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

// ── SVG Icons ───────────────────────────────────────────────────────
const SanctuaryIcon = ({ size = 32, color = '#fff' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Minimalist Bathtub Line Art */}
    <path 
      d="M21 12V9C21 7.89543 20.1046 7 19 7H5C3.89543 7 3 7.89543 3 9V12" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinecap="round"
    />
    <path 
      d="M3 12C3 15.3137 5.68629 18 9 18H15C18.3137 18 21 15.3137 21 12H3Z" 
      stroke={color} 
      strokeWidth="1.5" 
      strokeLinejoin="round"
    />
    <path d="M7 18V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17 18V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    {/* Stylized water drop/sparkle */}
    <circle cx="12" cy="5" r="1" fill="#cbb396" />
    <circle cx="15" cy="4" r="0.5" fill="#dfd2bc" />
  </svg>
);

const WhatsAppIcon = ({ size = 16, color = '#25D366' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.26 4.79L2.05 22l5.42-1.32c1.36.74 2.9 1.16 4.57 1.16 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.52 13.48c-.23.63-1.35 1.21-1.86 1.27-.48.06-1.07.09-1.72-.11a15.35 15.35 0 01-1.57-.58c-2.76-1.19-4.56-4-4.7-4.18-.13-.18-1.1-1.46-1.1-2.79s.7-1.97.95-2.24c.25-.27.54-.34.72-.34l.52.01c.17.01.39-.06.61.47.23.54.77 1.88.84 2.01.07.14.11.3.02.47-.09.18-.14.29-.27.45-.14.16-.29.36-.41.48-.14.13-.28.28-.12.55.16.27.72 1.18 1.54 1.91.59.53 1.09.8 1.49 1 .16.08.29.07.4-.04.11-.11.48-.56.61-.75.13-.19.26-.16.44-.1.18.07 1.15.54 1.35.64.2.1.33.15.38.23.04.08.04.47-.19 1.1z" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
  </svg>
);

// ── Typing Indicator ────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-3">
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #4E342E, #8D6E63)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 14 }}>🏠</span>
    </div>
    <div
      style={{
        background: '#fff',
        borderRadius: '18px 18px 18px 4px',
        padding: '10px 14px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        display: 'flex',
        gap: 5,
        alignItems: 'center',
      }}
    >
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#8D6E63',
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  </div>
);

// ── Message Bubble ───────────────────────────────────────────────────
const MessageBubble = ({ msg }) => {
  const isUser = msg.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: 8,
        marginBottom: 10,
      }}
    >
      {/* Avatar - only for assistant */}
      {!isUser && (
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4E342E, #8D6E63)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: 14,
          }}
        >
          🏠
        </div>
      )}

      <div style={{ maxWidth: '78%' }}>
        <div
          style={{
            background: isUser ? '#25D366' : '#fff',
            color: isUser ? '#fff' : '#2c2c2c',
            borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            padding: '10px 14px',
            fontSize: 13.5,
            lineHeight: 1.5,
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {msg.content}
        </div>
        <div
          style={{
            fontSize: 10,
            color: '#aaa',
            marginTop: 3,
            textAlign: isUser ? 'right' : 'left',
            paddingLeft: isUser ? 0 : 4,
            paddingRight: isUser ? 4 : 0,
          }}
        >
          {formatTime(msg.timestamp || Date.now())}
          {isUser && <span style={{ marginLeft: 4 }}>✓✓</span>}
        </div>
      </div>
    </motion.div>
  );
};

// ── Main Component ───────────────────────────────────────────────────
export default function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [sessionId] = useState(getSessionId);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasSentWelcome = useRef(false);

  // Load local messages on mount
  useEffect(() => {
    const stored = loadLocalMessages();
    setMessages(stored);
    if (stored.length > 0 && !isOpen) setHasUnread(true);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasUnread(false);
      // Send welcome message on first open
      if (!hasSentWelcome.current && messages.length === 0) {
        hasSentWelcome.current = true;
        sendBotMessage(
          "👋 Hello! Welcome to *Abirami Agencies* – your authorized Parryware dealer.\n\nI'm your AI assistant. Ask me anything about our products, pricing, orders, or service. How can I help you today?"
        );
      }
    }
  }, [isOpen]);

  const sendBotMessage = (content) => {
    const botMsg = { role: 'assistant', content, timestamp: Date.now() };
    setMessages(prev => {
      const updated = [...prev, botMsg];
      saveLocalMessages(updated);
      return updated;
    });
  };

  const handleSend = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    const userMsg = { role: 'user', content: text, timestamp: Date.now() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveLocalMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId }),
      });

      const data = await response.json();
      const reply = data.reply || "Sorry, I couldn't process that. Please try again!";

      const botMsg = { role: 'assistant', content: reply, timestamp: Date.now() };
      setMessages(prev => {
        const updated = [...prev, botMsg];
        saveLocalMessages(updated);
        return updated;
      });
    } catch {
      const errMsg = {
        role: 'assistant',
        content: "⚠️ I'm having trouble connecting right now. Please try again in a moment, or contact us directly via WhatsApp!",
        timestamp: Date.now(),
      };
      setMessages(prev => {
        const updated = [...prev, errMsg];
        saveLocalMessages(updated);
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  }, [inputValue, isTyping, messages, sessionId]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = async () => {
    setMessages([]);
    localStorage.removeItem(MESSAGES_KEY);
    hasSentWelcome.current = false;
    try {
      await fetch(`${API_URL}/api/chat/${sessionId}`, { method: 'DELETE' });
    } catch { /* silent */ }
    // Show welcome again
    setTimeout(() => {
      hasSentWelcome.current = true;
      sendBotMessage(
        "👋 Hello! Welcome back to *Abirami Agencies*.\n\nHow can I assist you today?"
      );
    }, 200);
  };

  const openWhatsApp = () => {
    const number = WA_BUSINESS_NUMBER.replace(/\D/g, '');
    const text = encodeURIComponent('Hello! I have an enquiry about Parryware products.');
    if (number) {
      window.open(`https://wa.me/${number}?text=${text}`, '_blank');
    }
  };

  return (
    <>
      {/* ── Floating Button ────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 10,
        }}
      >
        {/* Tooltip label */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                color: '#54362b',
                fontSize: 11,
                fontWeight: 800,
                padding: '10px 18px',
                borderRadius: 24,
                boxShadow: '0 8px 25px rgba(84,54,43,0.2)',
                whiteSpace: 'nowrap',
                border: '1px solid rgba(203,179,150,0.5)',
                letterSpacing: '0.08em',
                fontFamily: 'Outfit, sans-serif',
                textTransform: 'uppercase',
              }}
            >
              Sanctuary Concierge
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring + button */}
        <div style={{ position: 'relative' }}>
          {/* Animated pulse rings - more sophisticated gold/white */}
          {!isOpen && (
            <>
              <motion.div
                style={{
                  position: 'absolute',
                  inset: -6,
                  borderRadius: '50%',
                  background: '#cbb396',
                  opacity: 0.15,
                }}
                animate={{ scale: [1, 1.4], opacity: [0.15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  inset: -6,
                  borderRadius: '50%',
                  background: '#fff',
                  opacity: 0.2,
                }}
                animate={{ scale: [1, 1.6], opacity: [0.2, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 1 }}
              />
            </>
          )}

          {/* Main button - Metallic/Glassmorphic Luxe */}
          <motion.button
            id="whatsapp-chatbot-btn"
            onClick={() => setIsOpen(o => !o)}
            whileHover={{ scale: 1.05, translateY: -4 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: 68,
              height: 68,
              borderRadius: '50%',
              background: isOpen
                ? 'linear-gradient(145deg, #54362b 0%, #3d271f 100%)'
                : 'linear-gradient(145deg, #cbb396 0%, #976246 100%)',
              border: '2px solid rgba(255,255,255,0.8)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 30px rgba(84,54,43,0.4), inset 0 2px 4px rgba(255,255,255,0.3)',
              color: '#fff',
              position: 'relative',
              zIndex: 1,
              backdropFilter: 'blur(5px)',
            }}
            aria-label={isOpen ? 'Close sanctuary concierge' : 'Open sanctuary concierge'}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CloseIcon />
                </motion.span>
              ) : (
                <motion.div
                  key="luxury"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <SanctuaryIcon />
                  {/* Floating WhatsApp Badge */}
                  <div style={{
                    position: 'absolute',
                    top: -12,
                    right: -12,
                    width: 24,
                    height: 24,
                    background: '#fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(37,211,102,0.3)',
                    border: '1.5px solid #25D366'
                  }}>
                    <WhatsAppIcon size={14} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Unread badge */}
            <AnimatePresence>
              {hasUnread && !isOpen && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{
                    position: 'absolute',
                    top: -2,
                    right: -2,
                    padding: '2px 6px',
                    borderRadius: '10px',
                    background: '#976246',
                    border: '2px solid #fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    fontWeight: 800,
                    color: '#fff',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                  }}
                >
                  NEW
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Chat Window ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: 110,
              right: 28,
              width: 380,
              height: 600,
              zIndex: 9998,
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 30px 90px rgba(84,54,43,0.35)',
              display: 'flex',
              flexDirection: 'column',
              background: '#f9f6f0',
              border: '1px solid rgba(203,179,150,0.2)',
            }}
          >
            {/* ── Header ─────────────────────────────────────────── */}
            <div
              style={{
                background: 'linear-gradient(135deg, #54362b 0%, #7e4e3b 100%)',
                padding: '20px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                flexShrink: 0,
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  border: '2px solid rgba(203,179,150,0.3)'
                }}
              >
                🛁
              </div>

              {/* Name / status */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, letterSpacing: '0.02em', fontFamily: 'Outfit, sans-serif' }}>
                  Abirami Agencies
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#25D366',
                      boxShadow: '0 0 5px #25D366'
                    }}
                  />
                  <span style={{ color: '#dfd2bc', fontSize: 11, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {isTyping ? 'AI is composing…' : 'Online Assistant'}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                {/* Open in WhatsApp */}
                {WA_BUSINESS_NUMBER && (
                  <motion.button
                    onClick={openWhatsApp}
                    whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.9 }}
                    title="Talk on WhatsApp"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.1)',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      transition: 'background 0.2s'
                    }}
                  >
                    <WhatsAppIcon size={18} />
                  </motion.button>
                )}
                {/* Clear chat */}
                <motion.button
                  onClick={handleClearChat}
                  whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.9 }}
                  title="Clear Conversation"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    transition: 'background 0.2s'
                  }}
                >
                  <TrashIcon />
                </motion.button>
              </div>
            </div>

            {/* ── Subtitle strip ─────────────────────────────────── */}
            <div
              style={{
                background: '#f0eadd',
                padding: '8px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(203,179,150,0.2)',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 10, color: '#976246', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Parryware Luxe Partner
              </span>
              <span style={{ fontSize: 9, color: '#b49070', fontWeight: 500 }}>
                Powered by MiniMax AI
              </span>
            </div>

            {/* ── Messages Area ──────────────────────────────────── */}
            <div
              id="chat-messages-area"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 16px',
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: `linear-gradient(rgba(249, 246, 240, 0.9), rgba(249, 246, 240, 0.9)), url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23cbb396' fill-opacity='0.08'/%3E%3C/svg%3E")`,
                scrollBehavior: 'smooth'
              }}
            >
              {messages.length === 0 && !isTyping && (
                <div
                  style={{
                    textAlign: 'center',
                    color: '#8D6E63',
                    fontSize: 13,
                    marginTop: 60,
                    padding: '0 30px',
                  }}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    style={{ fontSize: 48, marginBottom: 16 }}
                  >
                    🏷️
                  </motion.div>
                  <div style={{ fontWeight: 800, color: '#54362b', marginBottom: 8, fontSize: 18, fontFamily: 'Outfit, sans-serif' }}>
                    Welcome to Abirami
                  </div>
                  <div style={{ color: '#b49070', lineHeight: 1.6, fontWeight: 500 }}>
                    Our AI concierge is ready to help you explore Parryware collections, check prices, or arrange service.
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <MessageBubble key={`${msg.timestamp}-${idx}`} msg={msg} />
              ))}

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Suggested Quick Replies ────────────────────────── */}
            {messages.length <= 1 && !isTyping && (
              <div
                style={{
                  padding: '12px 16px',
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                  background: '#f9f6f0',
                  borderTop: '1px solid rgba(203,179,150,0.1)',
                }}
              >
                {['Bathware Collections', 'Latest Offers', 'Service Request', 'Dealer Location'].map(q => (
                  <motion.button
                    key={q}
                    whileHover={{ scale: 1.05, background: '#f0eadd' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setInputValue(q);
                      setTimeout(() => inputRef.current?.focus(), 50);
                    }}
                    style={{
                      background: '#fff',
                      color: '#54362b',
                      border: '1.5px solid #dfd2bc',
                      borderRadius: '12px',
                      padding: '7px 14px',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                      letterSpacing: '0.02em',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 4px rgba(84,54,43,0.05)'
                    }}
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── Input Area ─────────────────────────────────────── */}
            <div
              style={{
                background: '#fff',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'flex-end',
                gap: 12,
                borderTop: '1px solid rgba(203,179,150,0.2)',
                flexShrink: 0,
              }}
            >
              <div style={{ flex: 1, position: 'relative' }}>
                <textarea
                  ref={inputRef}
                  id="chatbot-input"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="How can we assist you?"
                  rows={1}
                  style={{
                    width: '100%',
                    resize: 'none',
                    border: '1.5px solid #dfd2bc',
                    background: '#f9f6f0',
                    borderRadius: '18px',
                    padding: '12px 18px',
                    fontSize: 14,
                    outline: 'none',
                    fontFamily: 'Outfit, sans-serif',
                    lineHeight: 1.5,
                    maxHeight: 120,
                    overflowY: 'auto',
                    color: '#54362b',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#976246'}
                  onBlur={(e) => e.target.style.borderColor = '#dfd2bc'}
                  onInput={e => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                  }}
                />
              </div>

              <motion.button
                id="chatbot-send-btn"
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                whileHover={inputValue.trim() && !isTyping ? { scale: 1.1, background: '#7e4e3b' } : {}}
                whileTap={inputValue.trim() && !isTyping ? { scale: 0.9 } : {}}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '15px',
                  background: inputValue.trim() && !isTyping
                    ? '#54362b'
                    : '#dfd2bc',
                  border: 'none',
                  cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                  boxShadow: inputValue.trim() && !isTyping ? '0 4px 10px rgba(84,54,43,0.3)' : 'none'
                }}
                aria-label="Send message"
              >
                <SendIcon />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
