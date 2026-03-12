import { useState, useMemo } from 'react';
import { Tag, PackageOpen, Handshake, ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { INVENTORY, VENDORS } from '../data/sampleData';
import { selectStrategy } from '../data/optimizationEngine';
import '../styles/OptimizationResults.css';

const chartData = [
  { time: 'Day 1', margin: 25 }, { time: 'Day 2', margin: 30 }, { time: 'Day 3', margin: 45 },
  { time: 'Day 4', margin: 35 }, { time: 'Day 5', margin: 60 }
];

const OptimizationResults = ({ store, onNext, onBack }) => {
  // Compute strategies
  const optimizationStats = useMemo(() => {
    let markdownCount = 0;
    let bundleCount = 0;
    let vendorCount = 0;
    let estimatedMarginUplift = 0;

    INVENTORY.forEach(sku => {
      const strategy = selectStrategy(sku);
      if (strategy.type === 'MARKDOWN') {
        markdownCount++;
        estimatedMarginUplift += (sku.price * sku.qty * 0.15); // Simulated uplift
      }
      if (strategy.type === 'BUNDLE') {
        bundleCount++;
        estimatedMarginUplift += (sku.price * sku.qty * 0.25);
      }
      if (strategy.type === 'VENDOR_APPROVAL') {
        vendorCount++;
        estimatedMarginUplift += (sku.price * sku.qty * 0.10);
      }
    });

    return { markdownCount, bundleCount, vendorCount, estimatedMarginUplift };
  }, []);

  return (
    <div className="optimization-results-container">
      {/* Overview Headings */}
      <div className="results-header animate-fade-in">
        <h2>AI Orchestration Summary</h2>
        <p>V-SCOPS has analyzed vendor contracts and inventory to suggest the most profitable clearance strategies.</p>
      </div>

      {/* Main KPI Card */}
      <div className="main-kpi-card glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="kpi-info">
          <div className="kpi-label">Projected Margin Uplift vs Doing Nothing</div>
          <div className="kpi-value text-success">
            +฿{Math.round(optimizationStats.estimatedMarginUplift).toLocaleString()}
          </div>
          <div className="kpi-insight">
            <TrendingUp size={16} /> <span>18.4% improvement in net branch profit</span>
          </div>
        </div>
        <div className="kpi-chart">
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <Tooltip formatter={(value) => [`${value}%`, 'Margin']} />
              <Area type="monotone" dataKey="margin" stroke="#10b981" fillOpacity={1} fill="url(#colorMargin)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strategy Breakdown */}
      <div className="strategy-grid">
        <div className="strategy-card glass-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="strategy-icon markdown-icon">
            <Tag size={24} />
          </div>
          <h3>Smart Markdown</h3>
          <p className="strategy-desc">Direct price cuts for self-owned inventory or allowed vendors.</p>
          <div className="strategy-stats">
            <div className="stat-line">
              <span>Affected SKUs</span>
              <strong>{optimizationStats.markdownCount} Items</strong>
            </div>
            <div className="stat-line text-success">
              <span>Win Rate</span>
              <strong>High</strong>
            </div>
          </div>
        </div>

        <div className="strategy-card glass-panel animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="strategy-icon bundle-icon">
            <PackageOpen size={24} />
          </div>
          <h3>Smart Bundle</h3>
          <p className="strategy-desc">Cross-selling expiring items with high-margin drinks to absorb cost.</p>
          <div className="strategy-stats">
            <div className="stat-line">
              <span>Affected SKUs</span>
              <strong>{optimizationStats.bundleCount} Combos</strong>
            </div>
            <div className="stat-line text-success">
              <span>Avg Margin</span>
              <strong>28% </strong>
            </div>
          </div>
        </div>

        <div className="strategy-card glass-panel animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="strategy-icon vendor-icon">
            <Handshake size={24} />
          </div>
          <h3>Vendor Co-Funded</h3>
          <p className="strategy-desc">Requesting mutual margin reduction for restricted consignment items.</p>
          <div className="strategy-stats">
            <div className="stat-line">
              <span>Pending Approvals</span>
              <strong>{optimizationStats.vendorCount} Vendors</strong>
            </div>
            <div className="stat-line text-warning">
              <span>Action Required</span>
              <strong>Simulate &rarr;</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="action-bar animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <button className="secondary" onClick={onBack}>Back to Dashboard</button>
        <button className="primary" onClick={onNext}>
          <span>View Vendor Simulations</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default OptimizationResults;
