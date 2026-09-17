# Pranoti Varpe — Portfolio

Personal portfolio of **Pranoti Varpe**, a full-stack software developer based in Pune, India.

**Live site:** https://portfolio-mu-ebon-31.vercel.app/

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19 and TypeScript
- Tailwind CSS v4 for styling, with light and dark themes
- [Motion](https://motion.dev) for animation
- Deployed on Vercel

## Features

- A procedurally grown forest hero (canvas) with fireflies, parallax and a day/night theme
- Skills shown as a root system connecting each skill to the projects that use it
- Experience shown as growth rings in a tree cross-section
- Project pages with a feature list, request flow and stack breakdown
- A contact form backed by Resend, and a Ctrl/Cmd+K "trail map" to jump anywhere
- Respects reduced-motion settings; checked with axe for WCAG A/AA issues

## How it's organized

All site content (bio, skills, experience, projects, education, certifications) lives in one typed file, `src/data/resume.ts`. The components in `src/components/` only render that data, so updating the site usually means editing a single file.

```
src/
├── app/            # pages, project pages, contact API, metadata, OG image, sitemap
├── components/     # one component per section, plus the trail map and vine
├── lib/            # forest, specimen and leaf generators; skill graph; theme
└── data/resume.ts  # all content
public/             # profile photo and resume PDF
```

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Contact form setup

1. Create a free account at [resend.com](https://resend.com) and make an API key.
2. In Vercel, open the project → Settings → Environment Variables and add `RESEND_API_KEY`.
3. Redeploy. Messages arrive at the email in `src/data/resume.ts`.

Until your own domain is verified in Resend, the form uses Resend's test sender, which only delivers to the email address on your Resend account. See `.env.example` for the optional settings. Without a key, the form tells visitors to email you directly.

## Contact

- Email: pranoti17501@gmail.com
- LinkedIn: https://www.linkedin.com/in/pranoti-varpe/
- GitHub: https://github.com/pranotivarpe
