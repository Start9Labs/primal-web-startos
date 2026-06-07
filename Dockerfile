FROM node:20-bookworm-slim AS builder

WORKDIR /build
COPY primal-web-app/ ./

# Don't load Stripe.js (js.stripe.com) in this self-hosted build. Primal's
# Premium card-payment flow is hosted infrastructure that isn't meaningful here,
# and the default @stripe/stripe-js entry injects the js.stripe.com loader as an
# import side effect (before loadStripe() is even called). Mirrors upstream PR
# https://github.com/PrimalHQ/primal-web-app/pull/196: switch the Premium page to
# the side-effect-free @stripe/stripe-js/pure entry and gate loadStripe() behind
# the PRIMAL_ENABLE_STRIPE flag.
# Applied with sed because the slim builder image ships neither git nor patch;
# the grep guard fails the build loudly if upstream moves these lines.
# REMOVE this block once the submodule advances past the merged upstream commit
# — at that point the PRIMAL_ENABLE_STRIPE=false line below does the job alone.
RUN sed -i "s#from '@stripe/stripe-js'#from '@stripe/stripe-js/pure'#g" \
        src/pages/Premium/Premium.tsx src/pages/Premium/PremiumStripeModal.tsx \
 && sed -i "s#const initStripe = async () => {#&\n    if (import.meta.env.PRIMAL_ENABLE_STRIPE === 'false') return;#" \
        src/pages/Premium/Premium.tsx \
 && grep -q "@stripe/stripe-js/pure" src/pages/Premium/Premium.tsx \
 && grep -q "PRIMAL_ENABLE_STRIPE" src/pages/Premium/Premium.tsx \
 || { echo "ERROR: Stripe-disable patch did not apply (upstream Premium.tsx changed?)"; exit 1; }
# Vite loads .env in every build mode; this is the flag the gate above reads.
RUN printf '\nPRIMAL_ENABLE_STRIPE=false\n' >> .env

RUN npm ci --no-audit --no-fund
RUN npm run build
# Upstream's vite config emits sourcemaps and a Vite build manifest; neither is
# needed to serve the app and together they're ~18 MB. Drop them from dist/.
RUN find dist -name '*.map' -delete && rm -f dist/manifest.json

FROM nginx:1.27-alpine

COPY --from=builder /build/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
