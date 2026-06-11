import React, { useState } from 'react';
import ToolCard from './ToolCard';
import { getToolsByCategory, CATEGORIES } from '../data/tools';

export default function ToolGrid({ onSelectTool, favorites, onToggleFavorite }) {
  const [activeCat, setActiveCat] = useState('all');

  const tools = getToolsByCategory(activeCat);
  const allCats = [
    { key: 'all', label: '📋 الكل', color: '#fff' },
    ...Object.entries(CATEGORIES).map(([key, val]) => ({
      key,
      label: `${val.icon} ${val.label}`,
      color: val.color,
    })),
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* ألسنة الفئات */}
      <div style={{
        display: 'flex',
        gap: 4,
        padding: '10px 14px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        borderBottom: '1px solid #1a2a2a',
        flexShrink: 0,
      }}>
        {allCats.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCat(cat.key)}
            style={{
              padding: '7px 14px',
              borderRadius: 20,
              border: activeCat === cat.key ? `1px solid ${cat.color}` : '1px solid transparent',
              background: activeCat === cat.key ? `${cat.color}15` : 'transparent',
              color: activeCat === cat.key ? cat.color : '#666',
              fontSize: '0.7rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
              fontFamily: 'inherit',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* شبكة البطاقات */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 12,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: 10,
        alignContent: 'start',
      }}>
        {tools.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: 40,
            color: '#444',
          }}>
            لا توجد أدوات في هذه الفئة
          </div>
        )}
        {tools.map(tool => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onSelect={onSelectTool}
            isFavorite={favorites?.includes(tool.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
