# Contributing to Pandai Games

Thank you for your interest in contributing to Pandai Games! We welcome contributions from the community.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/pandai-games-webpage.git
   cd pandai-games-webpage
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── App.jsx     # Main application component
│   │   ├── App.css     # Styling with glassmorphism effects
│   │   └── main.jsx    # Application entry point
│   └── package.json
├── server/              # Express backend
│   ├── index.js        # API server with notification system
│   └── package.json
├── .github/
│   ├── workflows/      # GitHub Actions CI/CD
│   └── copilot-instructions.md
└── package.json        # Workspace configuration
```

## 🔧 Development Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test them:
   ```bash
   npm run dev          # Start development servers
   npm run build        # Test production build
   ```

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

## 🎨 Code Style Guidelines

### Frontend (React)
- Use functional components with hooks
- Follow the existing glassmorphism design patterns
- Ensure responsive design for all screen sizes
- Use meaningful component and variable names

### Backend (Node.js)
- Use Express.js best practices
- Implement proper error handling
- Follow RESTful API conventions
- Add appropriate validation for all inputs

### CSS
- Maintain the glassmorphism design theme
- Use CSS custom properties for consistent colors
- Ensure smooth animations and transitions
- Test responsive design on multiple screen sizes

## 🧪 Testing

- Test all features manually in both development and production builds
- Verify the email notification system works correctly
- Check responsive design on various devices
- Ensure all navigation and interactions work smoothly

## 📝 Commit Message Convention

Use conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or modifying tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add new game category filter
fix: resolve email validation issue
docs: update deployment instructions
style: improve button hover animations
```

## 🐛 Reporting Issues

When reporting issues, please include:
- Operating system and browser information
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Console error messages (if any)

## 💡 Feature Requests

We welcome feature requests! Please:
- Check if the feature already exists or is planned
- Describe the use case and benefits
- Provide mockups or examples if possible
- Consider implementing it yourself and submitting a PR

## 🔒 Security

If you discover a security vulnerability, please:
- **Do not** open a public issue
- Email us privately with details
- Allow time for us to address the issue before disclosure

## 📄 License

By contributing to Pandai Games, you agree that your contributions will be licensed under the same license as the project.

## 🤝 Community

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Have fun building great gaming experiences!

Thank you for contributing to Pandai Games! 🎮
