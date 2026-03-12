import { useState } from 'react';
import { Building2, XCircle, CheckCircle2, Factory, TrendingDown, PlayCircle } from 'lucide-react';
import { VENDORS, INVENTORY } from '../data/sampleData';
import { simulateVendorImpact } from '../data/optimizationEngine';
import AnimatedCounter from './common/AnimatedCounter';
import '../styles/VendorSimulation.css';

const VendorSimulation = ({ store, onNext, onBack }) => {
  const approvalVendors = VENDORS.filter(v => v.contractType === 'Consignment' && !v.markdownAllowed);
  const [vendorStatus, setVendorStatus] = useState(
    approvalVendors.reduce((acc, v) => ({ ...acc, [v.id]: 'pending' }), {})
  );

  const handleAction = (vendorId, action) => {
    setVendorStatus(prev => ({ ...prev, [vendorId]: action }));
  };

  const getSimulatedData = (vendorId) => {
    const vendorSKUs = INVENTORY.filter(sku => sku.vendorId === vendorId && sku.riskScore > 40);
    let totalWasteRisk = 0, totalUplift = 0, totalMarginLoss = 0;

    vendorSKUs.forEach(sku => {
      const impact = simulateVendorImpact(sku, { type: 'MARKDOWN', discount: 30 });
      totalWasteRisk += impact.wasteRiskValue;
      totalUplift += impact.expectedUplift;
      totalMarginLoss += Math.abs(impact.marginDelta);
    });
    return { totalWasteRisk, totalUplift, totalMarginLoss, skuCount: vendorSKUs.length };
  };

  const allApproved = Object.values(vendorStatus).every(status => status !== 'pending');

  return (
    <div className="vendor-simulation-container">
      <div className="simulation-header animate-fade-in">
        <h2>Ecosystem Network Approval</h2>
        <p className="subtitle-text">Real-time simulation portal for vendor contract nodes.</p>
      </div>

      <div className="vendors-list">
        {approvalVendors.map((vendor, index) => {
          const simData = getSimulatedData(vendor.id);
          const status = vendorStatus[vendor.id];

          return (
            <div 
              key={vendor.id} 
              className={`vendor-card glass-panel animate-fade-in ${status !== 'pending' ? 'acted' : ''}`}
              style={{ animationDelay: `${0.1 + (index * 0.1)}s` }}
            >
              <div className="vendor-header">
                <div className="vendor-title">
                  <div className="vendor-icon-wrapper">
                    <Factory size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3>{vendor.name}</h3>
                    <span className="vendor-meta uppercase-dim">Consignment Node • {simData.skuCount} SKUs At Risk</span>
                  </div>
                </div>
                
                <div className="status-badge-container">
                  {status === 'pending' && <span className="badge pending">AWAITING AUTHORIZATION</span>}
                  {status === 'approved' && <span className="badge approved glow-emerald"><CheckCircle2 size={14} /> AUTHORIZED</span>}
                  {status === 'rejected' && <span className="badge rejected glow-danger"><XCircle size={14} /> DENIED</span>}
                </div>
              </div>

              <div className="simulation-body">
                {/* Scenario A: Do Nothing */}
                <div className="scenario do-nothing">
                  <h4 className="uppercase-dim">Projection Alpha: Status Quo</h4>
                  <div className="scenario-stat text-danger">
                    <span>Spoilage Write-off Liability</span>
                    <strong className="number-font">฿<AnimatedCounter value={simData.totalWasteRisk} /></strong>
                  </div>
                  <p className="scenario-desc">100% loss absorption by vendor on expired consignment units.</p>
                </div>

                <div className="vs-divider">
                  <span className="number-font">VS</span>
                </div>

                {/* Scenario B: Approve Clearance */}
                <div className="scenario approve-clearance">
                  <h4 className="uppercase-dim text-primary">Projection Beta: V-SCOPS Mutual Clearance</h4>
                  <div className="scenario-stat text-warning">
                    <span>Shared Margin Impact</span>
                    <strong className="number-font"><TrendingDown size={14} /> ฿<AnimatedCounter value={simData.totalMarginLoss} /></strong>
                  </div>
                  <div className="scenario-stat text-success">
                    <span>Salvaged Liquidity</span>
                    <strong className="number-font text-success glow-text">฿<AnimatedCounter value={simData.totalUplift} /></strong>
                  </div>
                  <p className="scenario-desc text-primary">Dynamic cost sharing strategy to salvage capital liquidity.</p>
                </div>
              </div>

              {status === 'pending' && (
                <div className="vendor-actions">
                  <button className="secondary btn-reject" onClick={() => handleAction(vendor.id, 'rejected')}>
                    DECLINE ALGORITHM
                  </button>
                  <button className="primary btn-approve" onClick={() => handleAction(vendor.id, 'approved')}>
                    AUTHORIZE MUTUAL CLEARANCE
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="action-bar animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <button className="secondary" onClick={onBack}>Cancel Operation</button>
        <button 
          className="primary glow-emerald" 
          onClick={onNext}
          disabled={!allApproved}
        >
          {allApproved ? (
            <>
              <span>Execute Smart Campaigns</span>
              <PlayCircle size={18} />
            </>
          ) : (
            <span>Awaiting Vendor Authorizations</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default VendorSimulation;
