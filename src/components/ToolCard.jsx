import React from 'react';
import { CATEGORIES } from '../data/tools';

export default function ToolCard({ tool, onSelect, isFavorite, onToggleFavorite }) {
  const cat = CATEGORIES[tool.cat] || { label: 'أداة', icon: '🔧', color: '#888' };

  return (
    <div
      onClick={() => onSelect?.(tool)}
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid rgba(255,255,255,0.06)`,
        borderLeft: `3px solid ${cat.color}`,
        borderRadius: 10,
        padding: 14,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        minHeight: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = cat.color;
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* زر المفضلة */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.(tool.id);
        }}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'transparent',
          border: 'none',
          fontSize: '1.2rem',
          cursor: 'pointer',
          color: isFavorite ? '#ffaa00' : '#333',
          transition: 'color 0.2s',
          padding: 4,
        }}
        title={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
      >
        ★
      </button>

      {/* أيقونة الأداة */}
      <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{tool.icon || '🔧'}</div>

      {/* اسم الأداة */}
      <div style={{
        fontFamily: 'monospace',
        fontWeight: 700,
        fontSize: '0.9rem',
        color: '#fff',
        marginBottom: 4,
      }}>
        {tool.name}
      </div>

      {/* وصف الأداة */}
      <div style={{
        fontSize: '0.7rem',
        color: '#888',
        lineHeight: 1.4,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        marginBottom: 6,
      }}>
        {tool.desc}
      </div>

      {/* شريط المعلومات */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.65rem',
      }}>
        <span style={{ color: cat.color, fontWeight: 600 }}>{cat.icon} {cat.label}</span>
        <span style={{
          padding: '2px 8px',
          borderRadius: 8,
          fontSize: '0.6rem',
          fontWeight: 700,
          background: tool.risk === 'critical' ? 'rgba(255,59,59,0.15)' :
                     tool.risk === 'high' ? 'rgba(255,170,0,0.15)' :
                     'rgba(0,255,136,0.1)',
          color: tool.risk === 'critical' ? '#ff3b3b' :
                 tool.risk === 'high' ? '#ffaa00' : '#00ff88',
        }}>
          {tool.risk?.toUpperCase() || 'LOW'}
        </span>
      </div>
    </div>
  );
}
