# Grwolyx

Grwolyx is a multi-business daily reporting workspace for business owners and their appointed business heads.

## Features

- Owner registration and credential sign-in with Auth.js JWT sessions.
- Business creation, KPI configuration, editing, archiving, and head invitations.
- 48-hour invitation tokens stored as SHA-256 hashes.
- Business-head access scoped to assigned businesses.
- Daily KPI submissions with date backfill, validation, notes, and upsert protection.
- Owner overview, per-business charts, submission status, and searchable report history.
- Dark charcoal and golden-yellow responsive interface using the supplied brand logo.

## Local setup

1. Install Node.js 20.9 or later.
2. Copy .env.example to .env.local and set MONGODB_URI and AUTH_SECRET.
3. Set RESEND_API_KEY and a verified RESEND_FROM address to send invitation emails. In development, invitations show a local acceptance link when email credentials are not configured.
4. Run npm install, then npm run dev.

## Environment variables

| Variable | Purpose |
| --- | --- |
| MONGODB_URI | MongoDB connection string |
| AUTH_SECRET | Secret used to sign Auth.js sessions |
| AUTH_URL | Application base URL |
| RESEND_API_KEY | Resend API key for invitation email |
| RESEND_FROM | Verified sender address |

All protected API routes resolve the session and query ownership or business-head membership from MongoDB. Client-provided business IDs are never sufficient for access.
