# ==========================================
# Base Stage: Install dependencies
# ==========================================
FROM node:20-alpine AS base

WORKDIR /app

# Install libc6-compat for native package compatibility on Alpine
RUN apk add --no-cache libc6-compat

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# ==========================================
# Development Stage: Expo Dev Server / Metro
# ==========================================
FROM base AS development

WORKDIR /app

# Install android-tools (adb) for Android emulator interaction
RUN apk add --no-cache android-tools

# Copy application source code
COPY . .

# Expose standard Expo & Metro bundler ports:
EXPOSE 8081 19000 19001 19002

ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0

# Start Expo development server (LAN / Web support)
CMD ["npx", "expo", "start", "--host", "lan"]

# ==========================================
# Builder Stage: Export static Web bundle
# ==========================================
FROM base AS builder

WORKDIR /app

# Copy application source code
COPY . .

ENV NODE_ENV=production

# Export static web build into /app/dist
RUN npx expo export --platform web

# ==========================================
# Production Web Stage: Nginx SPA server
# ==========================================
FROM nginx:alpine AS production-web

# Copy custom Nginx configuration for SPA routing & caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy exported static files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
