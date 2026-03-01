FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Expose whatever port your server listens on
EXPOSE 3000

# Run your app in the foreground
CMD ["npm", "run", "start"]
