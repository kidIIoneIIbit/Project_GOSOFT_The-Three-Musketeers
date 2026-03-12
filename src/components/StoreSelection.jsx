import { Users, MapPin, Store as StoreIcon, Crosshair } from 'lucide-react';
import { STORES } from '../data/sampleData';
import ThailandGlobe from './common/ThailandGlobe';
import '../styles/StoreSelection.css';

const StoreSelection = ({ onSelect }) => {
  return (
    <div className="store-selection-container">
      {/* Absolute Background Globe */}
      <div className="globe-background-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <ThailandGlobe width={800} height={800} />
        <div className="globe-overlay-gradient"></div>
      </div>

      <div className="instructions animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2>Initialize Connection</h2>
        <p>Select a node on the grid to begin AI clearance orchestration.</p>
      </div>

      <div className="store-grid relative-z-index">
        {STORES.map((store, index) => (
          <div 
            key={store.id} 
            className="store-card glass-panel cyber-border animate-fade-in" 
            style={{ animationDelay: `${0.3 + (index * 0.1)}s` }}
            onClick={() => onSelect(store)}
          >
            <div className="store-info">
              <div className="card-header">
                <Crosshair size={18} className="text-primary" />
                <h3>{store.name}</h3>
              </div>
              
              <div className="store-meta">
                <div className="meta-item">
                  <MapPin size={14} className="text-dim" />
                  <span>{store.location}</span>
                </div>
                <div className="meta-item">
                  <StoreIcon size={14} className="text-dim" />
                  <span>{store.type}</span>
                </div>
              </div>

              <div className="store-stats">
                <div className="stat">
                  <span className="stat-label">Network Traffic</span>
                  <div className="traffic-indicator">
                    <Users size={14} className={
                      store.traffic === 'Very High' ? 'text-danger' : 
                      store.traffic === 'High' ? 'text-warning' : 'text-success'
                    } />
                    <span className="stat-value number-font">{store.traffic}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cyberpunk corner accents */}
            <div className="cyber-corner top-left"></div>
            <div className="cyber-corner bottom-right"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreSelection;
