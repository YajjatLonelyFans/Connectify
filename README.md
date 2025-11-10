# 🌐 Connectify – Full Stack MERN Application

Connectify is a full-stack social platform built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It allows users to register, log in, create, edit, and delete posts, and manage their profiles — all with JWT-based authentication.

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://connectify-frontend.vercel.app](https://connectify-frontend-three.vercel.app)  
- **Backend (Render):** [https://connectify-r0y3.onrender.com](https://connectify-r0y3.onrender.com)  

---

## 🧠 Features

### 👤 User Management
- User registration and login with **JWT authentication**
- Password hashing using **bcrypt**
- User profile view and update
- Secure routes using middleware protection

### 📝 Posts
- Create new posts
- Edit and delete existing posts
- View all posts with associated user info
- Automatically attaches “Posted by” details

### ⚙️ General
- Fully responsive UI using **Tailwind CSS**
- Authentication state managed with **React Context**
- RESTful backend with Express + MongoDB Atlas
- Protected APIs using middleware
- Hosted frontend (Vercel) and backend (Render)

---

## 🏗️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Frontend | React, Tailwind CSS, Axios, React Router DOM |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT, bcrypt |
| Hosting | Vercel (Frontend), Render (Backend) |

---

## ⚙️ Installation & Setup (Local Development)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YajjatAilawadi/Connectify.git
cd Connectify
```

### 2️⃣ Setup the backend
```bash
cd backend
npm install
```
Create a `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```
Run the backend:
```bash
npm start
```

### 3️⃣ Setup the frontend
```bash
cd ../frontend
npm install
npm run dev
```
The app will start at `http://localhost:5173`

---

## 🌐 Deployment

- **Frontend:** Hosted on [Vercel](https://vercel.com/)
- **Backend:** Hosted on [Render](https://render.com/)

---

## 📸 Screenshots

| Page | Preview |
|------|----------|
| Login / Signup | 🔒 User authentication |
| Posts Page | 📝 All posts displayed with edit/delete options |
| Create Post | ➕ Add new posts |
| Profile | 👤 View & update profile |

---


## 🏁 Conclusion

This project demonstrates end-to-end implementation of a modern **MERN stack web application**, featuring secure authentication, REST APIs, and responsive UI design — all deployed in production environments.

---
