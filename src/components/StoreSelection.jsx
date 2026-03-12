import { Users, MapPin, Store as StoreIcon } from 'lucide-react';
import { STORES } from '../data/sampleData';
import '../styles/StoreSelection.css';

const StoreSelection = ({ onSelect }) => {
  return (
    <div className="store-selection-container">
      <div className="instructions animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <h2>Select a Location to Analyze Risk</h2>
        <p>V-SCOPS AI will analyze real-time POS, inventory, and vendor data for the selected store.</p>
      </div>

      <div className="store-grid">
        {STORES.map((store, index) => (
          <div 
            key={store.id} 
            className="store-card glass-panel animate-fade-in" 
            style={{ animationDelay: `${0.15 + (index * 0.1)}s` }}
            onClick={() => onSelect(store)}
          >
            <div className="store-image" style={{ backgroundImage: `url(${store.image})` }}>
              <div className="store-overlay">
                <span className="ai-badge">AI Live Feed</span>
              </div>
            </div>
            
            <div className="store-info">
              <h3>{store.name}</h3>
              
              <div className="store-meta">
                <div className="meta-item">
                  <MapPin size={14} />
                  <span>{store.location}</span>
                </div>
                <div className="meta-item">
                  <StoreIcon size={14} />
                  <span>{store.type}</span>
                </div>
              </div>

              <div className="store-stats">
                <div className="stat">
                  <span className="stat-label">Traffic Prediction</span>
                  <div className="traffic-indicator">
                    <Users size={14} className={
                      store.traffic === 'Very High' ? 'text-danger' : 
                      store.traffic === 'High' ? 'text-warning' : 'text-success'
                    } />
                    <span className="stat-value">{store.traffic}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreSelection;
