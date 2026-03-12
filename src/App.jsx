import { useState, useEffect } from 'react';
import { LayoutDashboard, Store, PackageSearch, Activity, CheckCircle, BrainCircuit, Menu, X } from 'lucide-react';
import StoreSelection from './components/StoreSelection';
import SKURiskDashboard from './components/SKURiskDashboard';
import OptimizationResults from './components/OptimizationResults';
import VendorSimulation from './components/VendorSimulation';
import ExecutionSummary from './components/ExecutionSummary';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const steps = [
    { id: 1, name: 'Store Selection', icon: Store },
    { id: 2, name: 'SKU Risk', icon: PackageSearch },
    { id: 3, name: 'AI Optimization', icon: BrainCircuit },
    { id: 4, name: 'Vendor Approval', icon: Activity },
    { id: 5, name: 'Execution', icon: CheckCircle }
  ];

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isMobileMenuOpen]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    handleNext();
  };

  const handleNavClick = (stepId) => {
    if (currentStep > stepId || (currentStep === stepId && stepId !== 1)) {
      setCurrentStep(stepId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Header (Visible only on small screens) */}
      <header className="mobile-header">
        <div className="logo-container mobile">
          <div className="logo-icon glow-cyan">V</div>
          <h2>V-SCOPS</h2>
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} color="#00E5FF" /> : <Menu size={24} color="#00E5FF" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`sidebar glass-panel ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="logo-container desktop-only">
          <div className="logo-icon glow-cyan">V</div>
          <h2>V-SCOPS<span className="version">v2.0</span></h2>
        </div>

        <nav className="step-nav">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div
                key={step.id}
                className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                onClick={() => handleNavClick(step.id)}
              >
                <div className="step-icon-wrapper">
                  <Icon size={18} />
                </div>
                <span className="step-name">{step.name}</span>
                {isCompleted && <div className="step-connector"></div>}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <p className="neon-text-small">HACKATHON EDITION</p>
          <p>Powered by AI Ecosystem</p>
        </div>
      </aside>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div className="mobile-backdrop" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-text">
            <h1 className="step-title">{steps.find(s => s.id === currentStep)?.name}</h1>
            <p className="subtitle">Vendor-Aware Smart Clearance & Profit Orchestration</p>
          </div>
          {selectedStore && (
            <div className="current-store-badge glow-emerald">
              <Store size={14} className="text-success" />
              <span>{selectedStore.name}</span>
            </div>
          )}
        </header>

        <div className="content-area animate-fade-in" key={currentStep}>
          {currentStep === 1 && <StoreSelection onSelect={handleStoreSelect} />}
          {currentStep === 2 && <SKURiskDashboard store={selectedStore} onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && <OptimizationResults store={selectedStore} onNext={handleNext} onBack={handleBack} />}
          {currentStep === 4 && <VendorSimulation store={selectedStore} onNext={handleNext} onBack={handleBack} />}
          {currentStep === 5 && <ExecutionSummary store={selectedStore} onStartOver={() => { setCurrentStep(1); setSelectedStore(null); }} />}
        </div>
      </main>
    </div>
  )
}

export default App
