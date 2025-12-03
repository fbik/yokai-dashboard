'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './page.module.css';

// Компонент SpiritCard прямо в файле
const SpiritCard = ({ spirit, onCapture, isCapturing = false }: any) => {
  const threatConfig = {
    low: { label: 'Low', color: '#10B981', description: 'Минимальная угроза' },
    medium: { label: 'Medium', color: '#F59E0B', description: 'Средняя угроза' },
    high: { label: 'High', color: '#EF4444', description: 'Высокая угроза' },
    critical: { label: 'Critical', color: '#7C3AED', description: 'Критическая угроза' },
  };
  
  const threatLevel = spirit.threatLevel;
  const config = threatConfig[threatLevel] || threatConfig.low;
  
  const handleCapture = () => {
    if (onCapture && spirit.status === 'active') {
      onCapture(spirit.id);
    }
  };
  
  const statusClass = spirit.status === 'active' ? 'active' : 'captured';
  const statusText = spirit.status === 'active' ? 'Active' : 'Captured';
  
  return (
    <div className="spirit-card" data-status={spirit.status}>
      <div className="card-header">
        <h3 className="spirit-name">{spirit.name}</h3>
        <span 
          className="threat-badge"
          style={{ backgroundColor: config.color }}
          title={config.description}
        >
          {config.label}
        </span>
      </div>
      
      <div className="card-content">
        <div className="field">
          <span className="label">Location:</span>
          <span className="value">{spirit.location}</span>
        </div>
        
        <div className="field">
          <span className="label">Status:</span>
          <span className={`value ${statusClass}`}>
            {statusText}
          </span>
        </div>
        
        <div className="updated">
          Updated: {new Date(spirit.lastUpdated).toLocaleTimeString()}
        </div>
      </div>
      
      {spirit.status === 'active' && onCapture && (
        <button
          className="capture-button"
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

export default function MonitoringPage() {
  const [spirits, setSpirits] = useState([
    { id: '1', name: 'Kitsune', threatLevel: 'low', location: 'Shibuya', status: 'active', lastUpdated: new Date() },
    { id: '2', name: 'Oni', threatLevel: 'critical', location: 'Shinjuku', status: 'active', lastUpdated: new Date() },
    { id: '3', name: 'Tengu', threatLevel: 'medium', location: 'Ginza', status: 'captured', lastUpdated: new Date() },
    { id: '4', name: 'Kappa', threatLevel: 'high', location: 'Akihabara', status: 'active', lastUpdated: new Date() },
    { id: '5', name: 'Yuki-onna', threatLevel: 'low', location: 'Harajuku', status: 'active', lastUpdated: new Date() },
    { id: '6', name: 'Jorogumo', threatLevel: 'medium', location: 'Roppongi', status: 'active', lastUpdated: new Date() },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [capturingId, setCapturingId] = useState<string | null>(null);
  
  const handleCapture = (spiritId: string) => {
    setCapturingId(spiritId);
    
    // Optimistic update
    setSpirits(prev => prev.map(spirit => 
      spirit.id === spiritId 
        ? { ...spirit, status: 'captured' }
        : spirit
    ));
    
    // Имитация API запроса с 30% ошибкой
    setTimeout(() => {
      if (Math.random() < 0.3) {
        // Rollback при ошибке
        setSpirits(prev => prev.map(spirit => 
          spirit.id === spiritId 
            ? { ...spirit, status: 'active' }
            : spirit
        ));
        toast.error('Failed to capture spirit. Please try again.');
      } else {
        toast.success('Spirit captured successfully!');
      }
      setCapturingId(null);
    }, 500);
  };
  
  // Real-time updates каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setSpirits(prev => {
        if (prev.length === 0) return prev;
        
        const randomIndex = Math.floor(Math.random() * prev.length);
        const threatLevels = ['low', 'medium', 'high', 'critical'];
        const newThreatLevel = threatLevels[Math.floor(Math.random() * threatLevels.length)];
        
        return prev.map((spirit, index) => 
          index === randomIndex
            ? { ...spirit, threatLevel: newThreatLevel, lastUpdated: new Date() }
            : spirit
        );
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading spirit data...</p>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          📡 Yokai Dashboard
        </h1>
        <p className={styles.subtitle}>
          Real-time monitoring of spiritual anomalies in Tokyo
        </p>
      </header>
      
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>
            {spirits.filter(s => s.status === 'active').length}
          </span>
          <span className={styles.statLabel}>Active Spirits</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>
            {spirits.filter(s => s.threatLevel === 'critical').length}
          </span>
          <span className={styles.statLabel}>Critical Threats</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>
            {spirits.filter(s => s.status === 'captured').length}
          </span>
          <span className={styles.statLabel}>Captured</span>
        </div>
      </div>
      
      <div className={styles.spiritsGrid}>
        {spirits.map(spirit => (
          <SpiritCard
            key={spirit.id}
            spirit={spirit}
            onCapture={handleCapture}
            isCapturing={capturingId === spirit.id}
          />
        ))}
      </div>
      
      <footer className={styles.footer}>
        <p className={styles.note}>
          ⚠️ Click "Capture" to send a cleanup squad. 30% chance of failure for simulation.
        </p>
        <p className={styles.note}>
          🔄 Real-time updates: Threat levels change every 5 seconds.
        </p>
      </footer>
    </div>
  );
}
