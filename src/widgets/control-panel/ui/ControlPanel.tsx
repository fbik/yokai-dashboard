'use client';

import { useState } from 'react';
import { useSpirits } from '@/entities/spirit/api/useSpirits';
import styles from './ControlPanel.module.scss';

export function ControlPanel() {
  const { refetch, isRefetching } = useSpirits();
  const [scanning, setScanning] = useState(false);

  const handleFullScan = () => {
    setScanning(true);
    refetch();
    setTimeout(() => setScanning(false), 2000);
  };

  const handleEmergencyProtocol = () => {
    if (window.confirm('Активировать протокол полной зачистки? Все отряды будут мобилизованы.')) {
      alert('🚨 Протокол активирован! Все отряды в состоянии повышенной готовности.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>🎛️ Панель управления</h3>
        <div className={styles.status}>
          <span className={styles.statusDot} />
          Система онлайн
        </div>
      </div>

      <div className={styles.controls}>
        <button 
          onClick={handleFullScan}
          disabled={isRefetching || scanning}
          className={styles.controlButton}
        >
          {scanning ? (
            <>
              <span className={styles.spinnerSmall} />
              Сканирование...
            </>
          ) : (
            '🔍 Полное сканирование'
          )}
        </button>

        <button className={styles.controlButton}>
          📡 Запросить данные сенсоров
        </button>

        <button className={styles.controlButton}>
          🎯 Автораспределение отрядов
        </button>

        <button 
          onClick={handleEmergencyProtocol}
          className={styles.emergencyButton}
        >
          🚨 Экстренный протокол
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Обновлено</div>
          <div className={styles.statValue}>{new Date().toLocaleTimeString()}</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Сенсоры</div>
          <div className={styles.statValue}>24/24</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statLabel}>Отряды</div>
          <div className={styles.statValue}>5</div>
        </div>
      </div>
    </div>
  );
}
