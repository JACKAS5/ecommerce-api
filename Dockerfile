# Stage 1: Build stage
FROM node:22-alpine3.21 AS builder

WORKDIR /usr/src/app

# Upgrade Alpine packages
RUN apk update && apk upgrade --no-cache

# Copy package.json & package-lock.json
COPY package*.json ./

# Install ALL dependencies (dev + prod) for build stage
RUN npm ci

# Copy source code
COPY . .

# Remove dev dependencies to keep image light
RUN npm prune --production

# Stage 2: Production stage
FROM node:22-bullseye-slim

WORKDIR /usr/src/app

# Upgrade OS packages
RUN apt-get update && apt-get upgrade -y && rm -rf /var/lib/apt/lists/*

# Copy built app from builder
COPY --from=builder /usr/src/app ./

# Add non-root user
RUN useradd -ms /bin/bash appuser
USER appuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s CMD curl -f http://localhost:5000/api/v1/health || exit 1

CMD ["node", "src/server.js"]