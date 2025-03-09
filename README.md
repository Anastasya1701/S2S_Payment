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
API_URL=https://gate.libernetix.com/api/v1
BRAND_ID=77ede2ab-d039-4894-8913-6acf29551825
API_KEY=your_api_key_here
S2S_TOKEN=your_s2s_token_here
PORT=3000
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
- **http://localhost:3001**

Backend API runs at:
- **http://localhost:3000**

## API Endpoints
### **Create a Purchase**
```sh
POST /payments/create
```
#### **Request Body:**
```json
{
  "amount": 100,
  "email": "test@example.com"
}
```
#### **Response Example:**
```json
{
  "purchase_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "checkout_url": "https://gate.libernetix.com/checkout"
}
```

### **Process S2S Payment**
```sh
POST /payments/charge
```
#### **Request Body:**
```json
{
  "purchase_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "card_number": "4444333322221111",
  "expires": "01/25",
  "cvc": "123",
  "cardholder_name": "John Doe"
}
```
#### **Response Example:**
```json
{
  "status": "executed"
}
```

### **Handling 3D Secure Payments**
If the card is enrolled in **3D Secure**, the response will contain:
```json
{
  "status": "3DS_required",
  "URL": "https://bank.acs.com/redirect",
  "PaReq": "encrypted-data",
  "MD": "session-id"
}
```
## Testing
Use test cards:
- **Non-3D Secure**: `4444 3333 2222 1111`
- **3D Secure**: `5555 5555 5555 4444`
- **CVC**: `123`
- **Expiration**: Any valid future date

---
Now you're ready to integrate and test payments! 🚀
