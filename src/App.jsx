import React, { useState, useEffect } from 'react';
import TargetBar from './components/TargetBar';
import ToolGrid from './components/ToolGrid';

// استرجاع المفضلة من localStorage
function getStoredFavorites() {
  try {
    return JSON.parse(localStorage.getItem('eliot_favorites') || '[]');
  } catch { return []; }
}

function storeFavorites(favs) {
  localStorage.setItem('eliot_favorites', JSON.stringify(favs));
}

function App() {
  const [target, setTarget] = useState('');
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const [selectedTool, setSelectedTool] = useState(null);

  // حفظ المفضلة عند التغيير
  useEffect(() => {
    storeFavorites(favorites);
  }, [favorites]);

  const handleToggleFavorite = (toolId) => {
    setFavorites(prev =>
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [toolId, ...prev]
    );
  };

  const handleSelectTool = (tool) => {
    setSelectedTool(tool);
  };

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

      {/* رسالة الهدف الحالي */}
      {target && (
        <div style={{
          background: 'rgba(0,255,136,0.05)',
          borderBottom: '1px solid rgba(0,255,136,0.15)',
          padding: '6px 16px',
          fontSize: '0.7rem',
          color: '#00ff88',
          fontFamily: 'monospace',
          direction: 'ltr',
          textAlign: 'left',
        }}>
          🎯 {target}
        </div>
      )}

      {/* المحتوى الرئيسي: شبكة الأدوات */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <ToolGrid
          onSelectTool={handleSelectTool}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>

      {/* نافذة الأداة المختارة (ستتطور لاحقاً إلى الطرفية) */}
      {selectedTool && (
        <div style={{
          background: '#111',
          borderTop: '2px solid #00ff88',
          padding: 16,
          maxHeight: '30vh',
          overflowY: 'auto',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: '#00ff88', fontWeight: 700, fontFamily: 'monospace' }}>
              ⚡ {selectedTool.name}
            </span>
            <button
              onClick={() => setSelectedTool(null)}
              style={{
                background: 'transparent',
                border: '1px solid #333',
                borderRadius: 4,
                color: '#666',
                cursor: 'pointer',
                padding: '4px 10px',
              }}
            >
              ✕
            </button>
          </div>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '0.75rem',
            color: '#aaa',
            background: '#0a0a0a',
            padding: 10,
            borderRadius: 6,
            whiteSpace: 'pre-wrap',
            direction: 'ltr',
            textAlign: 'left',
          }}>
            {selectedTool.cmd?.replace('{TARGET}', target || 'TARGET')}
          </div>
          <div style={{ fontSize: '0.65rem', color: '#444', marginTop: 8 }}>
            {selectedTool.desc}
          </div>
        </div>
      )}

      {/* شريط الحالة السفلي */}
      <div style={{
        background: '#111',
        borderTop: '1px solid #1a2a2a',
        padding: '6px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.65rem',
        color: '#444',
        flexShrink: 0,
      }}>
        <span>💀 Eliot's Mask v1.0</span>
        <span>{target ? '🎯 جاهز' : '⏳ أدخل هدفاً'}</span>
        <span>⭐ {favorites.length} مفضلة</span>
      </div>
    </div>
  );
}

export default App;
