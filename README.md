# Marketplace Progress Bar App

This is a replacement for marketplace UI extension's progress bar.

## Development

This project has been migrated from Create React App to Vite for faster development and building.

### Available Scripts

- `npm run dev` or `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build
- `npm test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Run tests with coverage

### Migration Notes

- React Scripts has been replaced with Vite
- Jest has been replaced with Vitest
- The build output directory is now `dist` instead of `build`
- Environment variables must be prefixed with `VITE_` to be accessible in the client
