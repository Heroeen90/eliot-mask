import React, { useState } from 'react';
import TargetBar from './components/TargetBar';

function App() {
  const [target, setTarget] = useState('');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0a0a0a',
      color: '#ccc',
    }}>
      {/* شريط الهدف */}
      <TargetBar onTargetChange={setTarget} />

      {/* المحتوى الرئيسي */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 12,
        padding: 20,
      }}>
        {target ? (
          <>
            <div style={{ fontSize: '0.8rem', color: '#666' }}>الهدف الحالي:</div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1.4rem',
              color: '#00ff88',
              background: 'rgba(0,255,136,0.05)',
              padding: '12px 24px',
              borderRadius: 8,
              border: '1px solid rgba(0,255,136,0.2)',
              direction: 'ltr',
            }}>
              {target}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#444', marginTop: 20 }}>
              المرحلة التالية: إضافة الأدوات ⚔️
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '3rem' }}>💀</div>
            <div style={{ fontSize: '1.2rem', color: '#666' }}>أدخل هدفاً للبدء</div>
            <div style={{ fontSize: '0.75rem', color: '#444', marginTop: 8 }}>
              مثال: scanme.nmap.org أو 192.168.1.1
            </div>
          </>
        )}
      </div>

      {/* شريط الحالة في الأسفل */}
      <div style={{
        background: '#111',
        borderTop: '1px solid #1a3a2a',
        padding: '8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.7rem',
        color: '#444',
      }}>
        <span>💀 Eliot's Mask v1.0</span>
        <span>{target ? '🎯 جاهز' : '⏳ بانتظار الهدف'}</span>
      </div>
    </div>
  );
}

export default App;
