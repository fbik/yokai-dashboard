'use client';

import { Spirit } from '../../model/types';
import { THREAT_LEVELS } from '../../model/constants';
import styles from './SpiritCard.module.css';

interface SpiritCardProps {
  spirit: Spirit;
  onCapture?: (spiritId: string) => void;
  isCapturing?: boolean;
}

const SpiritCard: React.FC<SpiritCardProps> = ({
  spirit,
  onCapture,
  isCapturing = false,
}) => {
  const threatConfig = THREAT_LEVELS[spirit.threatLevel];
  
  const handleCapture = () => {
    if (onCapture && spirit.status === 'active') {
      onCapture(spirit.id);
    }
  };
  
  const statusClass = spirit.status === 'active' ? styles.active : styles.captured;
  const statusText = spirit.status === 'active' ? 'Active' : 'Captured';
  
  return (
    <div className={styles.card} data-status={spirit.status}>
      <div className={styles.header}>
        <h3 className={styles.name}>{spirit.name}</h3>
        <span 
          className={styles.threatBadge}
          style={{ backgroundColor: threatConfig.color }}
          title={threatConfig.description}
        >
          {threatConfig.label}
        </span>
      </div>
      
      <div className={styles.content}>
        <div className={styles.field}>
          <span className={styles.label}>Location:</span>
          <span className={styles.value}>{spirit.location}</span>
        </div>
        
        <div className={styles.field}>
          <span className={styles.label}>Status:</span>
          <span className={`${styles.value} ${statusClass}`}>
            {statusText}
          </span>
        </div>
        
        <div className={styles.updated}>
          Updated: {new Date(spirit.lastUpdated).toLocaleTimeString()}
        </div>
      </div>
      
      {spirit.status === 'active' && onCapture && (
        <button
          className={styles.captureButton}
          onClick={handleCapture}
          disabled={isCapturing}
          aria-label={`Capture ${spirit.name}`}
        >
          {isCapturing ? 'Capturing...' : 'Capture'}
        </button>
      )}
    </div>
  );
};

export default SpiritCard;
