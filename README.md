# BlogSpace

**BlogSpace** is a modern, full-featured blogging platform built with **Next.js 16**, **Prisma**, and **PostgreSQL**. It offers a seamless experience for readers, authors, and administrators, featuring a robust rich-text editor, role-based access control, and a responsive, high-performance UI styled with **Tailwind CSS v4** and **Shadcn UI**.

## 🚀 Key Features

*   **Modern Tech Stack**: Leveraging the latest Next.js 16 App Router for optimal performance and SEO.
*   **Role-Based Authentication**: Secure authentication system using **Better Auth** with distinct roles:
    *   **User**: Read, comment, like, and save articles.
    *   **Author**: Create and manage their own articles.
    *   **Admin**: Manage categories, users, and overall platform settings.
*   **Rich Content Editing**: Integrated **TipTap** editor for a premium writing experience with image support.
*   **Media Management**: Fast and secure file uploads handled by **UploadThing**.
*   **Detailed Analytics**: Track article views and engagement.
*   **Interactive Features**: Comments, likes, and bookmarks (saved articles).
*   **Responsive Design**: Mobile-first approach ensuring great experience on all devices.
*   **Author Application System**: Workflow for users to apply to become authors.

## 🛠️ Technology Stack

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Database**: [PostgreSQL](https://www.postgresql.org/)
*   **ORM**: [Prisma](https://www.prisma.io/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix Primitives)
*   **Authentication**: [Better Auth](https://better-auth.com/)
*   **Forms**: React Hook Form + Zod
*   **Editor**: TipTap
*   **Icons**: Lucide React

## 📂 Project Structure

The project follows a scalable and modular folder structure designed for Next.js App Router:

```
src/
├── app/                    # Next.js App Router directory
│   ├── (features)/         # Grouped feature modules (e.g., Auth)
│   │   └── auth/           # Authentication related pages/routes
│   ├── _home/              # Components specific to the Homepage
│   ├── api/                # API Routes (Backend logic)
│   ├── author/             # Author Dashboard & functionality
│   ├── blog/               # Public blog pages (Listing & Single Post)
│   ├── contact/            # Contact page
│   ├── dashboard/          # User & Admin Dashboard
│   ├── generated/          # Auto-generated files (e.g., Prisma Client)
│   ├── profile/            # User Profile management
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page (Home)
├── components/             # Reusable UI components
│   ├── ui/                 # Shadcn UI primitives (Buttons, Inputs, etc.)
│   └── ...                 # Other shared components
├── lib/                    # Utility libraries & configurations
│   ├── prisma.ts           # Prisma instantiation
│   └── utils.ts            # Helper functions
├── types/                  # TypeScript type definitions
└── utils/                  # General utility functions
```

### Organization Strategy

*   **Features Grouping**: We use Route Groups `(features)` to organize complex logic like Authentication without affecting the URL path structure.
*   **Scoped Components**: Components specific to a page (like the Home page) are kept in dedicated folders like `_home` to avoid cluttering the global `components` directory.
*   **Domain-Driven Folders**: Major sections like `dashboard`, `blog`, and `author` have their own directories in `app`, encapsulating their specific layouts and pages.

## 🏁 Getting Started

### Prerequisites

*   **Node.js** (v20 or higher recommended)
*   **PostgreSQL** database (Local or Cloud like Neon/Supabase)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Som3a74/BlogSpace.git
    cd BlogSpace
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and configure your variables:
    ```env
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blogspace"
    BETTER_AUTH_SECRET="your_generated_secret"
    BETTER_AUTH_URL="http://localhost:3000"
    # Add other necessary keys (UploadThing icons, etc.)
    ```

4.  **Database Setup:**
    Push the Prisma schema to your database:
    ```bash
    npx prisma db push
    # or if using migration workflows
    npx prisma migrate dev
    ```

5.  **Run Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📜 Scripts

*   `npm run dev`: Starts the development server.
*   `npm run build`: Builds the application for production.
*   `npm start`: Runs the built production application.
*   `npm run lint`: Runs ESLint to catch code issues.

---

Built with ❤️ by [Ahmed Ismail]