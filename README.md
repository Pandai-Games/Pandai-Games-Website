# 🐼 Pandai Games Website

A modern, full-stack gaming platform featuring beautiful glassmorphism design and game launch notifications.

![GitHub](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-18%2B-green.svg)
![React](https://img.shields.io/badge/react-18%2B-blue.svg)

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

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Documentation**: See individual markdown files in the repository
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Join community discussions (if enabled)

---

**Pandai Games** © 2025 - Crafted with ❤️ for the gaming community
