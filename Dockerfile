FROM node:20-bookworm-slim AS builder

WORKDIR /build
COPY primal-web-app/ ./
RUN npm ci --no-audit --no-fund
RUN npm run build

FROM nginx:1.27-alpine

COPY --from=builder /build/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
