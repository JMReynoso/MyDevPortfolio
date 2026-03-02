# --- Build stage ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build   # Vite production build -> /app/dist

# Debug: Show what files were created
RUN ls -la

# --- Runtime stage ---
FROM node:22-alpine
WORKDIR /app

RUN npm install -g serve

# Copy from the correct build directory
COPY --from=build /app/build ./build

EXPOSE 5173
CMD ["serve", "-s", "build", "-l", "5173"]
