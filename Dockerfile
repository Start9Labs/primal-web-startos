FROM node:20-bookworm-slim AS builder

WORKDIR /build
COPY primal-web-app/ ./
RUN npm ci --no-audit --no-fund
RUN npm run build
# Upstream's vite config emits sourcemaps and a Vite build manifest; neither is
# needed to serve the app and together they're ~18 MB. Drop them from dist/.
RUN find dist -name '*.map' -delete && rm -f dist/manifest.json

FROM nginx:1.27-alpine

COPY --from=builder /build/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
