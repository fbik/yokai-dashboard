#!/bin/bash

echo "🐳 Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed"
    exit 1
fi

echo "✅ Docker is installed"
docker --version

echo ""
echo "🔍 Checking Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    echo "⚠️  Docker Compose is not installed, using docker compose plugin..."
    if ! docker compose version &> /dev/null; then
        echo "❌ Docker Compose plugin is not available"
        exit 1
    fi
    echo "✅ Docker Compose plugin is available"
    COMPOSE_CMD="docker compose"
else
    echo "✅ Docker Compose is installed"
    COMPOSE_CMD="docker-compose"
fi

echo ""
echo "🚀 Testing Docker setup..."
$COMPOSE_CMD --version

echo ""
echo "📦 Building and running Yokai Dashboard..."
echo "To start the application:"
echo "  $COMPOSE_CMD up yokai-dashboard"
echo ""
echo "For development:"
echo "  $COMPOSE_CMD up yokai-dev"
