# 🐼 Pandai Games Website

A modern, full-stack gaming platform featuring beautiful glassmorphism design and game launch notifications.

## ✨ Features

- **Modern React Frontend** with glassmorphism UI design
- **Node.js/Express Backend** with API endpoints
- **Email Notification System** for game launch updates
- **Responsive Design** that works on all devices
- **Professional About Page** with company mission and values
- **Coming Soon Games Section** with subscription functionality

## 🚀 Quick Start

### Development Mode
```bash
# Install dependencies
npm install

# Start both client and server
npm run dev

# Or start individually:
npm run dev:client    # Frontend on http://localhost:5173
npm run dev:server    # Backend on http://localhost:3001
```

### Production Build
```bash
# Build the client
npm run build --workspace client

# Start the server (serves both client build and API)
npm run dev:server

# Access at http://localhost:3001
```

## 🏗️ Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── App.jsx  # Main application
│   │   └── App.css  # Glassmorphism styling
│   └── dist/        # Build output
├── server/          # Express backend
│   └── index.js     # API server
└── package.json     # Workspace configuration
```

## 🎨 Design Features

- **Glassmorphism Effects**: Modern blur and transparency effects
- **Gradient Backgrounds**: Animated purple/blue gradients
- **Smooth Animations**: Hover effects and transitions
- **Mobile Responsive**: Adapts to all screen sizes

## 📧 Notification System

Users can subscribe to game launch notifications via email:
- Frontend validation and user feedback
- Backend API with duplicate prevention
- Professional success/error messaging

## 🌐 Deployment Ready

The application is configured for easy deployment to:
- **Vercel/Netlify**: For static hosting (client only)
- **Heroku/Render**: For full-stack hosting (client + server)
- **VPS/Cloud**: For custom server deployment

## 📄 License

All rights reserved - Pandai Games © 2025
