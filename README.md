# Dashboard Hardin

## Overview
Dashboard Hardin is a frontend project built using the Next.js framework. It leverages TypeScript for type safety and Tailwind CSS for styling. The project is structured to support modular development and scalability, making it suitable for complex applications.

## Features
- **Next.js Framework**: Utilizes the power of Next.js for server-side rendering and static site generation.
- **TypeScript**: Ensures type safety and better developer experience.
- **Tailwind CSS**: Provides utility-first CSS for rapid UI development.
- **Modular Structure**: Organized codebase with reusable components and clear separation of concerns.

## Project Structure
The project is organized as follows:

```
app/
  globals.css       # Global CSS styles
  globals.scss      # Global SCSS styles
  layout.tsx        # Main layout component
  page.tsx          # Main page component
  providers.tsx     # Context providers
  auth/             # Authentication-related pages and components
  Component/        # Reusable components
  middleware/       # Middleware for authentication and other logic
public/
  img/              # Public assets (images, etc.)
```

## Development
### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/RSUD-ABDUL-AZIZ-UNOFFICIALLY/dashboard-hardin.git
   ```
2. Navigate to the project directory:
   ```bash
   cd dashboard-hardin
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Development Server
Start the development server with the following command:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### Building for Production
To build the project for production, run:
```bash
npm run build
```
The optimized output will be available in the `.next` directory.

### Linting and Formatting
Ensure code quality by running:
```bash
npm run lint
```

## Contribution
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and open a pull request.

## License
This project is licensed under the MIT License.
