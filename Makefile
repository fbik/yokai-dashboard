.PHONY: help build run dev down clean logs test

help:
	@echo "Available commands:"
	@echo "  make build      - Build production image"
	@echo "  make run        - Run production container"
	@echo "  make dev        - Start development with Docker"
	@echo "  make prod       - Start production with Docker Compose"
	@echo "  make down       - Stop containers"
	@echo "  make clean      - Clean Docker resources"
	@echo "  make logs       - View logs"
	@echo "  make test       - Run tests"

build:
	docker build -t yokai-dashboard .

run:
	docker run -p 3000:3000 yokai-dashboard

dev:
	docker-compose up yokai-dev

prod:
	docker-compose up yokai-dashboard

down:
	docker-compose down

clean:
	docker-compose down -v
	docker system prune -f

logs:
	docker-compose logs -f yokai-dashboard

test:
	docker-compose exec yokai-dev npm test
