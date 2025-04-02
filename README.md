# Task Manager API (Backend - MERN Stack)

This is the **backend** for the Task Manager App, built with **Node.js, Express.js, and MongoDB**. It handles user authentication, task management, and database operations.



**Frontend github repository**: https\://github.com/TariqueMdHasan/TASKIFY

---

## 🛠 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database & ORM
- **JWT (JSON Web Token)** - Authentication
- **bcrypt.js** - Password hashing
- **dotenv** - Environment variable management
- **Cors** - Enable cross-origin requests

---

## 📂 Folder Structure

```
backend/
│── models/         # Database models (User, Task)
│── controllers/    # Business logic for API routes
│── routes/         # Express routes (user, task)
│── middleware/     # Authentication & error handling middleware
│── config/         # Database connection & environment variables
│── .env           # Environment variables (not committed)
│── server.js      # Entry point
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/task-manager-app.git
cd task-manager-app/backend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the `backend/` directory and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Start the Server

```bash
npm run dev
```

The server will run on `http://localhost:5000/`

---

## 📌 API Routes

### User Routes

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | `/api/users/register` | Register a new user |
| POST   | `/api/users/login`    | Login user          |
| GET    | `/api/users/profile`  | Get user profile    |

### Task Routes

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/api/tasks`     | Create a task       |
| GET    | `/api/tasks`     | Get all tasks       |
| GET    | `/api/tasks/:id` | Get a specific task |
| PUT    | `/api/tasks/:id` | Update a task       |
| DELETE | `/api/tasks/:id` | Delete a task       |

---

## 🔥 Future Enhancements

- **Task Reminders & Notifications** 🔔
- **Priority-based Task Sorting** 📌
- **Recurring Tasks Feature** 🔄

---

## 🤝 Contributing

Pull requests and suggestions are welcome! Open an issue to discuss any improvements.

---

## 📨 Contact

For any questions, reach out via \*\*[md.th.abdi@gmail.com](mailto\:md.th.abdi@gmail.com) \*\*.

