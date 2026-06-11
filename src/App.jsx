import React, { useState, useEffect, useCallback } from 'react';
import TargetBar from './components/TargetBar';
import ToolGrid from './components/ToolGrid';
import Terminal from './components/Terminal';
import HistoryPanel, { addToHistory } from './components/HistoryPanel';
import { executeCommand } from './api/client';

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
  const [showHistory, setShowHistory] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

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
    if (tool && target) {
      const cmd = tool.cmd.replace('{TARGET}', target);
      addTerminalLine(`$ ${cmd}`, 'command');
    }
  };

  const handleExecute = async () => {
    if (!selectedTool || !target || isExecuting) return;
    setIsExecuting(true);
    const cmd = selectedTool.cmd.replace('{TARGET}', target);

    const result = await executeCommand(cmd);

    if (result.error) {
      addTerminalLine(result.error, 'error');
    } else if (result.output) {
      addTerminalLine(result.output, 'output');
      addTerminalLine('✅ اكتمل التنفيذ', 'success');
    } else {
      addTerminalLine('(لا توجد مخرجات)', 'dim');
    }

    // حفظ في التاريخ
    addToHistory({
      command: cmd,
      tool: selectedTool.name,
      target,
      success: !result.error,
      output: result.output?.substring(0, 200) || '',
    });

    setIsExecuting(false);
  };

  const handleReplay = (entry) => {
    setTarget(entry.target || '');
    setTerminalLines([]);
    addTerminalLine(`$ ${entry.command}`, 'command');
    addTerminalLine('🔄 إعادة تنفيذ...', 'info');
    setShowTerminal(true);
    setShowHistory(false);
    // إعادة التنفيذ تلقائياً
    setTimeout(async () => {
      const result = await executeCommand(entry.command);
      if (result.error) addTerminalLine(result.error, 'error');
      else if (result.output) {
        addTerminalLine(result.output, 'output');
        addTerminalLine('✅ اكتمل التنفيذ', 'success');
      }
    }, 500);
  };

  const handleClearTerminal = () => setTerminalLines([]);

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

      {/* شريط التحكم */}
      {target && (
        <div style={{
          background: 'rgba(0,255,136,0.05)',
          borderBottom: '1px solid rgba(0,255,136,0.15)',
          padding: '6px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 6,
        }}>
          <span style={{ fontSize: '0.7rem', color: '#00ff88', fontFamily: 'monospace', direction: 'ltr' }}>
            🎯 {target}
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setShowHistory(!showHistory)}
              style={ctrlBtnStyle(showHistory ? '#ffaa00' : '#888')}
            >
              📜 {showHistory ? 'إخفاء' : 'سجل'}
            </button>
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              style={ctrlBtnStyle(showTerminal ? '#00ff88' : '#888')}
            >
              📟 {showTerminal ? 'إخفاء' : 'طرفية'}
            </button>
            {selectedTool && (
              <button
                onClick={handleExecute}
                disabled={isExecuting}
                style={{
                  ...ctrlBtnStyle('#00ff88'),
                  opacity: isExecuting ? 0.5 : 1,
                }}
              >
                {isExecuting ? '⏳' : '▶'} تنفيذ {selectedTool.name}
              </button>
            )}
          </div>
        </div>
      )}

      {/* المحتوى الرئيسي */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {showHistory ? (
          <HistoryPanel onReplay={handleReplay} onClose={() => setShowHistory(false)} />
        ) : (
          <>
            <div style={{ flex: showTerminal ? 0.5 : 1, overflow: 'hidden', transition: 'flex 0.3s' }}>
              <ToolGrid
                onSelectTool={handleSelectTool}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
            {showTerminal && (
              <div style={{ flex: 0.5, overflow: 'hidden' }}>
                <Terminal lines={terminalLines} onClear={handleClearTerminal} />
              </div>
            )}
          </>
        )}
      </div>

      {/* شريط الحالة */}
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

function ctrlBtnStyle(color) {
  return {
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${color}33`,
    borderRadius: 6,
    color: color,
    padding: '5px 10px',
    fontSize: '0.65rem',
    cursor: 'pointer',
    fontFamily: 'monospace',
  };
}

export default App;
