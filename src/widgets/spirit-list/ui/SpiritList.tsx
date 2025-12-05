'use client';

import { Spirit } from '@/entities/spirit/model/types';
import { SpiritCard } from '@/entities/spirit/ui/SpiritCard';
import styles from './SpiritList.module.scss';

interface SpiritListProps {
  spirits: Spirit[];
}

export function SpiritList({ spirits }: SpiritListProps) {
  const activeSpirits = spirits.filter(s => s.status === 'active');
  const containedSpirits = spirits.filter(s => s.status === 'contained');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>🎯 Активные аномалии ({activeSpirits.length})</h3>
      </div>
      
      <div className={styles.list}>
        {activeSpirits.map(spirit => (
          <SpiritCard key={spirit.id} spirit={spirit} />
        ))}
        
        {activeSpirits.length === 0 && (
          <div className={styles.empty}>
            <p>Нет активных аномалий</p>
            <small>Все ёкаи содержатся</small>
          </div>
        )}
      </div>

      {containedSpirits.length > 0 && (
        <div className={styles.containedSection}>
          <h4>✅ Обезврежено ({containedSpirits.length})</h4>
          <div className={styles.containedList}>
            {containedSpirits.slice(0, 3).map(spirit => (
              <div key={spirit.id} className={styles.containedItem}>
                {spirit.name} - {spirit.location}
              </div>
            ))}
            {containedSpirits.length > 3 && (
              <div className={styles.more}>
                +{containedSpirits.length - 3} ещё
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
