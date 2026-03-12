import { useState, useEffect } from 'react';
import { CheckCircle2, RefreshCcw, Wifi, Smartphone, MonitorPlay, Receipt } from 'lucide-react';
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
    // Simulate staggered execution push
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
      {showConfetti && (
        <div className="confetti-overlay animate-fade-in">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>
      )}

      <div className="success-header animate-fade-in">
        <div className="success-icon-wrapper">
          <CheckCircle2 size={48} className="text-success" />
        </div>
        <h2>Execution Complete</h2>
        <p>Dynamic pricing, bundling rules, and digital promotions have been pushed to {store?.name || 'CP FreshMart'}.</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card glass-panel text-success animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h4>Food Waste Prevented</h4>
          <div className="metric-value">
            <AnimatedCounter value={2450} prefix="฿" />
          </div>
          <span className="metric-desc">Worth of expiring stock salvaged</span>
        </div>
        
        <div className="metric-card glass-panel text-primary animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h4>Margin Protected</h4>
          <div className="metric-value">
            <AnimatedCounter value={1800} prefix="฿" />
          </div>
          <span className="metric-desc">Retained via co-funding & bundles</span>
        </div>

        <div className="metric-card glass-panel text-warning animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h4>Actioned SKUs</h4>
          <div className="metric-value">
            <AnimatedCounter value={42} />
          </div>
          <span className="metric-desc">Items optimized</span>
        </div>
      </div>

      <div className="execution-channels animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h3>Omnichannel Sync Status</h3>
        <div className="channels-grid">
          <ChannelCard 
            icon={Receipt} 
            name="POS System" 
            desc="Price rules synced"
            status={channelsStatus.pos} 
          />
          <ChannelCard 
            icon={Wifi} 
            name="Digital Price Tags" 
            desc="E-ink updated"
            status={channelsStatus.tag} 
          />
          <ChannelCard 
            icon={Smartphone} 
            name="7App Delivery" 
            desc="Promo banners live"
            status={channelsStatus.app} 
          />
          <ChannelCard 
            icon={MonitorPlay} 
            name="In-Store Screens" 
            desc="Clearance ads running"
            status={channelsStatus.screen} 
          />
        </div>
      </div>

      <div className="action-bar animate-fade-in" style={{ animationDelay: '3.6s', opacity: allDone ? 1 : 0 }}>
        <button className="primary" onClick={onStartOver}>
          <RefreshCcw size={18} />
          <span>Optimize Another Store</span>
        </button>
      </div>
    </div>
  );
};

const ChannelCard = ({ icon: Icon, name, desc, status }) => (
  <div className={`channel-card glass-panel ${status ? 'synced' : 'syncing'}`}>
    <div className="channel-icon">
      <Icon size={24} />
    </div>
    <div className="channel-info">
      <h4>{name}</h4>
      <p>{desc}</p>
    </div>
    <div className="channel-status">
      {status ? (
        <span className="status-badge success">
          <CheckCircle2 size={14} /> Synced
        </span>
      ) : (
        <span className="status-badge pending">
          <div className="pulse-dot"></div> Syncing...
        </span>
      )}
    </div>
  </div>
);

export default ExecutionSummary;
