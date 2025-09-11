# Offer Letter Generator

A simple, extensible offer letter generator built with Next.js and Tailwind CSS. The app helps HR teams create, preview, export, send, and track offer letters. This README describes how to run the project locally, a recommended environment file, developer tips, and next steps for a production release.

> Short summary
>
> * Next.js app using the app directory.
> * Tailwind CSS for styling.
> * Provides templates, preview, PDF/DOCX export, and send flows.
>
> This repo is intended for developers. If you want to evaluate the product quickly, add a `/demo` route to render sample data without authentication.

---

## Table of contents

* [Demo](#demo)
* [Status](#status)
* [Prerequisites](#prerequisites)
* [Quick start](#quick-start)
* [Recommended .env example](#recommended-env-example)
* [Scripts](#scripts)
* [Project structure](#project-structure)
* [Key features](#key-features)
* [Adding a safe demo route](#adding-a-safe-demo-route)
* [PDFs and exports](#pdfs-and-exports)
* [Security checklist](#security-checklist)
* [Testing and CI suggestions](#testing-and-ci-suggestions)
* [Contributing](#contributing)
* [Notes and next steps](#notes-and-next-steps)
* [License](#license)

---

## Demo

If you deployed the project to Vercel the public app may require authentication. To let evaluators try your UI without creating accounts, add a demo route that renders components with sample data. See the "Adding a safe demo route" section below.

## Status

* Working prototype. Core flows implemented but there are gaps around PDF robustness, audit logging, and the public demo experience.

## Prerequisites

* Node.js 18 or later
* npm 9 or later or yarn
* A PostgreSQL, MySQL, or MongoDB instance if you plan to enable persistent storage
* (Optional) An SMTP provider or SendGrid for email sending
* (Optional) S3 or an object storage provider to store generated PDFs

## Quick start

1. Clone the repo

```bash
git clone https://github.com/harshit0808sharma/offer-letter-generator.git
cd offer-letter-generator
```

2. Install dependencies

```bash
npm install
# or
# yarn install
```

3. Create your env file

* Copy the example below to `.env.local` and update values.

4. Run the dev server

```bash
npm run dev
# open http://localhost:3000
```

5. Optional - build and run production locally

```bash
npm run build
npm start
```

## Recommended .env example

Create a file named `.env.example` in the repo root and keep real secrets out of version control. Update names below to match the variables your code actually reads.

```
# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NODE_ENV=development

# Database (example)
DATABASE_URL=postgres://user:password@localhost:5432/offer_db

# Authentication (if using NextAuth or similar)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Email (SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-pass
FROM_EMAIL=offer@example.com

# SendGrid (optional)
SENDGRID_API_KEY=SG.xxxxxx

# Object storage (optional)
S3_BUCKET=my-bucket
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=abc
S3_SECRET_ACCESS_KEY=xyz

# Third party services
SENTRY_DSN=

# Feature flags
ENABLE_DEMO=true
```

> Note: Update the variable names to match the code in this repository. Do not commit secrets. Use Vercel's dashboard to store production secrets.

## Scripts

Common scripts you might have in `package.json`:

* `dev` - start development server
* `build` - production build
* `start` - start production server
* `lint` - run ESLint
* `test` - run tests

If these scripts are missing, add them to `package.json`.

## Project structure

A typical layout for this project looks like this:

```
/app                - Next.js app router pages
/components         - Reusable components (OfferEditor, TemplateList, Preview)
/lib                - Utilities (pdf generation, template renderer, email)
/pages/api          - API routes for sending letters and webhook endpoints
/public             - Static assets and sample templates
/styles             - global styles and Tailwind config
/tests              - unit and integration tests
```

Adjust paths to match the current repo layout.

## Key features

* Template editor with merge fields like `{{candidate_name}}` and `{{start_date}}`.
* Preview mode with test data.
* PDF and DOCX export for sending or archiving.
* Email sending and basic tracking.
* Candidate acceptance flow with timestamp and signed PDF storage.

## Adding a safe demo route

To let people try the app without creating accounts, add a demo route that mounts the editor and supplies sample data. This route should not create or mutate real data. Example for the app router:

```jsx
// app/demo/page.tsx
import dynamic from 'next/dynamic';
const OfferEditor = dynamic(() => import('@/components/OfferEditor'), { ssr: false });

const sample = {
  candidateName: 'Test Candidate',
  title: 'Senior Frontend Engineer',
  salary: '₹18,00,000 per annum',
  startDate: '2025-10-01',
  clauses: [{ id: 1, text: 'This is a sample clause. Replace in production.' }]
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Demo - Offer Editor</h1>
        <OfferEditor initialData={sample} demo />
      </div>
    </div>
  );
}
```

Make this route gated by a feature flag in production if you want to disable it later.

## PDFs and exports

A few recommendations for robust exports:

* Use server-side rendering with Puppeteer for pixel-perfect PDFs when layout fidelity matters.
* For DOCX, use a templating library such as `docx` or generate a simple HTML-to-docx server-side transform.
* Test exports with long candidate names, long clauses, and special characters such as international currency symbols.

## Security checklist

* Never commit secrets. Add `.env.local` to `.gitignore`.
* Enable role-based access control. Keep signers, admins, and recruiters separate.
* Encrypt sensitive fields at rest or minimize retention of salary and signature data.
* Implement audit logs: who created, edited, sent, and accepted an offer with timestamps.
* Validate and sanitize any templated input to avoid injection in rendered documents.
* Use HTTPS in production and set appropriate cookies flags (`Secure`, `HttpOnly`, `SameSite`).

## Testing and CI suggestions

* Add unit tests for the template renderer and CSV bulk generation.
* Add an integration test for the send-flow using a mocked SMTP provider.
* Configure a GitHub Actions workflow to run lint and tests on pull requests.

## Contributing

Contributions are welcome. If you plan to submit a PR, please:

1. Open an issue describing the problem or feature.
2. Create a branch off `main` named `feature/your-feature` or `fix/issue-number`.
3. Add tests and run lint.
4. Open a PR with a clear description and screenshots.

## Notes and next steps

Suggested short-term priorities:

1. Add a `/demo` route so reviewers can test the product without an account.
2. Add an `.env.example` file and a short README section with required env names.
3. Add basic audit logging and a sample schema for `offers`.
4. Add CI for lint and tests.

If you want, I can create the `.env.example` file or generate a PR with the demo route and README changes.

## License

This project is open source. Add a `LICENSE` file to indicate terms. A common choice is the MIT license.