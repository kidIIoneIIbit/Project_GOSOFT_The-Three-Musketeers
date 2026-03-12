import { useState } from 'react';
import { Building2, XCircle, CheckCircle2, Factory, TrendingDown, ArrowRight, PlayCircle } from 'lucide-react';
import { VENDORS, INVENTORY } from '../data/sampleData';
import { selectStrategy, simulateVendorImpact } from '../data/optimizationEngine';
import AnimatedCounter from './common/AnimatedCounter';
import '../styles/VendorSimulation.css';

const VendorSimulation = ({ store, onNext, onBack }) => {
  // Find vendors that need approval (Consignment & markdownNotAllowed)
  const approvalVendors = VENDORS.filter(v => v.contractType === 'Consignment' && !v.markdownAllowed);
  
  const [vendorStatus, setVendorStatus] = useState(
    approvalVendors.reduce((acc, v) => ({ ...acc, [v.id]: 'pending' }), {})
  );

  const handleAction = (vendorId, action) => {
    setVendorStatus(prev => ({ ...prev, [vendorId]: action }));
  };

  const getSimulatedData = (vendorId) => {
    // Collect all SKUs for this vendor that are at risk
    const vendorSKUs = INVENTORY.filter(sku => sku.vendorId === vendorId && sku.riskScore > 40);
    
    let totalWasteRisk = 0;
    let totalUplift = 0;
    let totalMarginLoss = 0;

    vendorSKUs.forEach(sku => {
      // Simulate impact if markdown was applied
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
        <h2>Ecosystem Collaborative Simulation</h2>
        <p>Real-time portal for vendors to approve mutual-margin clearances and avoid food waste write-offs.</p>
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
                    <Factory size={20} />
                  </div>
                  <div>
                    <h3>{vendor.name}</h3>
                    <span className="vendor-meta">Consignment Partner • {simData.skuCount} SKUs at Risk</span>
                  </div>
                </div>
                
                <div className="status-badge-container">
                  {status === 'pending' && <span className="badge pending">Pending Approval</span>}
                  {status === 'approved' && <span className="badge approved"><CheckCircle2 size={16} /> Co-Fund Approved</span>}
                  {status === 'rejected' && <span className="badge rejected"><XCircle size={16} /> Rejected</span>}
                </div>
              </div>

              <div className="simulation-body">
                {/* Scenario A: Do Nothing */}
                <div className="scenario do-nothing">
                  <h4>Scenario A: Do Nothing</h4>
                  <div className="scenario-stat text-danger">
                    <span>Spoilage Write-off Cost</span>
                    <strong>฿<AnimatedCounter value={simData.totalWasteRisk} /></strong>
                  </div>
                  <p className="scenario-desc">Items expire, vendor bears 100% cost of unsold consignment stock.</p>
                </div>

                <div className="vs-divider">
                  <span>VS</span>
                </div>

                {/* Scenario B: Approve Clearance */}
                <div className="scenario approve-clearance">
                  <h4>Scenario B: V-SCOPS Clearance</h4>
                  <div className="scenario-stat text-warning">
                    <span>Shared Margin Reduction</span>
                    <strong><TrendingDown size={14} /> ฿<AnimatedCounter value={simData.totalMarginLoss} /></strong>
                  </div>
                  <div className="scenario-stat text-success">
                    <span>Salvaged Revenue</span>
                    <strong>฿<AnimatedCounter value={simData.totalUplift} /></strong>
                  </div>
                  <p className="scenario-desc">Vendor and branch share the discount burden, salvaging capital.</p>
                </div>
              </div>

              {status === 'pending' && (
                <div className="vendor-actions">
                  <button className="secondary btn-reject" onClick={() => handleAction(vendor.id, 'rejected')}>
                    <XCircle size={18} /> Reject
                  </button>
                  <button className="primary btn-approve" onClick={() => handleAction(vendor.id, 'approved')}>
                    <CheckCircle2 size={18} /> Approve Mutual Clearance
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="action-bar animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <button className="secondary" onClick={onBack}>Back to Optimization</button>
        <button 
          className="primary" 
          onClick={onNext}
          disabled={!allApproved}
        >
          {allApproved ? (
            <>
              <span>Execute Campaigns</span>
              <PlayCircle size={18} />
            </>
          ) : (
            <span>Waiting for Vendor Approvals...</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default VendorSimulation;
