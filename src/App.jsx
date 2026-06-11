import React, { useState, useEffect, useCallback, useRef } from 'react';
import TargetBar from './components/TargetBar';
import ToolGrid from './components/ToolGrid';
import Terminal from './components/Terminal';
import { executeCommand } from './api/client';

// استرجاع المفضلة من localStorage
function getStoredFavorites() {
  try { return JSON.parse(localStorage.getItem('eliot_favorites') || '[]'); }
  catch { return []; }
}
function storeFavorites(favs) {
  localStorage.setItem('eliot_favorites', JSON.stringify(favs));
}

function App() {
  const [target, setTarget] = useState('');
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const [terminalLines, setTerminalLines] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => { storeFavorites(favorites); }, [favorites]);

  const addTerminalLine = useCallback((text, type = 'output') => {
    setTerminalLines(prev => [...prev, { text, type, time: new Date().toLocaleTimeString() }]);
  }, []);

  const handleToggleFavorite = (toolId) => {
    setFavorites(prev =>
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [toolId, ...prev]
    );
  };

  const handleSelectTool = (tool) => {
    setSelectedTool(tool);
    setShowTerminal(true);
    // عرض الأمر في الطرفية
    if (tool && target) {
      const cmd = tool.cmd.replace('{TARGET}', target);
      addTerminalLine(`$ ${cmd}`, 'command');
    }
  };

  const handleExecute = async () => {
    if (!selectedTool || !target || isExecuting) return;
    setIsExecuting(true);
    const cmd = selectedTool.cmd.replace('{TARGET}', target);
    addTerminalLine(`⏳ جاري التنفيذ...`, 'info');

    const result = await executeCommand(cmd);

    if (result.error) {
      addTerminalLine(result.error, 'error');
    } else if (result.output) {
      addTerminalLine(result.output, 'output');
      addTerminalLine('✅ اكتمل التنفيذ', 'success');
    } else {
      addTerminalLine('(لا توجد مخرجات)', 'dim');
    }
    setIsExecuting(false);
  };

  const handleClearTerminal = () => {
    setTerminalLines([]);
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

      {/* رسالة الهدف + زر التنفيذ */}
      {target && (
        <div style={{
          background: 'rgba(0,255,136,0.05)',
          borderBottom: '1px solid rgba(0,255,136,0.15)',
          padding: '6px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.7rem', color: '#00ff88', fontFamily: 'monospace', direction: 'ltr' }}>
            🎯 {target}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              style={{
                background: showTerminal ? 'rgba(0,255,136,0.1)' : 'transparent',
                border: '1px solid #333',
                borderRadius: 6,
                color: showTerminal ? '#00ff88' : '#888',
                padding: '5px 10px',
                fontSize: '0.65rem',
                cursor: 'pointer',
                fontFamily: 'monospace',
              }}
            >
              📟 {showTerminal ? 'إخفاء' : 'إظهار'} الطرفية
            </button>
            {selectedTool && (
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                style={{
                  background: isExecuting ? '#1a1a1a' : 'rgba(0,255,136,0.1)',
                  border: `1px solid ${isExecuting ? '#333' : '#00ff88'}`,
                  borderRadius: 6,
                  color: isExecuting ? '#666' : '#00ff88',
                  padding: '5px 14px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: isExecuting ? 'not-allowed' : 'pointer',
                  fontFamily: 'monospace',
                }}
              >
                {isExecuting ? '⏳ جاري...' : '▶ تنفيذ'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* المحتوى الرئيسي: شبكة الأدوات أو الطرفية */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* شبكة الأدوات */}
        <div style={{ flex: showTerminal ? 0.5 : 1, overflow: 'hidden', transition: 'flex 0.3s' }}>
          <ToolGrid
            onSelectTool={handleSelectTool}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        </div>

        {/* الطرفية */}
        {showTerminal && (
          <div style={{ flex: 0.5, overflow: 'hidden' }}>
            <Terminal
              lines={terminalLines}
              onClear={handleClearTerminal}
            />
          </div>
        )}
      </div>

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
        <span>⭐ {favorites.length}</span>
      </div>
    </div>
  );
}

export default App;
