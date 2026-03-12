import { useState, useEffect } from 'react';
import { CheckCircle2, RefreshCcw, Wifi, Smartphone, MonitorPlay, Receipt, Cpu } from 'lucide-react';
import AnimatedCounter from './common/AnimatedCounter';
import '../styles/ExecutionSummary.css';

const ExecutionSummary = ({ store, onStartOver }) => {
  const [channelsStatus, setChannelsStatus] = useState({
    pos: false,
    app: false,
    tag: false,
    screen: false
  });

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Simulate staggered execution push across network nodes
    const timers = [
      setTimeout(() => setChannelsStatus(prev => ({ ...prev, pos: true })), 800),
      setTimeout(() => setChannelsStatus(prev => ({ ...prev, tag: true })), 1600),
      setTimeout(() => setChannelsStatus(prev => ({ ...prev, app: true })), 2400),
      setTimeout(() => setChannelsStatus(prev => ({ ...prev, screen: true })), 3200),
      setTimeout(() => setShowConfetti(true), 3600)
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const allDone = Object.values(channelsStatus).every(Boolean);

  return (
    <div className="execution-summary-container">
      {/* Abstract Animated Glows instead of traditional confetti for a minimal look */}
      {showConfetti && (
        <div className="futuristic-success-glow animate-fade-in"></div>
      )}

      <div className="success-header animate-fade-in">
        <div className="success-icon-wrapper glow-emerald">
          <Cpu size={36} className="text-success" />
        </div>
        <h2>Orchestration Complete</h2>
        <p className="subtitle-text">Clearance rules algorithmically pushed to {store?.name || 'CP network'} nodes.</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card glass-panel accent-success animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h4>Food Waste Prevented</h4>
          <div className="metric-value text-success number-font glow-text">
            <AnimatedCounter value={2450} prefix="฿" />
          </div>
          <span className="metric-desc uppercase-dim">Stock Value Salvaged</span>
        </div>
        
        <div className="metric-card glass-panel accent-primary animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h4>Margin Liquidity Protected</h4>
          <div className="metric-value text-primary number-font glow-text">
            <AnimatedCounter value={1800} prefix="฿" />
          </div>
          <span className="metric-desc uppercase-dim">Retained via network</span>
        </div>

        <div className="metric-card glass-panel accent-warning animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h4>Actioned SKUs</h4>
          <div className="metric-value text-warning number-font glow-text">
            <AnimatedCounter value={42} />
          </div>
          <span className="metric-desc uppercase-dim">Products Optimized</span>
        </div>
      </div>

      <div className="execution-channels animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h3 className="uppercase-dim margin-bottom-sm">Omnichannel Sync Status</h3>
        <div className="channels-grid">
          <ChannelCard 
            icon={Receipt} 
            name="POS Network" 
            desc="Pricing Rules Active"
            status={channelsStatus.pos} 
          />
          <ChannelCard 
            icon={Wifi} 
            name="Digital Tags" 
            desc="E-ink Display Sync"
            status={channelsStatus.tag} 
          />
          <ChannelCard 
            icon={Smartphone} 
            name="7App Delivery" 
            desc="Promo Banners Live"
            status={channelsStatus.app} 
          />
          <ChannelCard 
            icon={MonitorPlay} 
            name="In-Store Screens" 
            desc="Digital Signage Active"
            status={channelsStatus.screen} 
          />
        </div>
      </div>

      <div className="action-bar animate-fade-in" style={{ animationDelay: '3.6s', opacity: allDone ? 1 : 0 }}>
        <button className="primary" onClick={onStartOver}>
          <RefreshCcw size={16} />
          <span>Initialize New Node</span>
        </button>
      </div>
    </div>
  );
};

const ChannelCard = ({ icon: Icon, name, desc, status }) => (
  <div className={`channel-card glass-panel ${status ? 'synced' : 'syncing'}`}>
    <div className="channel-icon">
      <Icon size={20} />
    </div>
    <div className="channel-info">
      <h4>{name}</h4>
      <p>{desc}</p>
    </div>
    <div className="channel-status">
      {status ? (
        <span className="status-badge success">
          <CheckCircle2 size={12} /> SYNCED
        </span>
      ) : (
        <span className="status-badge pending">
          <div className="pulse-dot"></div> SYNCING
        </span>
      )}
    </div>
    {/* Minimalist connecting line effect */}
    {status && <div className="cyber-line-top"></div>}
  </div>
);

export default ExecutionSummary;
