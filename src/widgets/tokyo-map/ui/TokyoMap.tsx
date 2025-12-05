'use client';

import { Spirit } from '@/entities/spirit/model/types';
import styles from './TokyoMap.module.scss';

interface TokyoMapProps {
  spirits: Spirit[];
}

export function TokyoMap({ spirits }: TokyoMapProps) {
  const activeSpirits = spirits.filter(s => s.status === 'active');
  
  return (
    <div className={styles.container}>
      <div className={styles.map}>
        <div className={styles.title}>
          🗺️ Карта Токио
          <span className={styles.badge}>
            {activeSpirits.length} актив. аномалий
          </span>
        </div>
        
        <div className={styles.mapContent}>
          {/* Здесь будет настоящая карта */}
          <div className={styles.placeholder}>
            <div className={styles.grid}>
              {['Shibuya', 'Shinjuku', 'Akihabara', 'Roppongi', 'Ginza', 'Ueno'].map(area => (
                <div key={area} className={styles.area}>
                  <div className={styles.areaName}>{area}</div>
                  {spirits
                    .filter(s => s.location === area && s.status === 'active')
                    .map(spirit => (
                      <div 
                        key={spirit.id} 
                        className={styles.spiritMarker}
                        style={{
                          backgroundColor: 
                            spirit.threatLevel === 'critical' ? '#dc2626' :
                            spirit.threatLevel === 'high' ? '#ef4444' :
                            spirit.threatLevel === 'medium' ? '#f59e0b' : '#10b981'
                        }}
                        title={`${spirit.name} (${spirit.threatLevel})`}
                      >
                        {spirit.threatLevel === 'critical' ? '⚡' : 
                         spirit.threatLevel === 'high' ? '🔥' : 
                         spirit.threatLevel === 'medium' ? '⚠️' : '🌀'}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
