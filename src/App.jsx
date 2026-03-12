import { useState } from 'react'
import { LayoutDashboard, Store, PackageSearch, Activity, CheckCircle, BrainCircuit } from 'lucide-react'
import StoreSelection from './components/StoreSelection'
import SKURiskDashboard from './components/SKURiskDashboard'
import OptimizationResults from './components/OptimizationResults'
import VendorSimulation from './components/VendorSimulation'
import ExecutionSummary from './components/ExecutionSummary'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStore, setSelectedStore] = useState(null);

  const steps = [
    { id: 1, name: 'Store Selection', icon: Store },
    { id: 2, name: 'SKU Risk', icon: PackageSearch },
    { id: 3, name: 'AI Optimization', icon: BrainCircuit },
    { id: 4, name: 'Vendor Approval', icon: Activity },
    { id: 5, name: 'Execution', icon: CheckCircle }
  ];

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const handleStoreSelect = (store) => {
    setSelectedStore(store);
    handleNext();
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar glass-panel">
        <div className="logo-container">
          <div className="logo-icon">V</div>
          <h2>V-SCOPS</h2>
          <span className="version">v2.0</span>
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
                onClick={() => currentStep > step.id && setCurrentStep(step.id)} // Allow going back
              >
                <div className="step-icon-wrapper">
                  <Icon size={20} />
                </div>
                <span className="step-name">{step.name}</span>
                {isCompleted && <div className="step-connector"></div>}
              </div>
            );
          })}
        </nav>
        
        <div className="sidebar-footer">
          <p>Hackathon Demo</p>
          <p>Team Antigravity</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-header">
          <div>
            <h1>{steps.find(s => s.id === currentStep)?.name}</h1>
            <p className="subtitle">Vendor-Aware Smart Clearance & Profit Orchestration</p>
          </div>
          {selectedStore && (
            <div className="current-store-badge">
              <Store size={16} />
              <span>{selectedStore.name}</span>
            </div>
          )}
        </header>

        <div className="content-area animate-fade-in" key={currentStep}>
          {currentStep === 1 && <StoreSelection onSelect={handleStoreSelect} />}
          {currentStep === 2 && <SKURiskDashboard store={selectedStore} onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && <OptimizationResults store={selectedStore} onNext={handleNext} onBack={handleBack} />}
          {currentStep === 4 && <VendorSimulation store={selectedStore} onNext={handleNext} onBack={handleBack} />}
          {currentStep === 5 && <ExecutionSummary store={selectedStore} onStartOver={() => setCurrentStep(1)} />}
        </div>
      </main>
    </div>
  )
}

export default App
