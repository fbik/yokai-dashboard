'use client';

import { Spirit, CapturePriority } from '../model/types';
import { useCaptureSpirit } from '../api/useSpirits';
import styles from './SpiritCard.module.scss';

interface SpiritCardProps {
  spirit: Spirit;
}

export function SpiritCard({ spirit }: SpiritCardProps) {
  const captureMutation = useCaptureSpirit();
  
  const threatColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
    critical: '#dc2626',
  };

  // Функция для конвертации threatLevel в priority (исключаем critical)
  const getPriority = (threatLevel: Spirit['threatLevel']): CapturePriority => {
    switch (threatLevel) {
      case 'critical':
      case 'high':
        return 'high';
      case 'medium':
        return 'medium';
      case 'low':
        return 'low';
      default:
        return 'medium';
    }
  };

  const handleCapture = () => {
    captureMutation.mutate({
      spiritId: spirit.id,
      squadId: `squad-${Math.floor(Math.random() * 5) + 1}`,
      priority: getPriority(spirit.threatLevel),
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h4>{spirit.name}</h4>
          <span 
            className={styles.threatLevel}
            style={{ 
              backgroundColor: threatColors[spirit.threatLevel],
              color: spirit.threatLevel === 'low' ? '#000' : '#fff'
            }}
          >
            {spirit.threatLevel.toUpperCase()}
          </span>
        </div>
        <div className={styles.location}>
          📍 {spirit.location}
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.status}>
          Статус: <span className={styles.statusValue}>{spirit.status}</span>
        </div>
        <div className={styles.timestamp}>
          Обновлено: {new Date(spirit.lastUpdated).toLocaleTimeString()}
        </div>
      </div>

      <button
        onClick={handleCapture}
        disabled={captureMutation.isPending || spirit.status !== 'active'}
        className={styles.captureButton}
      >
        {captureMutation.isPending ? 'Отправка...' : '📡 Отправить отряд'}
      </button>
    </div>
  );
}
