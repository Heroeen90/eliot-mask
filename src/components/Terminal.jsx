import React, { useRef, useEffect, useState, useCallback } from 'react';

// ==================== ألوان الرسائل ====================
const COLORS = {
  success: '#00ff88',
  error: '#ff3b3b',
  warning: '#ffaa00',
  info: '#00aaff',
  command: '#00ffcc',
  output: '#aaa',
  dim: '#444',
};

// ==================== مكون الطرفية ====================
export default function Terminal({ lines = [], onClear }) {
  const outputRef = useRef(null);
  const [localLines, setLocalLines] = useState([]);

  // إضافة سطر جديد
  const addLine = useCallback((text, type = 'output') => {
    setLocalLines(prev => [...prev, { text, type, time: new Date().toLocaleTimeString() }]);
  }, []);

  // تمرير تلقائي عند وصول سطر جديد
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [localLines]);

  // دمج الخطوط الخارجية مع المحلية
  useEffect(() => {
    if (lines && lines.length > 0) {
      setLocalLines(prev => {
        const newLines = lines.filter(l => !prev.some(p => p.text === l.text && p.time === l.time));
        return [...prev, ...newLines].slice(-100);
      });
    }
  }, [lines]);

  // مسح الطرفية
  const handleClear = () => {
    setLocalLines([]);
    onClear?.();
  };

  // نسخ المحتوى
  const handleCopy = () => {
    const text = localLines.map(l => l.text).join('\n');
    navigator.clipboard?.writeText(text).then(() => {
      addLine('📋 تم نسخ المحتوى', 'info');
    }).catch(() => {
      // fallback للمتصفحات التي لا تدعم clipboard
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      addLine('📋 تم نسخ المحتوى', 'info');
    });
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#0a0a0a',
      borderTop: '2px solid #00ff88',
    }}>
      {/* شريط العنوان */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '6px 12px',
        background: '#0d0d0d',
        borderBottom: '1px solid #1a2a2a',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '0.7rem', color: '#00ff88', fontFamily: 'monospace' }}>
          📟 الطرفية — {localLines.length} سطر
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={handleCopy}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid #1a2a2a',
              borderRadius: 4,
              color: '#888',
              padding: '3px 8px',
              fontSize: '0.65rem',
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            📋 نسخ
          </button>
          <button
            onClick={handleClear}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid #1a2a2a',
              borderRadius: 4,
              color: '#888',
              padding: '3px 8px',
              fontSize: '0.65rem',
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            🗑️ مسح
          </button>
        </div>
      </div>

      {/* منطقة المخرجات */}
      <div
        ref={outputRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px 14px',
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          direction: 'ltr',
          textAlign: 'left',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {localLines.length === 0 && (
          <div style={{ color: '#333', textAlign: 'center', padding: 20 }}>
            ─── اكتمل التحميل ───<br />
            <span style={{ fontSize: '0.6rem' }}>اختر أداة للبدء</span>
          </div>
        )}
        {localLines.map((line, i) => (
          <div
            key={i}
            style={{
              color: COLORS[line.type] || '#aaa',
              animation: 'fadeIn 0.15s ease',
              borderLeft: line.type === 'command' ? '2px solid #00ffcc' :
                         line.type === 'error' ? '2px solid #ff3b3b' :
                         line.type === 'success' ? '2px solid #00ff88' :
                         '2px solid transparent',
              paddingLeft: line.type !== 'output' ? 8 : 0,
              marginBottom: 1,
            }}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* إضافة animation CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
