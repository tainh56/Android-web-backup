# Use an official Node.js runtime as a parent image
# Node.js version >= 12.0.0 is required by the project.
# node:18-alpine uses Node.js 18 (an LTS version) on a small Alpine Linux base,
# which helps keep the Docker image size down.
FROM node:18-alpine AS builder

# Set the working directory for subsequent commands within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
# This step is separated to leverage Docker's layer caching.
# If these files haven't changed, Docker can reuse the cached layer from a previous build
# for the `npm ci` step, speeding up rebuilds if only application code changes.
COPY package*.json ./

# Install project dependencies defined in package.json
# Use `npm ci` for reproducible builds from package-lock.json and omit dev dependencies.
# Ensure you have a package-lock.json file committed to your repository.
RUN npm ci --omit=dev

# Copy the rest of the application source code into the image
COPY . .

# --- Second Stage: Production Image ---
# Use a fresh slim base image for the production stage
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Create a non-root user and group for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only necessary artifacts from the builder stage:
# - node_modules for dependencies
# - www directory containing static assets (served by http-server)
# - package.json (needed for `npm start` which uses `npx http-server`)
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/www ./www
COPY --from=builder /usr/src/app/package.json ./package.json

# Change ownership of the application files to the non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to the non-root user
USER appuser

# Inform Docker that the container listens on port 8080 at runtime.
# This is the default port for http-server and is mentioned in the project's README.
EXPOSE 8080

# Add a HEALTHCHECK to allow Docker to monitor the application's health.
# It uses wget (available in alpine) to check if the http-server is responding on port 8080.
# Assumes your http-server serves content successfully at the root path (e.g., an index.html in www).
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://localhost:8080/ || exit 1

# Set the default command to execute when a container is run from the image.
ENTRYPOINT ["npm"]
# This will execute the "start" script defined in package.json (i.e., `npm start`).
CMD ["start"]