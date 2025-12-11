# Tic-Tac-Toe with Brain.js

A React-based Tic-Tac-Toe game that uses machine learning (brain.js) to play against you.

## Features

- Interactive Tic-Tac-Toe game
- AI opponent powered by brain.js neural network
- Move history with ability to jump back to previous moves
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

Note: This project uses `.npmrc` configuration to handle native dependencies in brain.js.

### Available Scripts

#### `npm start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `npm test`

Launches the test runner in interactive watch mode.

#### `npm run build`

Builds the app for production to the `build` folder and copies it to `docs` folder for GitHub Pages deployment.

#### `npm run train`

Trains the neural network with the data from `createTrainingData.js`.

## Testing

The project includes comprehensive test coverage:

- **App.test.js**: Tests for the Game component and calculateWinner logic (15 tests)
- **ml.test.js**: Tests for the ML decision-making function (4 tests)

Run tests with:
```bash
npm test
```

## Deployment

The project is configured to deploy to GitHub Pages. After running `npm run build`, the production files are copied to the `docs` folder.

## Technology Stack

- **React 17.0.2**: UI framework
- **brain.js 2.0.0-beta.24**: Neural network library
- **react-scripts 5.0.1**: Build tooling
- **@testing-library**: Testing utilities

## Recent Updates (December 2025)

### Dependencies Updated
- React: 16.13.1 → 17.0.2
- React-DOM: 16.13.1 → 17.0.2
- react-scripts: 3.4.1 → 5.0.1
- brain.js: 2.0.0-alpha.12 → 2.0.0-beta.24
- @testing-library/jest-dom: 4.2.4 → 5.17.0
- @testing-library/react: 9.3.2 → 12.1.5
- @testing-library/user-event: 7.1.2 → 14.5.2

### New Features
- Added comprehensive test suite (20 tests)
- Improved build configuration
- Added .npmrc for better dependency management

## License

This project is open source and available under the MIT License.
