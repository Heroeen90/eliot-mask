import React from 'react';

// قائمة الأوامر الخطيرة التي تمنع في الوضع الآمن
const DANGEROUS_PATTERNS = [
  'rm -rf',
  'DROP TABLE',
  'DROP DATABASE',
  'DELETE FROM',
  'FORMAT',
  'shutdown',
  'reboot',
  'mkfs',
  'dd if=',
  ':(){ :|:& };:',  // fork bomb
  '> /dev/sda',
  'chmod 777 /',
  'wget -O /etc/',
  'curl -o /etc/',
];

export function isDangerousCommand(command) {
  const lower = command.toLowerCase();
  return DANGEROUS_PATTERNS.some(pattern => lower.includes(pattern.toLowerCase()));
}

export function getDangerousWarning(command) {
  const lower = command.toLowerCase();
  const found = DANGEROUS_PATTERNS.find(p => lower.includes(p.toLowerCase()));
  return found ? `⚠️ هذا الأمر يحتوي على "${found}" وهو أمر خطير قد يسبب ضرراً للنظام.` : null;
}

export default function SafeModeToggle({ enabled, onToggle }) {
  return (
    <button
      onClick={onToggle}
      title={enabled ? 'الوضع الآمن مفعّل - الأوامر الخطيرة ممنوعة' : 'الوضع الآمن معطّل'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 12px',
        borderRadius: 20,
        border: enabled ? '1px solid #00ff88' : '1px solid #ff3b3b',
        background: enabled ? 'rgba(0,255,136,0.1)' : 'rgba(255,59,59,0.1)',
        color: enabled ? '#00ff88' : '#ff3b3b',
        fontSize: '0.7rem',
        fontWeight: 700,
        cursor: 'pointer',
        fontFamily: 'monospace',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
      }}
    >
      <span>{enabled ? '🛡️' : '⚠️'}</span>
      <span>{enabled ? 'آمن' : 'غير آمن'}</span>
    </button>
  );
}
