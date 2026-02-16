# ---------- Build stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# Install deps (cache layer)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---------- Run stage ----------
FROM nginx:1.27-alpine AS run

# Copy build output from Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: custom nginx config (for SPA routing)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
