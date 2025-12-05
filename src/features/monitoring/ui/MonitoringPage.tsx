'use client';

import { useSpirits } from '@/entities/spirit/api/useSpirits';
import { SpiritList } from '@/widgets/spirit-list/ui/SpiritList';
import { TokyoMap } from '@/widgets/tokyo-map/ui/TokyoMap';
import { ControlPanel } from '@/widgets/control-panel/ui/ControlPanel';
import styles from './MonitoringPage.module.scss';

export function MonitoringPage() {
  const { data: spirits = [], isLoading, error } = useSpirits();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Сканирование энергий ёкаев...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <h2>⚠️ Ошибка подключения к системе мониторинга</h2>
        <p>Проверьте соединение с сервером</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>🎭 Система мониторинга ёкаев</h1>
        <p className={styles.subtitle}>Реальное время • Токио и окрестности</p>
      </header>

      <div className={styles.main}>
        <div className={styles.mapSection}>
          <TokyoMap spirits={spirits} />
        </div>
        
        <div className={styles.sidebar}>
          <ControlPanel />
          <SpiritList spirits={spirits} />
        </div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.status}>
          🔄 Активных аномалий: {spirits.filter(s => s.status === 'active').length}
        </span>
        <span className={styles.timestamp}>
          Последнее обновление: {new Date().toLocaleTimeString()}
        </span>
      </footer>
    </div>
  );
}
