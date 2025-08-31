# RankGap Frontend

A modern, responsive frontend application built with Vite, React, and Tailwind CSS.

## 🛠️ Tech Stack

- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling for lightning-fast development
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework for rapid UI development
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking (if applicable)

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

## 🚀 Getting Started

### Installation

1. Clone the repository
    ```bash
    git clone https://github.com/Better-Boy/RankGap
    ```
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Building for Production

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The built files will be generated in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 📁 Project Structure

```
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── AnalyzerForm.tsx
│   │   ├── Header.tsx
│   │   └── ResultsDisplay.tsx
│   ├── index.css
│   ├── lib
│   │   └── supabase.ts
│   ├── main.tsx
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🎨 Styling

This project uses Tailwind CSS for styling. Key benefits include:

- **Utility-first approach** - Build custom designs rapidly
- **Responsive design** - Mobile-first responsive utilities
- **Dark mode support** - Built-in dark mode variants
- **Customization** - Easy to customize through `tailwind.config.js`

### Tailwind Configuration

The Tailwind configuration can be found in `tailwind.config.js`. Customize colors, spacing, fonts, and more according to your design system.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier (if configured)

## 🌐 Environment Variables

Copy the `.env.example` to `.env` file

```env
VITE_SUPABASE_URL=<supabase_url>
VITE_SUPABASE_ANON_KEY=<key>
VITE_N8N_URL=<n8n_url>
```

- `VITE_N8N_URL` - This is the webhook url

**Note:** Vite requires environment variables to be prefixed with `VITE_` to be accessible in the client-side code.

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Change port in vite.config.js or use:
npm run dev -- --port 3001
```

**Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
- Check for TypeScript errors (if using TypeScript)
- Ensure all imports are correct
- Verify environment variables are properly set

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ES6+ Features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

## 📄 License

This project is licensed under the [MIT License](../LICENSE).

---

**Happy coding! 🎉**