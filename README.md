# 🏛️ Library Management System

Modern Library Management System dengan **JWT Authentication**, **Vue.js** untuk frontend user, dan **React.js** untuk admin dashboard.

## ✨ Features

### 🔐 Authentication & Security
- **JWT (JSON Web Token)** authentication
- Role-based access control (User & Admin)
- Secure password hashing dengan BCrypt
- Stateless authentication

### 🎨 Frontend Vue.js (Port 5173)
- **Landing Page** dengan animasi 3D dan glassmorphism
- **Login/Register** dengan validasi modern
- **Particle background** animasi
- **Responsive design** dengan TailwindCSS
- **Modern UI/UX** dengan efek hover dan transisi

### ⚛️ Frontend React.js (Port 5174)
- **Admin Dashboard** dengan statistik real-time
- **CRUD Operations** untuk Books, Members, Loans
- **Modern Table** dengan search dan filter
- **Modal Forms** untuk add/edit data
- **Framer Motion** animations
- **Responsive design** dengan TailwindCSS

### 🚀 Backend Spring Boot (Port 8481)
- **RESTful API** dengan JWT authentication
- **MySQL Database** dengan JPA/Hibernate
- **CORS** enabled untuk frontend
- **Swagger/OpenAPI** documentation
- **Exception handling** dan validation

## 🏗️ Architecture

```
Library-Management-System/
├── library-management-utspbold/     # Spring Boot Backend
│   ├── src/main/java/
│   │   ├── config/                  # JWT, Security, CORS
│   │   ├── controller/              # REST API endpoints
│   │   ├── model/                   # Entity classes
│   │   ├── repository/              # Data access layer
│   │   └── service/                 # Business logic
│   └── src/main/resources/
│       └── application.properties   # Database config
├── frontend-vue/                    # Vue.js Frontend (User)
│   ├── src/
│   │   ├── views/                   # Landing, Login, Register
│   │   ├── components/              # Reusable components
│   │   └── style.css               # TailwindCSS + custom styles
│   └── package.json
└── frontend-react/                  # React.js Frontend (Admin)
    ├── src/
    │   ├── pages/                   # Dashboard, Books, Members, Loans, Profile
    │   ├── components/              # Sidebar, Header
    │   └── index.css               # TailwindCSS + custom styles
    └── package.json
```

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd library-management-utspbold
./mvnw spring-boot:run
```
Backend akan berjalan di `http://localhost:8481`

### 2. Frontend Vue Setup
```bash
cd frontend-vue
npm install
npm run dev
```
Vue app akan berjalan di `http://localhost:5173`

### 3. Frontend React Setup
```bash
cd frontend-react
npm install
npm run dev
```
React app akan berjalan di `http://localhost:5174`

## 🔑 Default Users

Sistem sudah memiliki user default:

| Username | Password | Role |
|----------|----------|------|
| `admin`  | `admin123` | ADMIN |
| `user`   | `user123`  | USER |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user info

### Books
- `GET /api/books` - Get all books
- `POST /api/books` - Create new book
- `PUT /api/books/{id}` - Update book
- `DELETE /api/books/{id}` - Delete book

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member
- `PUT /api/members/{id}` - Update member
- `DELETE /api/members/{id}` - Delete member

### Loans
- `GET /api/loans` - Get all loans
- `POST /api/loans` - Create new loan
- `PUT /api/loans/{id}` - Update loan
- `DELETE /api/loans/{id}` - Delete loan

## 🎨 UI Features

### Vue.js Frontend
- **Glassmorphism** design dengan backdrop blur
- **Particle animations** di background
- **3D card effects** dengan hover transforms
- **Gradient backgrounds** yang dinamis
- **Smooth transitions** dan micro-interactions

### React.js Dashboard
- **Modern sidebar** dengan navigation
- **Statistics cards** dengan animasi
- **Data tables** dengan search dan pagination
- **Modal forms** untuk CRUD operations
- **Responsive grid** layouts
- **Loading states** dan error handling

## 🛠️ Technologies Used

### Backend
- **Spring Boot 3.x**
- **Spring Security** dengan JWT
- **Spring Data JPA**
- **MySQL Database**
- **Maven**

### Frontend Vue
- **Vue 3** dengan Composition API
- **Vue Router** untuk navigation
- **TailwindCSS** untuk styling
- **Axios** untuk HTTP requests
- **Anime.js** untuk animations

### Frontend React
- **React 18** dengan Hooks
- **React Router** untuk navigation
- **Framer Motion** untuk animations
- **TailwindCSS** untuk styling
- **Axios** untuk HTTP requests
- **Lucide React** untuk icons

## 🔧 Configuration

### Database
Edit `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/library_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### JWT Secret
Edit `JwtUtil.java`:
```java
private final String jwtSecret = "your_custom_secret_key_here";
```

## 📱 Responsive Design

Kedua frontend sudah dioptimalkan untuk:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (< 768px)

## 🎯 Features Highlights

### Security
- ✅ JWT token authentication
- ✅ Password encryption dengan BCrypt
- ✅ Role-based authorization
- ✅ CORS configuration
- ✅ Input validation

### User Experience
- ✅ Modern glassmorphism design
- ✅ Smooth animations dan transitions
- ✅ Responsive layouts
- ✅ Loading states
- ✅ Error handling
- ✅ Search dan filter functionality

### Admin Features
- ✅ Dashboard dengan statistics
- ✅ CRUD operations untuk semua entities
- ✅ Real-time data updates
- ✅ Modal forms untuk data entry
- ✅ User profile management

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**🎉 Selamat! Sistem Library Management modern Anda sudah siap digunakan!**
