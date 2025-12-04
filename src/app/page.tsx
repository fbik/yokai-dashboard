import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Yokai Dashboard 🎭</h1>
      <p>Система мониторинга духов и аномалий</p>
      
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link 
          href="/monitoring" 
          style={{
            padding: '1rem 2rem',
            background: '#0070f3',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          📊 Перейти к мониторингу
        </Link>
        
        <Link 
          href="/api/health" 
          style={{
            padding: '1rem 2rem',
            background: '#555',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          🩺 Проверить здоровье системы
        </Link>
      </div>
      
      <div style={{ marginTop: '3rem', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
        <h2>Доступные эндпоинты:</h2>
        <ul>
          <li><code>/api/health</code> - проверка состояния системы</li>
          <li><code>/api/spirits</code> - список духов</li>
          <li><code>/api/spirits/[id]</code> - информация о конкретном духе</li>
          <li><code>/monitoring</code> - интерфейс мониторинга</li>
        </ul>
      </div>
    </div>
  );
}
