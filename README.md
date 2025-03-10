# S2S Payment Integration

This project provides a **Server-to-Server (S2S) payment integration** using **Nest.js for the backend** and **React with Material UI for the frontend**.

## Prerequisites
- **Docker** & **Docker Compose** installed
- **Node.js** & **Yarn** installed

## Project Setup
### 1. Clone the Repository

### 2. Set up environment variables
Create a `.env` file inside `backend/` (already provided in this repo):
```sh
API_URL=
BRAND_ID=
API_KEY=
S2S_TOKEN=
DATABASE_URL=postgres://checkout_user:checkout_password@checkout-db:5432/checkout_db
PORT=4000
```

### 3. Running with Docker Compose
Start backend, frontend, and database using Docker:
```sh
yarn start
```
To stop containers:
```sh
yarn stop
```

### 4. Running Manually (without Docker)
#### Install dependencies:
```sh
yarn install
```
#### Start backend:
```sh
yarn dev:backend
```
#### Start frontend:
```sh
yarn dev:frontend
```
### 5. Open in Browser
Frontend will be available at:
- **http://localhost:3000**

Backend API runs at:
- **http://localhost:4000**

```
## Testing
Use test cards:
- **Non-3D Secure**: `4444 3333 2222 1111`
- **3D Secure**: `5555 5555 5555 4444`
- **CVC**: `123`
- **Expiration**: Any valid future date

---
Now you're ready to integrate and test payments! 🚀
