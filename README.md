# M4r1os Portfolio

Personal portfolio website for Marios, built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

Live site: []()

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Development](#development)
- [Scripts](#scripts)
- [Customization](#customization)
- [Contact Form](#contact-form)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

## Overview

This portfolio presents Marios' work, experience, and contact information in a clean single-page flow with animated visuals, theme switching, and a responsive layout.

## Features

- Animated hero text with typed roles.
- Dark and light theme support.
- Accent color switching.
- Particle background and subtle motion.
- Responsive navigation and mobile-friendly sections.
- Projects, experience, and contact pages.
- EmailJS contact form.
- SEO metadata and Open Graph support.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Typed.js
- tsparticles

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) after the dev server starts.

## Scripts

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint.

## Customization

| What | Where |
|---|---|
| Home content and social links | `src/app/page.tsx` |
| About section | `src/app/about/page.tsx` |
| Projects | `src/app/projects/page.tsx` |
| Experience | `src/app/experience/page.tsx` |
| Contact form | `src/app/contact/page.tsx` |
| SEO metadata | `src/app/layout.tsx` |
| Theme and accent logic | `src/components/ThemeProvider.tsx` and `src/components/AccentProvider.tsx` |

## Contact Form

The contact form uses **SMTP** (Gmail or any email provider) for email delivery.

### Setup Steps:

1. **Create `.env.local`** in project root with your SMTP credentials:
   ```bash
   # Email / SMTP
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   SMTP_FROM="Your Name <your-email@gmail.com>"
   EMAIL_TO="recipient@example.com"
   ```


2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Restart dev server** (`npm run dev`)

Done! Form submissions will now send emails via SMTP.

Build the app with `npm run build` and deploy it to a Next.js-compatible host such as Vercel.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── experience/page.tsx
│   ├── contact/page.tsx
│   └── not-found.tsx
└── components/
    ├── ThemeProvider.tsx
    ├── AccentProvider.tsx
    ├── Navbar.tsx
    ├── ParticlesBackground.tsx
    └── Footer.tsx
```
