# Ancient Empires II Web

This project hosts the web server for Ancient Empires II (AE2).
*(You can add more general information about your project here, like a brief description, link to the game, etc.)*

## Prerequisites for Local Development (Without Docker)

*   Node.js (version >= 12.0.0, as per Dockerfile, Node 18 LTS is recommended)
*   npm (usually comes with Node.js)

To set up and run locally: `npm install`, then `npm start`.

## Running with Docker

You can run Ancient Empires II Web using Docker. This provides a consistent environment for the application.

### Prerequisites

*   Docker installed on your system.

### Building the Docker Image

First, build the Docker image from the `Dockerfile` in the project root. It's a good practice to tag your image:

```bash
docker build -t ancient-empires-web .
```

### Running the Docker Container

Once the image is built, you can run it as a container. The application uses `http-server` to serve the game files.

**Running the game on port 8080:**

The Docker image is configured to run the game by default.
```bash
docker run -d -p 8080:8080 --name ancient-empires-server ancient-empires-web
```

This command will:
*   Run the container in detached mode (`-d`).
*   Map port 8080 of the container to port 8080 on your host machine (`-p 8080:8080`).
*   Name the container `ancient-empires-server` for easier management.
*   Use the `ancient-empires-web` image you built.
*   Start the server for "Ancient Empires II" (AE2) by default (executing `npm start` inside the container).

**Customizing the Host Port:**

If port 8080 is already in use on your host, or you prefer a different port, you can change the port mapping. For example, to use host port 8081:
```bash
docker run -d -p 8081:8080 --name ancient-empires-server ancient-empires-web
```
This maps port 8080 inside the container (where `http-server` listens) to port 8081 on your host.

**Accessing the Game:**

After starting the container, open your web browser and navigate to `http://localhost:HOST_PORT` (e.g., `http://localhost:8080` or `http://localhost:8081` depending on your configuration).

**Stopping and Removing the Container:**

To stop the container:
```bash
docker stop ancient-empires-server # Or the name you used, e.g., ancient-empires-web
```

To remove the container (after stopping it):
```bash
docker rm ancient-empires-server # Or the name you used
```

## Running with Docker Compose

For easier management, especially with configuration options and multi-container setups (if you expand in the future), you can use Docker Compose.

### Prerequisites

*   Docker installed.
*   Docker Compose installed (usually included with Docker Desktop).

### Building and Starting the Service

Navigate to the project root directory (where `docker-compose.yml` is located) and run:

**Default (AE2 on host port 8080):**
```bash
docker-compose up -d
```
This command will:
*   Build the image using the `Dockerfile` and tag it as `ancient-empires-web-compose` (as specified in `docker-compose.yml`).
*   Start the `app` service in detached mode (`-d`).
*   The container will be named `ancient-empires-server`.
*   It will restart `unless-stopped`.

**Customizing with Environment Variables:**

The `docker-compose.yml` file is configured to use environment variables for customization:

*   `HOST_PORT`: Specifies the host port to map to the container's port 8080. Defaults to `8080`.

You can set these environment variables before running `docker-compose up`.

**Examples:**

*   Run the game on host port 8081:
    ```bash
    HOST_PORT=8081 docker-compose up -d
    ```

**Accessing the Game:**

Open your web browser and navigate to `http://localhost:HOST_PORT` (e.g., `http://localhost:8080` if `HOST_PORT` is not set, or `http://localhost:8081` if you set `HOST_PORT=8081`).

**Viewing Logs:**

To view the logs from the running service:
```bash
docker-compose logs -f
```

**Stopping and Removing Services:**

To stop and remove the containers, networks, and the image created by `docker-compose up`:
```bash
docker-compose down
```
If you want to remove the image as well, you can add the `--rmi all` flag:
```bash
docker-compose down --rmi all
```

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.