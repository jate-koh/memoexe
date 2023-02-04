# INSTALL SYSTEM AND APP DEPENDENCIES
FROM node:18-alpine AS initialiser
RUN apk add --no-cache libc6-compat
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# BUILD SOURCE CODE
FROM node:18-alpine AS installer
WORKDIR /app
COPY . .
COPY --from=initialiser /app/node_modules ./node_modules
RUN yarn build-prod && yarn install --production --ignore-scripts --prefer-offline

# RUN PRODUCTION
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=installer /app/dist ./dist
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/package.json ./package.json
ENV NODE_ENV production

CMD ["yarn", "prod"]