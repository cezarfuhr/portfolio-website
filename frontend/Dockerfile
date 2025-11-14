FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with cache mount (shared across all projects!)
RUN --mount=type=cache,target=/root/.npm \
    npm install

# Copy source code
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
