import { useMemo } from 'react';
import { Tag, PackageOpen, Handshake, ArrowRight, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { INVENTORY } from '../data/sampleData';
import { selectStrategy } from '../data/optimizationEngine';
import '../styles/OptimizationResults.css';

const chartData = [
  { time: 'Day 1', margin: 25 }, { time: 'Day 2', margin: 30 }, { time: 'Day 3', margin: 45 },
  { time: 'Day 4', margin: 35 }, { time: 'Day 5', margin: 60 }
];

const OptimizationResults = ({ store, onNext, onBack }) => {
  const optimizationStats = useMemo(() => {
    let markdownCount = 0, bundleCount = 0, vendorCount = 0, estimatedMarginUplift = 0;

    INVENTORY.forEach(sku => {
      const strategy = selectStrategy(sku);
      if (strategy.type === 'MARKDOWN') {
        markdownCount++; estimatedMarginUplift += (sku.price * sku.qty * 0.15); 
      }
      if (strategy.type === 'BUNDLE') {
        bundleCount++; estimatedMarginUplift += (sku.price * sku.qty * 0.25);
      }
      if (strategy.type === 'VENDOR_APPROVAL') {
        vendorCount++; estimatedMarginUplift += (sku.price * sku.qty * 0.10);
      }
    });

    return { markdownCount, bundleCount, vendorCount, estimatedMarginUplift };
  }, []);

  return (
    <div className="optimization-results-container">
      <div className="results-header animate-fade-in">
        <h2>AI Strategy Formulation</h2>
        <p className="subtitle-text">Profit orchestration strategies computed successfully.</p>
      </div>

      <div className="main-kpi-card glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="kpi-info">
          <div className="kpi-label">Projected Margin Uplift Value</div>
          <div className="kpi-value text-primary number-font">
            +฿{Math.round(optimizationStats.estimatedMarginUplift).toLocaleString()}
          </div>
          <div className="kpi-insight glow-emerald">
            <TrendingUp size={14} className="text-success" /> 
            <span><strong className="text-success number-font">18.4%</strong> Net Profit Increase</span>
          </div>
        </div>
        <div className="kpi-chart hide-mobile">
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF9D" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#00FF9D" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <Tooltip cursor={{stroke: 'rgba(255,255,255,0.1)'}} contentStyle={{background: '#070B18', border: '1px solid #00E5FF'}} />
              <Area type="monotone" dataKey="margin" stroke="#00FF9D" strokeWidth={3} fillOpacity={1} fill="url(#colorMargin)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="strategy-grid">
        <StrategyCard 
          icon={Tag} 
          title="Smart Markdown" 
          desc="Algorithmically optimized price cuts for self-owned inventory." 
          statLabel="SKUs Analyzed"
          statValue={optimizationStats.markdownCount}
          accent="primary"
          delay="0.2s"
        />

        <StrategyCard 
          icon={PackageOpen} 
          title="Smart Bundle" 
          desc="Cross-linked clearance with high-margin items to absorb discount costs." 
          statLabel="Combo Pairs Generated"
          statValue={optimizationStats.bundleCount}
          accent="success"
          delay="0.3s"
        />

        <StrategyCard 
          icon={Handshake} 
          title="Vendor Co-Funded" 
          desc="Automated margin-sharing negotiation for restricted consignment stock." 
          statLabel="Pending Approvals"
          statValue={optimizationStats.vendorCount}
          accent="warning"
          delay="0.4s"
        />
      </div>

      <div className="action-bar animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <button className="secondary" onClick={onBack}>Cancel Operation</button>
        <button className="primary glow-cyan" onClick={onNext}>
          <span>Execute Vendor Protocol</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

const StrategyCard = ({ icon: Icon, title, desc, statLabel, statValue, accent, delay }) => (
  <div className={`strategy-card glass-panel accent-${accent} animate-fade-in`} style={{ animationDelay: delay }}>
    <div className={`strategy-icon-wrapper text-${accent}`}>
      <Icon size={24} />
    </div>
    <div className="strategy-content">
      <h3>{title}</h3>
      <p className="strategy-desc">{desc}</p>
      <div className="strategy-stats">
        <span className="stat-label text-dim">{statLabel}</span>
        <strong className="stat-value number-font">{statValue}</strong>
      </div>
    </div>
  </div>
);

export default OptimizationResults;
