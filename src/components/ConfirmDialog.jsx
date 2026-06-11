import React from 'react';

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: '#1a1a1a',
          border: '1px solid #ff3b3b',
          borderRadius: 12,
          padding: 24,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>⚠️</div>
        <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ff3b3b', marginBottom: 12 }}>
          تحذير أمني
        </div>
        <div style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: 20, lineHeight: 1.6 }}>
          {message}
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 24px',
              borderRadius: 8,
              border: '1px solid #00ff88',
              background: 'rgba(0,255,136,0.1)',
              color: '#00ff88',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 24px',
              borderRadius: 8,
              border: '1px solid #ff3b3b',
              background: 'rgba(255,59,59,0.15)',
              color: '#ff3b3b',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            متابعة رغم الخطر
          </button>
        </div>
      </div>
    </div>
  );
}
