FROM node:18-alpine

# Install OpenSSL for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies with cache mount (shared across all projects!)
RUN --mount=type=cache,target=/root/.npm \
    npm install

# Copy source code
COPY . .

# Generate Prisma Client
RUN npm run prisma:generate

EXPOSE 5000

CMD ["npm", "run", "dev"]
