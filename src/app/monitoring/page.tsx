'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import styles from './page.module.css';

// Типы
interface Spirit {
  id: string;
  name: string;
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  status: 'active' | 'captured';
  lastUpdated: string;
}

// Компонент SpiritCard
const SpiritCard = ({ spirit, onCapture, isCapturing = false }: { 
  spirit: Spirit; 
  onCapture?: (id: string) => void; 
  isCapturing?: boolean; 
}) => {
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
  
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <div className={styles.spiritCard} data-status={spirit.status}>
      <div className={styles.cardHeader}>
        <h3 className={styles.spiritName}>{spirit.name}</h3>
        <div 
          className={styles.threatBadge}
          style={{ 
            backgroundColor: `${config.color}20`,
            color: config.color,
            border: `2px solid ${config.color}`
          }}
        >
          {config.label}
        </div>
      </div>
      
      <p className={styles.location}>📍 {spirit.location}</p>
      
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Status:</span>
          <span className={styles.infoValue}>
            {spirit.status === 'active' ? '🟢 Active' : '✅ Captured'}
          </span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Threat:</span>
          <span className={styles.infoValue}>{config.description}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Updated:</span>
          <span className={styles.infoValue}>{formatTime(spirit.lastUpdated)}</span>
        </div>
      </div>
      
      {spirit.status === 'active' ? (
        <button
          className={styles.captureButton}
          onClick={handleCapture}
          disabled={isCapturing}
        >
          {isCapturing ? 'Capturing...' : '🎯 Capture Spirit'}
        </button>
      ) : (
        <div className={styles.capturedLabel}>
          ✅ Spirit Captured
        </div>
      )}
    </div>
  );
};

// Функции API
const fetchSpirits = async (): Promise<Spirit[]> => {
  const response = await fetch('/api/spirits');
  if (!response.ok) throw new Error('Failed to fetch spirits');
  return response.json();
};

const captureSpirit = async (spiritId: string) => {
  const response = await fetch('/api/spirits/capture', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ spiritId }),
  });
  
  if (!response.ok) throw new Error('Capture failed');
  return response.json();
};

// Основной компонент страницы
export default function MonitoringPage() {
  const queryClient = useQueryClient();
  
  // Запрос духов
  const { data: spirits = [], isLoading, error } = useQuery({
    queryKey: ['spirits'],
    queryFn: fetchSpirits,
    refetchInterval: 10000,
  });
  
  // Мутация захвата
  const captureMutation = useMutation({
    mutationFn: captureSpirit,
    onMutate: async (spiritId) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['spirits'] });
      
      const previousSpirits = queryClient.getQueryData<Spirit[]>(['spirits']) || [];
      
      queryClient.setQueryData<Spirit[]>(['spirits'], (old) =>
        (old || []).map(spirit =>
          spirit.id === spiritId
            ? { ...spirit, status: 'captured' }
            : spirit
        )
      );
      
      return { previousSpirits };
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || 'Spirit captured!');
      } else {
        toast.error(data.message || 'Capture failed');
        queryClient.invalidateQueries({ queryKey: ['spirits'] });
      }
    },
    onError: (error, spiritId, context) => {
      toast.error('Failed to capture spirit');
      if (context?.previousSpirits) {
        queryClient.setQueryData(['spirits'], context.previousSpirits);
      }
    },
  });
  
  // SSE подключение
  useEffect(() => {
    const eventSource = new EventSource('/api/sse');
    
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'threatUpdate') {
          queryClient.setQueryData<Spirit[]>(['spirits'], (old) =>
            (old || []).map(spirit =>
              spirit.id === data.spiritId
                ? { 
                    ...spirit, 
                    threatLevel: data.newThreatLevel, 
                    lastUpdated: new Date().toISOString() 
                  }
                : spirit
            )
          );
          
          toast(`Threat level updated: ${data.spiritId}`, {
            icon: '⚠️',
          });
        }
      } catch (error) {
        console.error('SSE error:', error);
      }
    };
    
    return () => {
      eventSource.close();
    };
  }, [queryClient]);
  
  // Обработчик захвата
  const handleCapture = (spiritId: string) => {
    captureMutation.mutate(spiritId);
  };
  
  // Статистика
  const activeSpirits = spirits.filter(s => s.status === 'active').length;
  const criticalThreats = spirits.filter(s => s.threatLevel === 'critical').length;
  const capturedSpirits = spirits.filter(s => s.status === 'captured').length;
  
  if (isLoading) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Yokai Dashboard</h1>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <p>Loading spiritual data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Yokai Dashboard</h1>
        <div style={{ 
          background: 'rgba(255, 0, 0, 0.1)', 
          color: 'white', 
          padding: '1rem',
          borderRadius: '10px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <p>Error: {(error as Error).message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Yokai Dashboard</h1>
      <p style={{ 
        textAlign: 'center', 
        color: 'white', 
        marginBottom: '2rem',
        fontSize: '1.2rem'
      }}>
        Real-time monitoring of spiritual anomalies in Tokyo
      </p>
      
      {/* Статистика */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        marginBottom: '3rem',
        flexWrap: 'wrap'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '1rem 2rem',
          borderRadius: '10px',
          textAlign: 'center',
          minWidth: '150px'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
            {activeSpirits}
          </div>
          <div style={{ color: '#666' }}>Active Spirits</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '1rem 2rem',
          borderRadius: '10px',
          textAlign: 'center',
          minWidth: '150px'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#EF4444' }}>
            {criticalThreats}
          </div>
          <div style={{ color: '#666' }}>Critical Threats</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '1rem 2rem',
          borderRadius: '10px',
          textAlign: 'center',
          minWidth: '150px'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10B981' }}>
            {capturedSpirits}
          </div>
          <div style={{ color: '#666' }}>Captured</div>
        </div>
      </div>
      
      {/* Сетка духов */}
      <div className={styles.spiritGrid}>
        {spirits.map((spirit) => (
          <SpiritCard
            key={spirit.id}
            spirit={spirit}
            onCapture={handleCapture}
            isCapturing={captureMutation.isPending}
          />
        ))}
      </div>
      
      {spirits.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          color: 'white', 
          marginTop: '3rem',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '10px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <p style={{ fontSize: '1.5rem' }}>No spiritual activity detected</p>
          <p>All spirits are currently at peace</p>
        </div>
      )}
    </div>
  );
}
