# 🎭 Yokai Dashboard

Spirit and anomaly monitoring system built with Next.js and Feature Sliced Design (FSD).

## 🏗️ Architecture: Feature Sliced Design (FSD)

The project follows strict Feature Sliced Design principles:

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── entities/              # Business entities
│   └── spirit/           # Spirit entity
│       ├── model/        # Types, schemas
│       ├── api/          # API calls, React Query hooks
│       └── ui/           # UI components
├── features/              # User stories
│   └── monitoring/       # Monitoring feature
│       ├── model/        # Feature-specific types
│       ├── lib/          # Business logic
│       ├── api/          # Feature API
│       └── ui/           # Feature UI
├── widgets/               # Reusable UI blocks
│   ├── spirit-list/      # Spirit list widget
│   ├── tokyo-map/        # Tokyo map widget
│   └── control-panel/    # Control panel widget
└── shared/               # Shared resources
    ├── ui/               # UI components (Button, Card, etc.)
    ├── lib/              # Utilities, providers
    └── api/              # API configuration
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production version
npm start
```

## 🐳 Docker Support

```bash
# Development with hot reload
docker-compose up dev

# Production build
docker-compose up prod
```

## 🌐 Available URLs

- **Local:** http://localhost:3000
- **Homepage:** `/`
- **Monitoring:** `/monitoring`
- **API Health:** `/api/health`
- **API Spirits:** `/api/spirits`

## 🛠️ Technology Stack

- **Next.js 16** with App Router & Turbopack
- **React 19** with TypeScript
- **Feature Sliced Design** architecture
- **TanStack Query (React Query)** for state management
- **SCSS Modules** for styling
- **Zod** for validation (upcoming)
- **Axios** for HTTP requests
- **Docker** for containerization

## 📁 Key Features Implemented

### ✅ Phase 1: FSD Restructuring (Complete)
- Full FSD architecture implementation
- Entity layer with Spirit domain
- Feature layer with Monitoring
- Widgets layer with reusable components
- Shared layer with utilities

### 🔄 Phase 2: Zod Validation (In Progress)
- Data validation schemas
- Type-safe API requests

### 📋 Phase 3: Real-time Features (Planned)
- WebSocket/SSE for live updates
- Interactive Tokyo map
- Notification system

## 🔧 Development

### Code Style
- Follow FSD import rules (lower layers can't import from higher layers)
- Use SCSS Modules for styling
- Write TypeScript with strict mode
- Use React Query for server state

### Adding New Features
1. Add entity in `src/entities/` if needed
2. Create feature in `src/features/`
3. Build widgets in `src/widgets/`
4. Add shared components in `src/shared/`

## 📄 License

MIT
