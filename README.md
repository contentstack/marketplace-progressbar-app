# Marketplace Progress Bar App

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5.2-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646CFF.svg)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.14.2-0081CB.svg)](https://mui.com/)

A modern, customizable progress bar component designed for Contentstack marketplace applications. This app provides an intuitive slider interface that allows Contentstack users (developers, content managers, and content creators) to set and track progress values within their content entries using a custom field.

## 🚀 Getting Started

### For Contentstack Users

This app is designed to be installed and used within your Contentstack stack as a custom field. Here's how to get started:

#### Installation in Contentstack

1. **Install from Marketplace**

   - Navigate to your Contentstack stack
   - Go to the Marketplace section
   - Search for "Progress Bar App" or install directly from the marketplace
   - Follow the installation prompts

2. **Add to Content Type**

   - Go to your Content Types
   - Edit the content type where you want to add progress tracking
   - Add a new custom field
   - Select "Progress Bar App" as the field type
   - Configure the field settings as needed

3. **Start Using**
   - Create or edit content entries
   - Use the progress bar slider to set completion percentages
   - Values are automatically saved with your content

### For Developers (Local Development)

If you're a developer looking to contribute or customize this app:

#### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Contentstack account (for testing)

#### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/contentstack-expert-services/marketplace-progressbar-app.git
   cd marketplace-progressbar-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application running.

## 🛠️ Development

This project has been migrated from Create React App to Vite for faster development and building. The development environment includes:

- **Hot Module Replacement (HMR)** for instant updates
- **TypeScript** for type safety
- **ESLint** and **Prettier** for code quality
- **Husky** for git hooks and pre-commit validation

### Available Scripts

#### Development

- `npm run dev` or `npm start` - Start the development server with HMR
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build locally

#### Testing

- `npm test` - Run tests in watch mode with Vitest
- `npm run test:ui` - Run tests with Vitest UI interface
- `npm run test:run` - Run tests once (CI mode)
- `npm run test:coverage` - Run tests with coverage report

#### E2E Testing

- `npm run test:chrome` - Run Playwright tests in Chrome
- `npm run test:firefox` - Run Playwright tests in Firefox
- `npm run test:safari` - Run Playwright tests in Safari
- `npm run test:chrome-headed` - Run Playwright tests in Chrome (headed mode)
- `npm run show-report` - Show Playwright test report

#### Code Quality

- `npm run prettify` - Format code with Prettier
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run precommit` - Run prettify and lint:fix (used in git hooks)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   └── ErrorBoundary/   # Error boundary component
├── containers/          # Main application containers
│   ├── App/            # Main app component and routing
│   └── CustomField/    # Progress bar custom field component
├── hooks/              # Custom React hooks
│   └── useJsErrorTracker.tsx
├── common/             # Shared utilities and types
│   └── types/         # TypeScript type definitions
└── test/              # Test setup and utilities
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory for local development:

```env
# Add your environment variables here
VITE_APP_TITLE=Marketplace Progress Bar App
```

### Vite Configuration

The project uses Vite with the following key configurations:

- **Port**: 3000 (configurable in `vite.config.ts`)
- **Source Maps**: Enabled for better debugging
- **React Plugin**: Configured for JSX support

## 🧪 Testing

### Unit Testing

- **Framework**: Vitest
- **Testing Library**: React Testing Library
- **Coverage**: Istanbul for coverage reports

### E2E Testing

- **Framework**: Playwright
- **Browsers**: Chrome, Firefox, Safari
- **Configuration**: `playwright.config.ts`

### Running Tests

```bash
# Run all unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:chrome
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment.

## 📖 How to Use

### For Content Managers and Content Creators

Once the Progress Bar App is installed in your Contentstack stack:

1. **Creating Content with Progress Tracking**

   - Navigate to your content entries
   - Create a new entry or edit an existing one
   - Find the Progress Bar field in your content form
   - Use the slider to set the completion percentage (0-100%)
   - The value is automatically saved when you save the content

2. **Understanding the Progress Bar**

   - The slider shows a visual representation of completion
   - Values range from 0% (not started) to 100% (completed)
   - The current value is displayed above the slider
   - Changes are saved automatically as you move the slider

3. **Best Practices**
   - Use consistent progress values across your team
   - Update progress regularly to maintain accurate tracking
   - Consider using this for project milestones, content completion, or task tracking

### For Developers

#### Deployment to Contentstack Marketplace

1. Build the application:

   ```bash
   npm run build
   ```

2. Upload the `dist/` folder contents to your Contentstack marketplace app

3. Configure the app in your Contentstack stack

#### Environment-Specific Builds

For different environments, you can create environment-specific build scripts:

```bash
# Development build
npm run build:dev

# Staging build
npm run build:staging

# Production build
npm run build:prod
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch** following the naming convention:

   ```
   feature/ESI-XXXX-descriptive-name
   bugfix/ESI-XXXX-descriptive-name
   hotfix/ESI-XXXX-descriptive-name
   ```

3. **Make your changes**
4. **Run tests and linting**:

   ```bash
   npm run precommit
   ```

5. **Commit your changes** with a clear commit message
6. **Push to your fork** and create a Pull Request

### Code Standards

- Follow the existing code style (enforced by ESLint and Prettier)
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Branch Naming Convention

Branches must follow this pattern:

```
^(feature|bugfix|hotfix)/ESI-[0-9]+-[a-z0-9-]{5,30}$
```

Examples:

- `feature/ESI-1234-add-new-progress-theme`
- `bugfix/ESI-5678-fix-slider-value-persistence`
- `hotfix/ESI-9999-critical-security-fix`

## 🐛 Troubleshooting

### For Developers

**Issue**: Development server won't start

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Tests failing

```bash
# Clear test cache
npm run test:run -- --reporter=verbose
```

**Issue**: Build errors

```bash
# Check TypeScript errors
npx tsc --noEmit
```

## 📞 Support

For support and questions:

- Create an [issue](https://github.com/contentstack/marketplace-progressbar-app/issues)
- Check the [documentation](https://www.contentstack.com/docs/developers/marketplace-apps/progress-bar)

---

**Made with ❤️ by the Contentstack team**
