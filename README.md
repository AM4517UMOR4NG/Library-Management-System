# 🏛️ Library Management System

Modern Library Management System dengan **JWT Authentication**, **Vue.js** untuk frontend user, dan **React.js** untuk admin dashboard.

## ✨ Features

### 🔐 Authentication & Security
- **JWT (JSON Web Token)** authentication untuk API
- **Session-based** authentication untuk web pages
- Role-based access control (User & Admin)
- Secure password hashing dengan BCrypt
- Hybrid authentication system

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
- **Web Pages** dengan session authentication
- **H2 Database** dengan JPA/Hibernate
- **CORS** enabled untuk frontend
- **Exception handling** dan validation

## 🚀 Quick Start

### Option 1: Using Startup Scripts (Recommended)

**Windows (Batch):**
```bash
start-system.bat
```

**Windows (PowerShell):**
```powershell
.\start-system.ps1
```

### Option 2: Manual Startup

#### 1. Backend Setup (Spring Boot)
```bash
# Masuk ke direktori backend
cd library-management-utspbold

# Jalankan dengan Maven (Windows)
mvn spring-boot:run

# Atau dengan Maven wrapper (Windows)
mvnw.cmd spring-boot:run

# Atau dengan Maven wrapper (Linux/Mac)
./mvnw spring-boot:run
```

Backend akan berjalan di `http://localhost:8481`

#### 2. Frontend Vue Setup (User Portal)
```bash
# Masuk ke direktori Vue frontend
cd frontend-vue

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Vue app akan berjalan di `http://localhost:5173`

#### 3. Frontend React Setup (Admin Dashboard)
```bash
# Masuk ke direktori React frontend
cd frontend-react

# Install dependencies
npm install

# Jalankan development server
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
- `POST /api/auth/login` - Login user (JWT)
- `POST /api/auth/register` - Register new user (JWT)
- `GET /api/auth/me` - Get current user info (JWT)

### Web Pages (Session-based)
- `GET /login` - Login page
- `GET /` - Home page
- `GET /books` - Books list page
- `GET /members` - Members list page
- `GET /loans` - Loans list page

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
- **Spring Security** dengan hybrid authentication
- **Spring Data JPA**
- **H2 Database**
- **Maven**

### Frontend Vue
- **Vue 3** dengan Composition API
- **Vue Router** untuk navigation
- **TailwindCSS** untuk styling
- **Axios** untuk HTTP requests

### Frontend React
- **React 18** dengan Hooks
- **React Router** untuk navigation
- **Framer Motion** untuk animations
- **TailwindCSS** untuk styling
- **Axios** untuk HTTP requests
- **Lucide React** untuk icons

## 🔧 Configuration

### Database
Sistem menggunakan H2 in-memory database yang akan otomatis dibuat saat startup.

### Authentication
- **API endpoints** menggunakan JWT authentication
- **Web pages** menggunakan session-based authentication
- **Hybrid system** untuk optimal security dan user experience

### JWT Secret
JWT secret sudah dikonfigurasi di `JwtUtil.java` dengan 64 karakter.

## 📱 Responsive Design

Kedua frontend sudah dioptimalkan untuk:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (< 768px)

## 🎯 Features Highlights

### Security
- ✅ JWT token authentication untuk API
- ✅ Session-based authentication untuk web
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

## 🔧 Recent Fixes Applied

### Backend Fixes
1. **Updated SecurityConfig** - Fixed hybrid authentication system (JWT for API, Session for web)
2. **Removed conflicting security config** - Removed spring.security.user from application.properties
3. **Updated Book Model** - Added `publicationYear` and `quantity` fields
4. **Updated Member Model** - Added `phone` and `address` fields  
5. **Updated LoanTransaction Model** - Changed `borrowDate` to `loanDate` and added `dueDate` field
6. **Enhanced LoanRestController** - Added DTO for proper field mapping between frontend and backend
7. **Updated Demo Data** - Fixed constructor calls with new field parameters

### Frontend Fixes
1. **React App.jsx** - Fixed user profile fetching after login and on app initialization
2. **Added Loading States** - Proper loading spinners while checking authentication
3. **Enhanced Error Handling** - Better error handling for invalid tokens
4. **Fixed Field Mapping** - Updated frontend to work with new backend field names

### Configuration Fixes
1. **CORS Configuration** - Properly configured for both frontends
2. **Proxy Configuration** - Both frontends properly proxy to backend
3. **JWT Configuration** - Secure JWT secret and proper expiration
4. **Authentication Flow** - Proper separation between API and web authentication

## 🚨 Troubleshooting

### Port 8481 Already in Use
```bash
# Cek proses yang menggunakan port 8481
netstat -ano | findstr :8481

# Hentikan proses dengan PID yang ditemukan
taskkill /PID <PID> /F
```

### Maven Command Not Found
```bash
# Gunakan Maven wrapper
mvnw.cmd spring-boot:run  # Windows
./mvnw spring-boot:run    # Linux/Mac
```

### Frontend Dependencies
```bash
# Pastikan Node.js terinstall
node --version
npm --version

# Install dependencies jika belum
npm install
```

### Authentication Issues
- **API calls**: Use JWT token in Authorization header
- **Web pages**: Use session-based login at `/login`
- **Default users**: admin/admin123 or user/user123

### CORS Issues
- Backend sudah dikonfigurasi untuk menerima request dari `localhost:5173` dan `localhost:5174`
- Pastikan proxy di `vite.config.js` sudah benar

### Database Issues
- H2 database akan otomatis dibuat saat startup
- Data demo akan otomatis di-seed saat pertama kali running
- Jika ada error, coba restart backend

### React Dashboard Blank
- Pastikan user sudah login dengan benar
- Check browser console untuk error messages
- Verify JWT token is valid
- Ensure backend is running on port 8481

### Vue Frontend Issues
- Check if all Vue components are properly imported
- Verify TailwindCSS is working
- Check browser console for JavaScript errors

### Common Error Solutions

**Error: "Invalid JWT token"**
- Clear browser localStorage
- Re-login to get new token
- Check if backend is running

**Error: "CORS policy"**
- Ensure backend is running on port 8481
- Check proxy configuration in vite.config.js
- Verify CORS settings in SecurityConfig

**Error: "Cannot connect to backend"**
- Check if Spring Boot is running
- Verify port 8481 is not blocked
- Check firewall settings

**Error: "Module not found"**
- Run `npm install` in frontend directories
- Clear node_modules and reinstall
- Check package.json dependencies

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

### Quick Access URLs:
- **Backend API**: http://localhost:8481
- **H2 Console**: http://localhost:8481/h2-console
- **Vue Frontend**: http://localhost:5173
- **React Dashboard**: http://localhost:5174

### Demo Data:
- **Books**: 2 sample books with publication year and quantity
- **Members**: 2 sample members with phone and address
- **Loans**: 2 sample loan transactions with proper dates
- **Users**: admin/admin123 and user/user123

### Quick Start Commands:
```bash
# Windows
start-system.bat

# PowerShell
.\start-system.ps1

# Manual
cd library-management-utspbold && mvnw.cmd spring-boot:run
cd frontend-vue && npm run dev
cd frontend-react && npm run dev
```
