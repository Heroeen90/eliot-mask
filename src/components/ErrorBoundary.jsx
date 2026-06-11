import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: '#0a0a0a',
          color: '#ccc',
          padding: 20,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>💀</div>
          <div style={{ fontSize: '1.2rem', color: '#ff3b3b', marginBottom: 8 }}>حدث خطأ غير متوقع</div>
          <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: 20 }}>
            {this.state.error?.message || 'يرجى إعادة تحميل التطبيق'}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 28px',
              borderRadius: 8,
              border: '1px solid #00ff88',
              background: 'rgba(0,255,136,0.1)',
              color: '#00ff88',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
            }}
          >
            🔄 إعادة تحميل
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
