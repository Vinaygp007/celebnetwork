#!/bin/bash

echo "🚀 CelebNetwork Deployment Script"
echo "=================================="

# Check if required tools are installed
check_dependency() {
    if ! command -v $1 &> /dev/null; then
        echo "❌ $1 is not installed. Please install it first."
        exit 1
    else
        echo "✅ $1 is installed"
    fi
}

echo "Checking dependencies..."
check_dependency "node"
check_dependency "npm"
check_dependency "git"

# Frontend deployment
echo ""
echo "📱 Deploying Frontend to Vercel..."
echo "=================================="

# Install Vercel CLI if not already installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy frontend
echo "Deploying to Vercel..."
vercel --prod

# Backend deployment
echo ""
echo "🏗️ Deploying Backend to AWS Lambda..."
echo "====================================="

cd backend

# Install Serverless Framework if not already installed
if ! command -v serverless &> /dev/null; then
    echo "Installing Serverless Framework..."
    npm install -g serverless
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "⚠️  AWS credentials not configured."
    echo "Please run: aws configure"
    echo "Or set environment variables:"
    echo "export AWS_ACCESS_KEY_ID=your_access_key"
    echo "export AWS_SECRET_ACCESS_KEY=your_secret_key"
    exit 1
fi

# Install dependencies
echo "Installing backend dependencies..."
npm install

# Build the application
echo "Building backend..."
npm run build

# Deploy to AWS
echo "Deploying to AWS Lambda..."
serverless deploy --stage prod

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo "Frontend: Check Vercel dashboard for URL"
echo "Backend: Check AWS Lambda console for API Gateway URL"
echo ""
echo "Don't forget to:"
echo "1. Update environment variables in both platforms"
echo "2. Configure database connection"
echo "3. Set up OpenAI API key for AI features"
echo "4. Validate all endpoints"
