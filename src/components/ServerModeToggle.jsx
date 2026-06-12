import React from 'react';
import { getServerMode, toggleServerMode } from '../api/client';

export default function ServerModeToggle({ onToggle }) {
  const [mode, setMode] = React.useState(getServerMode());

  const handleToggle = () => {
    const newMode = toggleServerMode();
    setMode(newMode);
    onToggle?.(newMode);
  };

  return (
    <button
      onClick={handleToggle}
      title={mode === 'local' ? 'الوضع المحلي (Termux)' : 'الوضع السحابي (PythonAnywhere)'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 20,
        border: mode === 'local' ? '1px solid #ffaa00' : '1px solid #00aaff',
        background: mode === 'local' ? 'rgba(255,170,0,0.1)' : 'rgba(0,170,255,0.1)',
        color: mode === 'local' ? '#ffaa00' : '#00aaff',
        fontSize: '0.7rem',
        fontWeight: 700,
        cursor: 'pointer',
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
      }}
    >
      <span>{mode === 'local' ? '📱 محلي' : '☁️ سحابي'}</span>
    </button>
  );
}
