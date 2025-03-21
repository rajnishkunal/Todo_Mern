
# 📝 Full Stack MERN Todo App

This is a full-featured Todo application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** with **JWT Authentication**.

## 🔥 Features

- User Registration & Login (JWT-based Auth)
- Create, Read, Update, Delete Todos
- Mark Todos as Completed
- Logout functionality
- Fully responsive UI with Tailwind CSS
- Toast Notifications

## 🔗 Demo Video

[![Todo App Video](https://img.youtube.com/vi/BiFech7_e7M/0.jpg)](https://www.youtube.com/embed/BiFech7_e7M?autoplay=1&loop=1&playlist=BiFech7_e7M)

## 🖼️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, SWR
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Notifications:** react-hot-toast

## 🚀 Getting Started

### 🔧 Backend Setup
```bash
cd backend
npm install
npm run dev
```

### 🌐 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure
```
/backend
  ├── controllers/
  ├── middleware/
  ├── models/
  ├── routes/
  └── server.js

/frontend
  ├── components/
  ├── pages/
  ├── App.js
  └── main.jsx
```

## 📬 API Routes Summary

### Auth Routes:
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout`

### Todo Routes:
- GET `/api/todos`
- POST `/api/todos`
- PUT `/api/todos/:id`
- DELETE `/api/todos/:id`

## 🙌 .Env
- Edit the .env file accoring to your need

