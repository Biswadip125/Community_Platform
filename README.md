# 🧑‍🤝‍🧑 Community Platform

A simple full-stack social platform where users can sign up, log in, create posts, and view profiles. Built with modern technologies using the MERN stack.

## 🛠️ Tech Stack

### Frontend
- React
- Tailwind CSS
- React Router DOM
- Axios
- Vite

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Cookie-parser
- CORS
- Dotenv

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/community-platform.git
cd community-platform
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Environment Variables

Create `.env` files in both `backend` and `frontend`.

#### Backend `.env`
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://your-frontend-url.com
```

#### Frontend `.env`
```
VITE_BACKEND_API=https://your-backend-url.com/api/v1
```

### 4. Run the app

#### Backend
```bash
npm run dev
```

#### Frontend
```bash
npm run dev
```

---

## 👤 Demo User Login (Optional)

| Role    | Email              | Password   |
|---------|--------------------|------------|
| Demo    | demo@example.com   | password123 |
| Admin   | admin@example.com  | admin123    |

> *Ensure you’ve added these users manually to the database or include a seed script.*

---

## ✨ Features

- User signup & login with secure JWT-based authentication
- Persistent login via cookies
- Create, view, and display posts
- View user profile with post history
- Protected routes with context-based state management
- Responsive and modern UI using Tailwind CSS

---

## 🌐 Live URL

[https://your-deployed-app.com](https://your-deployed-app.com)

---

## 📁 Folder Structure

```
community-platform/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── main.jsx
```

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
