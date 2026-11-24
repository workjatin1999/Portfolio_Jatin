# Jatin Kumar — Digital Marketing Portfolio

Personal portfolio website for **Jatin Kumar** (Digital Marketing Enthusiast · SEO Specialist · Social Media Marketer), built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons
- **Contact Form**: EmailJS (`@emailjs/browser`) with optional `/api/contact` validation endpoint
- **Deployment**: Ready for both **GitHub Pages** and **Vercel** (connected via GitHub)

## Local Development

```bash
npm install
npm run dev
```

Runs on `http://localhost:3000`.

### Scripts

- `npm run dev` — Start development server
- `npm run build` — Build production bundle to `dist/`
- `npm run lint` — Run TypeScript type check (`tsc --noEmit`)
- `npm run preview` — Preview production build locally

## Publishing via GitHub

### Option 1: GitHub Pages (Direct Hosting from GitHub)

This repository includes `.github/workflows/deploy-pages.yml`, which installs dependencies, builds the production Vite bundle (`dist/`) with a relative base path (`VITE_BASE_PATH="./"` so it works on `<username>.github.io`, `<username>.github.io/<repo-name>/`, and custom domains), and publishes via GitHub Pages.

1. Push this project to your GitHub repository (`main` or `master` branch).
2. Open your repository on GitHub and go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Wait for the **Deploy Portfolio to GitHub Pages** workflow in the **Actions** tab to finish, then open your live GitHub Pages URL.

### Option 2: GitHub → Vercel (Auto-Deploy on Push)

1. Push this project to your GitHub repository.
2. In [Vercel](https://vercel.com), click **Add New → Project** and import your GitHub repository.
3. Vercel automatically uses `vercel.json` (`framework: vite`, `buildCommand: npm run build`, `outputDirectory: dist`, plus `/api/contact` and `/api/health` serverless functions).
4. Optional environment variables (if overriding EmailJS defaults) are listed in `.env.example`.
