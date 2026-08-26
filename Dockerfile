# syntax=docker/dockerfile:1

# Common build stage
FROM node:22-alpine AS common-build-stage

WORKDIR /app

# Copy manifests first so dependency installs stay cached across source changes
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

# Development build stage
FROM common-build-stage AS development-build-stage

ENV NODE_ENV=development

CMD ["npm", "run", "dev"]

# Production build stage - compile, then ship only runtime dependencies
FROM common-build-stage AS production-build-stage

ENV NODE_ENV=production

RUN npm run build && npm prune --omit=dev

USER node

CMD ["node", "dist/server.js"]
