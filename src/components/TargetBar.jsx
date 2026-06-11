import React, { useState, useEffect, useRef } from 'react';

const STORAGE_KEY = 'eliot_targets';

function getStoredTargets() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function storeTargets(targets) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(targets.slice(0, 5)));
}

function detectTargetType(value) {
  if (!value.trim()) return { icon: '🎯', label: 'الهدف' };
  if (value.includes('@')) return { icon: '📧', label: 'بريد إلكتروني' };
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value.trim())) return { icon: '🔢', label: 'عنوان IP' };
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) return { icon: '🌐', label: 'نطاق' };
  if (value.startsWith('http')) return { icon: '🔗', label: 'رابط' };
  return { icon: '🎯', label: 'هدف' };
}

export default function TargetBar({ onTargetChange }) {
  const [value, setValue] = useState('');
  const [history, setHistory] = useState(getStoredTargets);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef(null);
  const type = detectTargetType(value);

  useEffect(() => {
    onTargetChange?.(value);
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...history.filter(h => h !== trimmed)].slice(0, 5);
    setHistory(updated);
    storeTargets(updated);
    setShowHistory(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const selectFromHistory = (item) => {
    setValue(item);
    setShowHistory(false);
    inputRef.current?.focus();
  };

  const clearInput = () => {
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div style={{
      background: '#111',
      borderBottom: '1px solid #1a3a2a',
      padding: '12px 16px',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: '#1a1a1a',
        borderRadius: 10,
        padding: '4px 12px',
        border: '1px solid #2a2a2a',
      }}>
        <span style={{ fontSize: '1.3rem' }}>{type.icon}</span>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowHistory(true)}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
          placeholder={`أدخل ${type.label}...`}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            padding: '10px 0',
            outline: 'none',
            direction: 'ltr',
          }}
        />
        {value && (
          <button
            onClick={clearInput}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#666',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            ✕
          </button>
        )}
        <button
          onClick={handleSubmit}
          style={{
            background: 'rgba(0,255,136,0.1)',
            border: '1px solid #00ff88',
            borderRadius: 6,
            color: '#00ff88',
            padding: '8px 14px',
            fontFamily: 'monospace',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          ⏎
        </button>
      </div>

      {showHistory && history.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 16,
          right: 16,
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: 8,
          marginTop: 4,
          zIndex: 100,
          overflow: 'hidden',
        }}>
          <div style={{ padding: '6px 12px', fontSize: '0.7rem', color: '#666' }}>📋 آخر الأهداف</div>
          {history.map((item, i) => (
            <div
              key={i}
              onMouseDown={() => selectFromHistory(item)}
              style={{
                padding: '10px 14px',
                cursor: 'pointer',
                borderBottom: '1px solid #1a1a1a',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                color: '#ccc',
                direction: 'ltr',
                textAlign: 'left',
                background: value === item ? 'rgba(0,255,136,0.05)' : 'transparent',
              }}
            >
              {detectTargetType(item).icon} {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
