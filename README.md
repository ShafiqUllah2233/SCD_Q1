# Healthcare Microservices Application

## GitHub Repository
**Repository URL:** https://github.com/ShafiqUllah2233/SCD_Q1.git

## Docker Hub Images
All microservice images are available on Docker Hub:
- `shafiqoo/api-gateway`
- `shafiqoo/auth-service`
- `shafiqoo/patient-service`
- `shafiqoo/doctor-service`
- `shafiqoo/appointment-service`
- `shafiqoo/notification-service`

## Deployment Commands

### 1. Clone the Repository
```bash
git clone https://github.com/ShafiqUllah2233/SCD_Q1.git
```
**Purpose:** Downloads the source code from GitHub to your local machine.

### 2. Navigate to Project Directory
```bash
cd Final_SCD_Q1
```
**Purpose:** Changes the current working directory to the project folder.

### 3. Build and Start All Services

```bash
docker-compose up --build
```
**Purpose:** Builds Docker images for all microservices and starts them in containers with proper networking.

### 4. Run Services in Background (Detached Mode)
```bash
docker-compose up --build -d

```
**Purpose:** Builds and runs all containers in the background, freeing up the terminal.

### 5. View Running Containers
```bash
docker-compose ps
```
**Purpose:** Lists all running containers and their status, ports, and names.

### 6. View Service Logs
```bash
docker-compose logs -f
```
**Purpose:** Displays real-time logs from all services for debugging and monitoring.

### 7. View Logs for Specific Service
```bash

docker-compose logs -f api-gateway
```
**Purpose:** Shows real-time logs for a specific service (replace api-gateway with any service name).

### 8. Stop All Services
```bash
docker-compose down
```
**Purpose:** Stops and removes all running containers while preserving images.

### 9. Stop Services and Remove Images
```bash
docker-compose down --rmi all
```
**Purpose:** Stops containers and removes all built Docker images to free up disk space.

### 10. Rebuild a Specific Service

```bash

docker-compose up --build -d api-gateway
```
**Purpose:** Rebuilds and restarts only the specified service without affecting others.

---

## Manual Docker Commands

### Build Individual Images

```bash

docker build -t api-gateway ./api-gateway
docker build -t auth-service ./auth-service
docker build -t patient-service ./patient-service
docker build -t doctor-service ./doctor-service
docker build -t appointment-service ./appointment-service
docker build -t notification-service ./notification-service
```
**Purpose:** Builds Docker images for each microservice individually.

### Tag Images for Docker Hub
```bash
docker tag api-gateway YOUR_DOCKERHUB_USERNAME/api-gateway:latest
docker tag auth-service YOUR_DOCKERHUB_USERNAME/auth-service:latest
docker tag patient-service YOUR_DOCKERHUB_USERNAME/patient-service:latest
docker tag doctor-service YOUR_DOCKERHUB_USERNAME/doctor-service:latest
docker tag appointment-service YOUR_DOCKERHUB_USERNAME/appointment-service:latest
docker tag notification-service YOUR_DOCKERHUB_USERNAME/notification-service:latest
```
**Purpose:** Tags local images with Docker Hub repository names for pushing.

### Login to Docker Hub
```bash
docker login
```
**Purpose:** Authenticates with Docker Hub to enable pushing images.

### Push Images to Docker Hub
```bash
docker push YOUR_DOCKERHUB_USERNAME/api-gateway:latest
docker push YOUR_DOCKERHUB_USERNAME/auth-service:latest
docker push YOUR_DOCKERHUB_USERNAME/patient-service:latest
docker push YOUR_DOCKERHUB_USERNAME/doctor-service:latest
docker push YOUR_DOCKERHUB_USERNAME/appointment-service:latest
docker push YOUR_DOCKERHUB_USERNAME/notification-service:latest
```
**Purpose:** Uploads Docker images to Docker Hub container registry.

---

## GitHub Actions CI/CD Setup

To enable automated builds, configure the following secrets in your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**


2. Add the following secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password or access token

The workflow automatically triggers on push to the main branch and:
- Checks out the source code
- Sets up the Docker build environment
- Builds container images for all services
- Pushes images to Docker Hub

---

## API Testing Examples

All requests should go through the API Gateway at `http://localhost:4000`

### 1. Health Check
```bash
curl http://localhost:4000/health
```
**Expected Response:** `Gateway OK`

### 2. Register a New User
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@demo.com", "password": "123", "role": "patient"}'
```
**Expected Response:** `{"message": "User registered"}`

### 3. Login
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@demo.com", "password": "123"}'
```
**Expected Response:** `{"token": "jwt_token_here"}`

### 4. Get All Patients/Users
```bash
curl http://localhost:4000/users/users
```
**Expected Response:** List of users

### 5. Add a New Patient

```bash

curl -X POST http://localhost:4000/users/users \
  -H "Content-Type: application/json" \
  -d '{"id": 3, "name": "John Doe", "age": 35}'
```
**Expected Response:** `{"message": "User added"}`

### 6. Get All Doctors
```bash

curl http://localhost:4000/doctors/doctors
```
**Expected Response:** List of doctors with availability status

### 7. Update Doctor Availability
```bash
curl -X PUT http://localhost:4000/doctors/doctors/1/availability \
  -H "Content-Type: application/json" \
  -d '{"available": false}'
```
**Expected Response:** `{"message": "Availability updated"}`

### 8. Create an Appointment


```bash
curl -X POST http://localhost:4000/appointments/appointments \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "doctorId": 1, "date": "2026-01-15"}'
```
**Expected Response:** `{"message": "Appointment confirmed"}`

### 9. Get All Appointments
```bash
curl http://localhost:4000/appointments/appointments
```
**Expected Response:** List of appointments

### 10. Cancel an Appointment
```bash
curl -X DELETE http://localhost:4000/appointments/appointments/0
```
**Expected Response:** `{"message": "Appointment cancelled"}`

## Troubleshooting

### Check if all containers are running
```bash
docker-compose ps
```

### View logs for a specific service
```bash
docker-compose logs -f service-name
```

### Restart a specific service
```bash
docker-compose restart service-name
```

### Remove all containers and start fresh
```bash
docker-compose down -v
docker-compose up --build
```

---