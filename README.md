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

## 🐳 Docker Status (Verified Working)

✅ **Docker development environment is fully operational:**

\`\`\`bash
# Start Docker development container
docker-compose up yokai-dev

# Or in background
docker-compose up -d yokai-dev

# Manage container
./docker-manage.sh start    # Start
./docker-manage.sh stop     # Stop  
./docker-manage.sh logs     # View logs
./docker-manage.sh status   # Check status
\`\`\`

**Verified endpoints in Docker:**
- ✅ \`GET /api/health\` - System health check
- ✅ \`GET /api/spirits\` - List of spirits (10 sample spirits)
- ✅ \`GET /\` - Home page
- ✅ \`GET /monitoring\` - Monitoring interface with FSD widgets

**Docker configuration fixed:**
- Replaced \`npm ci\` with \`npm install\` in \`Dockerfile.dev\`
- All FSD layers work correctly in container
- Hot reload enabled for development

## 🏗️ Current Project Status

### ✅ **Phase 1: FSD Architecture - COMPLETE**
- Full Feature Sliced Design implementation
- All layers: entities, features, widgets, shared
- TypeScript configuration with path aliases
- SCSS Modules integrated
- React Query provider setup

### ✅ **Docker Deployment - COMPLETE**  
- Development container working on port 3000
- Production build configuration ready
- Container management scripts created

### 🔄 **Phase 2: Zod Validation - READY TO START**
- Install Zod: \`npm install zod\`
- Create validation schemas for entities
- Add type-safe API requests/responses

## 🚀 Quick Start Commands

\`\`\`bash
# Local development
npm run dev            # Start Next.js dev server
npm run build         # Build for production
npm start            # Run production build

# Docker development  
docker-compose up yokai-dev    # Start dev container
./docker-manage.sh status      # Check container status

# Validation and checks
npx tsc --noEmit      # TypeScript type checking
./check-fsd-rules.sh  # Validate FSD architecture
\`\`\`

## 📊 Version History

- **v0.1.0** - Initial project setup with basic features
- **v0.2.0** - Full FSD architecture implementation
- **v0.2.1** - Docker build fixes and stable deployment

## 🔗 Useful Links

- **Local:** http://localhost:3000
- **Docker:** http://localhost:3000 (when container running)
- **GitHub:** https://github.com/fbik/yokai-dashboard
- **API Docs:** See API endpoints section
