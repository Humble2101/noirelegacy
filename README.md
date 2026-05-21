# 🖤 Noire Legacy Magazine

> Next.js 14 · TypeScript · Tailwind CSS · NextAuth · Prisma · SQLite

---

## 🚀 Setup — Run These Commands In Order

Open the terminal in VS Code (`Ctrl+`` ` ``) inside the project folder, then:

### Step 1 — Install packages
```bash
npm install
```

### Step 2 — Set up the database
```bash
npx prisma generate
npx prisma db push
```

### Step 3 — Seed the admin account
```bash
npx ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts
```

> **Windows PowerShell alternative for Step 3:**
> ```bash
> npx ts-node --compiler-options "{\"module\":\"CommonJS\"}" prisma/seed.ts
> ```

### Step 4 — Start the app
```bash
npm run dev
```

Open **http://localhost:3000** ✅

---

## 🔑 Default Admin Login
| Field | Value |
|---|---|
| Email | `admin@noirelecacy.com` |
| Password | `admin123!` |

The admin credentials are shown on the Login page for easy access during development.

---

## 📁 Project Structure

```
app/
├── page.tsx                # Home — Hero, About, Models, CTA
├── models/                 # Model roster with filtering
├── apply/                  # Model application form
├── business/               # Brand partnership tiers
├── scout/                  # Scout a model form
├── gallery/                # Magazine covers + lightbox
├── contact/                # Contact form
├── login/                  # Sign in page
├── register/               # Create account page
├── profile/                # User profile editor
├── admin/                  # Admin dashboard
└── api/
    ├── auth/[...nextauth]/ # NextAuth session handler
    ├── register/           # POST — create new account
    ├── profile/            # GET/PUT — read & update profile
    └── admin/users/        # GET/PATCH/DELETE — user management

prisma/
├── schema.prisma           # SQLite database schema
├── seed.ts                 # Creates the admin user
└── dev.db                  # Auto-created after db:push (do not commit)
```

---

## ✨ Features

| Feature | Description |
|---|---|
| Register | Create account, password hashed with bcrypt |
| Login | JWT session via NextAuth |
| Profile | Edit name, bio, location, model info, socials |
| Admin Dashboard | View/search all users, promote/demote, delete |
| Role system | USER (default) · ADMIN |
| Protected routes | Redirect to /login if not authenticated |
| SQLite | Zero config, file-based, works on Windows |

---

*© 2026 Noire Legacy Magazine. All rights reserved.*
