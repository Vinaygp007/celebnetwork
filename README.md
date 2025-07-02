# CelebNetwork.com - Premium Celebrity Discovery Platform

CelebNetwork.com is a modern, full-stack web application that simulates a premium celebrity discovery and fan engagement portal. It allows users to discover global performing celebrities, connect with them, and engage through a sophisticated platform.

## 🚀 Live Demo

- **Frontend**: [https://celebnetwork.vercel.app](https://celebnetwork.vercel.app) (Coming Soon)
- **API Documentation**: [https://api.celebnetwork.com/api/docs](https://api.celebnetwork.com/api/docs) (Coming Soon)

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Hooks + Custom Auth Context
- **UI Components**: Heroicons, Custom Components
- **Features**: 
  - AI-powered celebrity search
  - Responsive design with animations
  - JWT-based authentication
  - PDF generation integration
  - Real-time data updates

### Backend (Nest.js)
- **Framework**: Nest.js with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT with Passport.js
- **Documentation**: Swagger/OpenAPI
- **AI Integration**: OpenAI GPT for celebrity discovery
- **PDF Generation**: Puppeteer for profile PDFs
- **Features**:
  - RESTful API design
  - Database migrations
  - Input validation
  - Error handling
  - Rate limiting

### Infrastructure
- **Deployment**: AWS Lambda + API Gateway (Backend), Vercel (Frontend)
- **Database**: PostgreSQL (AWS RDS or Supabase)
- **File Storage**: AWS S3 (for images)
- **Monitoring**: CloudWatch, Vercel Analytics

## 📋 Features

### Core Features
1. **AI-Powered Celebrity Search**: Input descriptions and get AI-suggested matches
2. **Auto-Fill Onboarding**: AI enriches celebrity profiles with social media data
3. **Public Celebrity Profiles**: Dynamic, rich profile pages with stats
4. **Fan Dashboard**: Follow celebrities and manage preferences
5. **Celebrity Dashboard**: View fan engagement metrics
6. **PDF Generation**: Download celebrity profiles as formatted PDFs

### User Roles
- **Guests**: Browse celebrities, search, view public profiles
- **Fans**: Follow celebrities, access dashboard, personal preferences
- **Celebrities**: Manage profile, view analytics, engage with fans
- **Admins**: Platform management, user moderation

## 🛠️ Technologies Used

### Frontend Stack
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful SVG icons
- **React Hook Form**: Form handling
- **Axios**: HTTP client

### Backend Stack
- **Nest.js**: Scalable Node.js framework
- **TypeScript**: Type-safe backend development
- **PostgreSQL**: Relational database
- **TypeORM**: Database ORM
- **Passport.js**: Authentication middleware
- **JWT**: Token-based authentication
- **OpenAI API**: AI-powered features
- **Puppeteer**: PDF generation
- **Swagger**: API documentation

### DevOps & Deployment
- **Serverless Framework**: AWS Lambda deployment
- **Vercel**: Frontend hosting
- **AWS RDS**: Production database
- **GitHub Actions**: CI/CD pipeline
- **Docker**: Containerization

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 14+
- Git

### 1. Clone Repository
\`\`\`bash
git clone https://github.com/yourusername/celebnetwork.git
cd celebnetwork
\`\`\`

### 2. Frontend Setup
\`\`\`bash
# Install frontend dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Update environment variables
# NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Start development server
npm run dev
\`\`\`

### 3. Backend Setup
\`\`\`bash
cd backend

# Install backend dependencies  
npm install

# Create environment file
cp .env.example .env

# Update environment variables (see below)

# Run database migrations
npm run migration:run

# Start development server
npm run start:dev
\`\`\`

### 4. Environment Variables

#### Backend (.env)
\`\`\`bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=celebnetwork

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# OpenAI (Optional)
OPENAI_API_KEY=your-openai-api-key

# AWS (for production)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
\`\`\`

#### Frontend (.env.local)
\`\`\`bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NODE_ENV=development
\`\`\`

## 🚀 Deployment

### Frontend Deployment (Vercel)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
\`\`\`

### Backend Deployment (AWS Lambda)
\`\`\`bash
cd backend

# Install Serverless Framework
npm i -g serverless

# Configure AWS credentials
serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET

# Deploy to AWS
serverless deploy --stage prod
\`\`\`

## 📚 API Documentation

Once the backend is running, visit:
- **Local**: http://localhost:3001/api/docs
- **Production**: https://api.celebnetwork.com/api/docs

### Key Endpoints

#### Authentication
- \`POST /api/auth/register\` - User registration
- \`POST /api/auth/login\` - User login
- \`GET /api/auth/profile\` - Get user profile

#### Celebrities
- \`GET /api/celebrities\` - List all celebrities
- \`GET /api/celebrities/featured\` - Get featured celebrities
- \`POST /api/celebrities/search\` - AI-powered search
- \`GET /api/celebrities/:id\` - Get celebrity details
- \`GET /api/celebrities/:id/pdf\` - Generate PDF profile
- \`POST /api/celebrities/:id/follow\` - Follow celebrity

#### Fans
- \`GET /api/fans/dashboard\` - Fan dashboard data
- \`GET /api/fans/following\` - Get followed celebrities

## 🎯 Usage Examples

### AI Celebrity Search
\`\`\`javascript
// Frontend usage
const searchCelebrities = async (query) => {
  const response = await fetch('/api/celebrities/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: "Punjabi singer from India who performed at Coachella" })
  });
  return response.json();
};
\`\`\`

### Follow Celebrity
\`\`\`javascript
const followCelebrity = async (celebrityId) => {
  const response = await fetch(\`/api/celebrities/\${celebrityId}/follow\`, {
    method: 'POST',
    headers: { 
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json' 
    }
  });
  return response.json();
};
\`\`\`

## 🔧 Development

### Adding New Features
1. **Backend**: Create service → Create controller → Add to module → Deploy to production
2. **Frontend**: Create components → Add API calls → Update routing

### Database Migrations
\`\`\`bash
# Generate migration
npm run migration:generate -- -n CreateNewTable

# Run migrations
npm run migration:run

# Revert migration
npm run migration:revert
\`\`\`

### Testing
\`\`\`bash
# Backend tests
cd backend
npm run test
npm run test:e2e

# Frontend tests
npm run test
npm run test:coverage
\`\`\`

## 📊 Project Structure

\`\`\`
celebnetwork/
├── app/                          # Next.js app directory
│   ├── auth/                     # Authentication pages
│   ├── celebrity/                # Celebrity-related pages
│   ├── dashboard/                # User dashboards
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── AuthWrapper.tsx
├── lib/                          # Utilities and API
│   ├── api.ts                    # API integration
│   └── useAuth.ts                # Authentication hook
├── backend/                      # Nest.js backend
│   ├── src/
│   │   ├── entities/             # Database entities
│   │   ├── controllers/          # API controllers
│   │   ├── services/             # Business logic
│   │   ├── dto/                  # Data transfer objects
│   │   └── guards/               # Authentication guards
│   ├── serverless.yml            # AWS deployment config
│   └── package.json
└── README.md
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **Nest.js Team** for the scalable Node.js framework
- **Tailwind CSS** for the utility-first CSS framework
- **OpenAI** for AI capabilities
- **Vercel** for seamless frontend deployment
- **AWS** for cloud infrastructure
