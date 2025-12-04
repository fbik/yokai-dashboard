#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🦊 Starting Yokai Dashboard...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check mode
MODE=${1:-"prod"}

case $MODE in
    "dev"|"development")
        echo -e "${YELLOW}🚀 Starting in DEVELOPMENT mode...${NC}"
        if command -v docker-compose &> /dev/null; then
            docker-compose up yokai-dev
        else
            docker compose up yokai-dev
        fi
        ;;
    "prod"|"production")
        echo -e "${YELLOW}🚀 Starting in PRODUCTION mode...${NC}"
        if command -v docker-compose &> /dev/null; then
            docker-compose up yokai-dashboard
        else
            docker compose up yokai-dashboard
        fi
        ;;
    "build")
        echo -e "${YELLOW}🔨 Building Docker image...${NC}"
        docker build -t yokai-dashboard .
        ;;
    "stop")
        echo -e "${YELLOW}🛑 Stopping containers...${NC}"
        if command -v docker-compose &> /dev/null; then
            docker-compose down
        else
            docker compose down
        fi
        ;;
    "clean")
        echo -e "${YELLOW}🧹 Cleaning Docker resources...${NC}"
        if command -v docker-compose &> /dev/null; then
            docker-compose down -v
        else
            docker compose down -v
        fi
        docker system prune -f
        ;;
    "logs")
        echo -e "${YELLOW}📋 Showing logs...${NC}"
        if command -v docker-compose &> /dev/null; then
            docker-compose logs -f yokai-dashboard
        else
            docker compose logs -f yokai-dashboard
        fi
        ;;
    *)
        echo -e "${RED}❌ Unknown command: $MODE${NC}"
        echo "Usage: ./docker-run.sh [dev|prod|build|stop|clean|logs]"
        echo "  dev    - Start development server"
        echo "  prod   - Start production server (default)"
        echo "  build  - Build Docker image"
        echo "  stop   - Stop containers"
        echo "  clean  - Clean Docker resources"
        echo "  logs   - Show logs"
        exit 1
        ;;
esac
