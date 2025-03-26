# Build stage
FROM node:18-alpine as build
# Install dependencies for Node.js crypto
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /app
# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci
# Copy all project files
COPY . .
# Set environment variables for build
ENV NODE_ENV=production

# Build the app
RUN npm run build
# Production stage
FROM nginx:alpine
# Copy built files from build stage to nginx serve directory
# Using /app/dist since that's your project's build output directory
COPY --from=build /app/dist /usr/share/nginx/html
# Add nginx configuration for SPA support
RUN echo $'\
server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n'\
> /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
# Start nginx
CMD ["nginx", "-g", "daemon off;"]