import React from 'react';

// استرجاع التاريخ من localStorage
function getHistory() {
  try {
    return JSON.parse(localStorage.getItem('eliot_history') || '[]');
  } catch { return []; }
}

// حفظ التاريخ في localStorage
function saveHistory(history) {
  localStorage.setItem('eliot_history', JSON.stringify(history.slice(0, 50)));
}

export function addToHistory(entry) {
  const history = getHistory();
  const newEntry = {
    ...entry,
    id: Date.now(),
    date: new Date().toLocaleString('ar-SA'),
  };
  history.unshift(newEntry);
  saveHistory(history);
}

export function clearHistory() {
  localStorage.removeItem('eliot_history');
}

export default function HistoryPanel({ onReplay, onClose }) {
  const [history, setHistory] = React.useState(getHistory());

  const handleClear = () => {
    clearHistory();
    setHistory([]);
  };

  const handleReplay = (entry) => {
    onReplay?.(entry);
    onClose?.();
  };

  const handleExport = () => {
    const json = JSON.stringify(history, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eliot_history_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#0a0a0a',
    }}>
      {/* شريط العنوان */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 14px',
        background: '#111',
        borderBottom: '1px solid #1a2a2a',
        flexShrink: 0,
      }}>
        <span style={{ fontSize: '0.8rem', color: '#00ff88', fontFamily: 'monospace' }}>
          📜 سجل العمليات ({history.length})
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={handleExport} style={btnStyle('#00aaff')}>📥 تصدير</button>
          <button onClick={handleClear} style={btnStyle('#ff3b3b')}>🗑️ مسح الكل</button>
          {onClose && <button onClick={onClose} style={btnStyle('#666')}>✕</button>}
        </div>
      </div>

      {/* قائمة العمليات */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
        {history.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#444' }}>
            📭 لا توجد عمليات سابقة
          </div>
        )}
        {history.map(entry => (
          <div key={entry.id} style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 8,
            padding: 10,
            marginBottom: 6,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: '#00ffcc', direction: 'ltr' }}>
                {entry.command?.substring(0, 50)}{(entry.command?.length > 50 ? '...' : '')}
              </span>
              <span style={{ fontSize: '0.6rem', color: '#666' }}>{entry.date}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: entry.success ? '#00ff88' : '#ff3b3b' }}>
                {entry.success ? '✅ نجح' : '❌ فشل'}
              </span>
              <button
                onClick={() => handleReplay(entry)}
                style={{
                  background: 'rgba(0,255,136,0.05)',
                  border: '1px solid #00ff8833',
                  borderRadius: 4,
                  color: '#00ff88',
                  padding: '3px 10px',
                  fontSize: '0.6rem',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                }}
              >
                🔄 إعادة
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function btnStyle(color) {
  return {
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${color}33`,
    borderRadius: 4,
    color: color,
    padding: '3px 8px',
    fontSize: '0.6rem',
    cursor: 'pointer',
    fontFamily: 'monospace',
  };
}
