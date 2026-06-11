import React, { useState, useEffect, useCallback } from 'react';
import TargetBar from './components/TargetBar';
import ToolGrid from './components/ToolGrid';
import Terminal from './components/Terminal';
import HistoryPanel, { addToHistory } from './components/HistoryPanel';
import SafeModeToggle, { isDangerousCommand, getDangerousWarning } from './components/SafeModeToggle';
import ConfirmDialog from './components/ConfirmDialog';
import { executeCommand } from './api/client';

function getStoredFavorites() {
  try { return JSON.parse(localStorage.getItem('eliot_favorites') || '[]'); }
  catch { return []; }
}
function storeFavorites(favs) { localStorage.setItem('eliot_favorites', JSON.stringify(favs)); }

function App() {
  const [target, setTarget] = useState('');
  const [favorites, setFavorites] = useState(getStoredFavorites);
  const [terminalLines, setTerminalLines] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [safeMode, setSafeMode] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState(null);

  useEffect(() => { storeFavorites(favorites); }, [favorites]);

  const addTerminalLine = useCallback((text, type = 'output') => {
    setTerminalLines(prev => [...prev, { text, type, time: new Date().toLocaleTimeString() }]);
  }, []);

  const handleToggleFavorite = (toolId) => {
    setFavorites(prev => prev.includes(toolId) ? prev.filter(id => id !== toolId) : [toolId, ...prev]);
  };

  const handleSelectTool = (tool) => {
    setSelectedTool(tool);
    setShowTerminal(true);
    if (tool && target) {
      const cmd = tool.cmd.replace('{TARGET}', target);
      addTerminalLine(`$ ${cmd}`, 'command');
    }
  };

  const executeWithSafety = async (cmd) => {
    // 1. فحص الوضع الآمن
    if (safeMode && isDangerousCommand(cmd)) {
      const warning = getDangerousWarning(cmd);
      addTerminalLine(`⛔ ممنوع في الوضع الآمن: ${warning}`, 'error');
      return;
    }

    // 2. تنفيذ
    const result = await executeCommand(cmd);

    if (result.error) {
      addTerminalLine(result.error, 'error');
    } else if (result.output) {
      addTerminalLine(result.output, 'output');
      addTerminalLine('✅ اكتمل التنفيذ', 'success');
    } else {
      addTerminalLine('(لا توجد مخرجات)', 'dim');
    }

    // 3. حفظ في التاريخ
    addToHistory({
      command: cmd,
      tool: selectedTool?.name || 'أمر مخصص',
      target,
      success: !result.error,
      output: result.output?.substring(0, 200) || '',
    });
  };

  const handleExecute = async () => {
    if (!selectedTool || !target || isExecuting) return;
    const cmd = selectedTool.cmd.replace('{TARGET}', target);

    // إذا كان الأمر خطيراً والوضع الآمن معطل، أظهر تأكيداً
    if (!safeMode && isDangerousCommand(cmd)) {
      setConfirmDialog({
        message: getDangerousWarning(cmd) || 'هذا الأمر قد يسبب ضرراً.',
        onConfirm: async () => {
          setConfirmDialog(null);
          setIsExecuting(true);
          await executeWithSafety(cmd);
          setIsExecuting(false);
        },
        onCancel: () => {
          setConfirmDialog(null);
          addTerminalLine('❌ تم إلغاء التنفيذ', 'warning');
        },
      });
      return;
    }

    setIsExecuting(true);
    await executeWithSafety(cmd);
    setIsExecuting(false);
  };

  const handleReplay = async (entry) => {
    setTarget(entry.target || '');
    setTerminalLines([]);
    addTerminalLine(`$ ${entry.command}`, 'command');
    addTerminalLine('🔄 إعادة تنفيذ...', 'info');
    setShowTerminal(true);
    setShowHistory(false);
    await executeWithSafety(entry.command);
  };

  const handleClearTerminal = () => setTerminalLines([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0a0a', color: '#ccc' }}>
      {/* شريط الهدف */}
      <TargetBar onTargetChange={setTarget} />

      {/* شريط التحكم */}
      <div style={{
        background: 'rgba(0,255,136,0.03)',
        borderBottom: '1px solid #1a2a2a',
        padding: '8px 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
      }}>
        <SafeModeToggle enabled={safeMode} onToggle={() => setSafeMode(!safeMode)} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {target && (
            <>
              <button onClick={() => setShowHistory(!showHistory)} style={ctrlBtnStyle(showHistory ? '#ffaa00' : '#888')}>
                📜 {showHistory ? 'إخفاء' : 'سجل'}
              </button>
              <button onClick={() => setShowTerminal(!showTerminal)} style={ctrlBtnStyle(showTerminal ? '#00ff88' : '#888')}>
                📟 {showTerminal ? 'إخفاء' : 'طرفية'}
              </button>
              {selectedTool && (
                <button onClick={handleExecute} disabled={isExecuting} style={{ ...ctrlBtnStyle('#00ff88'), opacity: isExecuting ? 0.5 : 1 }}>
                  {isExecuting ? '⏳' : '▶'} {selectedTool.name}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {showHistory ? (
          <HistoryPanel onReplay={handleReplay} onClose={() => setShowHistory(false)} />
        ) : (
          <>
            <div style={{ flex: showTerminal ? 0.5 : 1, overflow: 'hidden', transition: 'flex 0.3s' }}>
              <ToolGrid onSelectTool={handleSelectTool} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
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
      <div style={{ background: '#111', borderTop: '1px solid #1a2a2a', padding: '6px 16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#444', flexShrink: 0 }}>
        <span>💀 Eliot's Mask v1.0</span>
        <span>{target ? '🎯 جاهز' : '⏳ أدخل هدفاً'}</span>
        <span>⭐ {favorites.length}</span>
      </div>

      {/* نافذة التأكيد */}
      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
    </div>
  );
}

function ctrlBtnStyle(color) {
  return {
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${color}33`,
    borderRadius: 6,
    color, padding: '5px 10px', fontSize: '0.65rem',
    cursor: 'pointer', fontFamily: 'monospace',
  };
}

export default App;
