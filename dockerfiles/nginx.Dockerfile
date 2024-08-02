FROM node:lts-alpine AS build-stage
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY package*.json ./
COPY pnpm*.json ./
RUN pnpm install
COPY . .
RUN pnpm run build

# production stage
FROM nginx:stable-alpine AS production-stage
COPY dockerfiles/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]