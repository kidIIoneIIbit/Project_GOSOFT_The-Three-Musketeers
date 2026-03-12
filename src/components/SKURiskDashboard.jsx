import { useState, useMemo } from 'react';
import { PackageSearch, Calendar, ArrowRight, Activity, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { INVENTORY, VENDORS } from '../data/sampleData';
import RiskBadge from './common/RiskBadge';
import '../styles/SKURiskDashboard.css';

const sparklineData = [
  { day: 'Mon', sales: 12 }, { day: 'Tue', sales: 10 }, { day: 'Wed', sales: 15 },
  { day: 'Thu', sales: 8 }, { day: 'Fri', sales: 6 }, { day: 'Sat', sales: 4 }, { day: 'Sun', sales: 2 }
];

const SKURiskDashboard = ({ store, onNext, onBack }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const categories = ['All', ...new Set(INVENTORY.map(item => item.category))];

  const filteredItems = useMemo(() => {
    let items = INVENTORY;
    if (activeCategory !== 'All') {
      items = items.filter(i => i.category === activeCategory);
    }
    // Sort by risk score descending
    return items.sort((a, b) => b.riskScore - a.riskScore);
  }, [activeCategory]);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      onNext();
    }, 1500); // Simulate AI calculation time
  };

  const totalRiskValue = useMemo(() => {
    return INVENTORY.filter(i => i.riskScore > 70).reduce((sum, item) => sum + (item.price * item.qty), 0);
  }, []);

  return (
    <div className="risk-dashboard-container">
      {/* Top Action Bar */}
      <div className="dashboard-stats glass-panel animate-fade-in">
        <div className="stat-group">
          <div className="stat-icon-wrapper danger-glow">
            <Activity size={24} className="text-danger" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Critical Waste Risk (THB)</span>
            <span className="stat-value">฿{totalRiskValue.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="stat-group">
          <div className="stat-icon-wrapper warning-glow">
            <PackageSearch size={24} className="text-warning" />
          </div>
          <div className="stat-info">
            <span className="stat-label">High Risk SKUs</span>
            <span className="stat-value">{INVENTORY.filter(i => i.riskScore > 70).length} Items</span>
          </div>
        </div>

        <button 
          className="primary optimize-btn" 
          onClick={handleOptimize}
          disabled={isOptimizing}
        >
          {isOptimizing ? (
            <>
              <Zap className="spin" size={20} />
              <span>AI Optimizing...</span>
            </>
          ) : (
            <>
              <BrainCircuitIcon size={20} />
              <span>Run AI Optimization</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SKU Table */}
      <div className="sku-table-container glass-panel animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <table className="sku-table">
          <thead>
            <tr>
              <th>SKU Details</th>
              <th>Vendor Type</th>
              <th>Inventory</th>
              <th>Expiry Window</th>
              <th>Run-Rate Trend</th>
              <th>AI Risk Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, idx) => {
              const vendor = VENDORS.find(v => v.id === item.vendorId);
              return (
                <tr key={item.id} className="animate-fade-in" style={{ animationDelay: `${0.2 + (idx * 0.05)}s` }}>
                  <td>
                    <div className="sku-details">
                      <span className="sku-name">{item.name}</span>
                      <span className="sku-id">{item.id} • {item.category}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`contract-badge ${vendor.contractType.toLowerCase()}`}>
                      {vendor.contractType}
                    </span>
                  </td>
                  <td>
                    <div className="inventory-details">
                      <span className="qty">{item.qty} units</span>
                      <span className="sell-rate">@{item.sellRate}/day</span>
                    </div>
                  </td>
                  <td>
                    <div className="expiry-details">
                      <Calendar size={14} className={item.daysToExpiry <= 1 ? 'text-danger' : 'text-warning'} />
                      <span className={item.daysToExpiry <= 1 ? 'text-danger' : ''}>
                        {item.daysToExpiry} {item.daysToExpiry === 1 ? 'day' : 'days'}
                      </span>
                    </div>
                  </td>
                  <td className="sparkline-cell">
                    <ResponsiveContainer width="100%" height={30}>
                      <AreaChart data={sparklineData}>
                        <Tooltip content={<></>} />
                        <Area 
                          type="monotone" 
                          dataKey="sales" 
                          stroke={item.riskScore > 70 ? '#ef4444' : '#3b82f6'} 
                          fill={item.riskScore > 70 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)'} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </td>
                  <td>
                    <RiskBadge score={item.riskScore} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="action-bar">
        <button className="secondary" onClick={onBack}>Back to Stores</button>
      </div>
    </div>
  );
};

// Helper component for icon
const BrainCircuitIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
    <path d="M9 13a4.5 4.5 0 0 0 3-4"/>
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
    <path d="M6 18a4 4 0 0 1-1.967-.516"/>
    <path d="M12 13h4"/>
    <path d="M12 18h6a2 2 0 0 1 2 2v1"/>
    <path d="M12 8h8"/>
    <path d="M16 8V5a2 2 0 0 1 2-2"/>
    <circle cx="16" cy="13" r=".5"/>
    <circle cx="18" cy="3" r=".5"/>
    <circle cx="20" cy="21" r=".5"/>
    <circle cx="20" cy="8" r=".5"/>
  </svg>
);

export default SKURiskDashboard;
