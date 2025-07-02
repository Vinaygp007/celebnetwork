# CelebNetwork Backend API

A powerful Nest.js backend API for the CelebNetwork platform, providing authentication, user management, and celebrity networking features.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Separate profiles for fans and celebrities  
- **Celebrity Search**: Advanced search and filtering capabilities
- **Database Integration**: PostgreSQL with TypeORM
- **API Documentation**: RESTful API design
- **Type Safety**: Full TypeScript support

## 🛠️ Tech Stack

- **Framework**: Nest.js
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT + Passport
- **Validation**: Class Validator
- **Language**: TypeScript

## 📁 Project Structure

```
backend/
├── src/
│   ├── auth/                 # Authentication module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── jwt.strategy.ts
│   ├── users/                # User management
│   ├── celebrities/          # Celebrity profiles
│   ├── fans/                 # Fan profiles
│   ├── entities/             # Database entities
│   ├── dto/                  # Data transfer objects
│   ├── enums/                # TypeScript enums
│   ├── app.module.ts         # Main application module
│   └── main.ts               # Application entry point
├── dist/                     # Compiled JavaScript
├── .env                      # Environment variables
└── package.json
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- npm or yarn

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

Make sure PostgreSQL is running and create a database:

```sql
CREATE DATABASE celebnetwork;
```

### 3. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Update `.env` with your database credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=celebnetwork
JWT_SECRET=your-super-secret-jwt-key
```

### 4. Build the Project

```bash
npm run build
```

### 5. Start the Server

**Development mode:**
```bash
npm run start:dev
```

**Production mode:**
```bash
npm run start:prod
```

The API will be available at `http://localhost:3001`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user (fan or celebrity)
- `POST /api/auth/login` - Login with email and password

### Users

- `GET /api/users/profile` - Get current user profile (protected)
- `GET /api/users/:id` - Get user by ID (protected)

### Celebrities

- `GET /api/celebrities` - Get all celebrities
- `GET /api/celebrities/featured` - Get featured celebrities
- `GET /api/celebrities/search?q=query` - Search celebrities
- `GET /api/celebrities/industry/:industry` - Get celebrities by industry
- `GET /api/celebrities/:id` - Get celebrity profile
- `PUT /api/celebrities/:id` - Update celebrity profile (protected)

### Fans

- `GET /api/fans/:id` - Get fan profile
- `PUT /api/fans/:id` - Update fan profile (protected)
- `POST /api/fans/:id/favorites/:celebrityId` - Add favorite celebrity (protected)
- `DELETE /api/fans/:id/favorites/:celebrityId` - Remove favorite celebrity (protected)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles

- **Fan**: Regular users who can follow celebrities
- **Celebrity**: Public figures with enhanced profiles
- **Admin**: System administrators (future feature)

## 🗄️ Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `role` (Enum: fan, celebrity, admin)
- `isActive` (Boolean)
- `createdAt`, `updatedAt`

### Celebrities Table
- `id` (UUID, Primary Key)
- `userId` (Foreign Key to Users)
- `firstName`, `lastName`, `stageName`
- `bio`, `avatar`, `coverPhoto`
- `industries` (Array)
- `socialMedia` (Array)
- `isVerified`, `followersCount`, `rating`

### Fans Table
- `id` (UUID, Primary Key)
- `userId` (Foreign Key to Users)
- `firstName`, `lastName`
- `dateOfBirth`, `location`, `avatar`
- `interests`, `favoriteCelebrities` (Arrays)

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
DB_HOST=your-production-db-host
DB_USERNAME=your-production-db-user
DB_PASSWORD=your-production-db-password
JWT_SECRET=your-super-secure-production-jwt-secret
```

### Docker Deployment (Future)

A Dockerfile and docker-compose.yml will be added for containerized deployment.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please contact the CelebNetwork development team.

---

Built with ❤️ by the CelebNetwork Team
