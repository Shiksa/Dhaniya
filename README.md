# 🚀 Dhaniya – Modern Support Ticket Management System

Dhaniya is a modern full-stack Support Ticket Management System Just like JIRA built using the latest frontend and backend technologies.  
The application is designed to simulate a real-world enterprise ticketing workflow with scalable architecture, infinite scrolling, advanced state management, schema validation, and responsive UI/UX.

This project was developed as part of a frontend engineering assignment to demonstrate modern frontend development practices, clean architecture, API integration, and production-level coding standards.

---

# 🌐 Live Demo

🔗 Live Application:   https://dhaniya.vercel.app/tickets


---

# 📖 Project Overview

The system allows users to:

- Create support tickets
- Manage ticket lifecycle
- Update ticket status & priority
- Search, filter, and sort tickets
- Load tickets dynamically with infinite scrolling
- Perform CRUD operations with real-time UI updates
- Handle validation and API states professionally

The application follows modern industry-standard development patterns including:

- Server-state management
- Type-safe validation
- Optimistic updates
- Modular architecture
- Responsive UI design
- Scalable folder structure

---

# ✨ Key Features

# 🎫 Ticket Management

Users can:

- Create new support tickets
- View ticket details
- Update ticket information
- Delete existing tickets
- Assign tickets to team members
- Manage ticket status and priority levels

---

# 🔄 Infinite Scrolling System

Implemented using:

- `TanStack Query v5`
- `useInfiniteQuery`
- `Framer Motion useScroll`

Features include:

- Dynamic page fetching
- Automatic scroll detection
- Smooth infinite loading
- End-of-results handling
- Pagination reset on filter changes

---

# 🔍 Advanced Search / Filter / Sorting

The tickets page supports:

## Search

- Debounced search input
- Search tickets by title
- Optimized API requests

## Filter

Filter tickets by:

- Open
- In Progress
- Resolved

## Sorting

Sort tickets by:

- Latest created
- Oldest created

Whenever search/filter/sort changes:

- Pagination resets automatically
- Fresh data gets refetched
- UI remains synchronized

---

# 🧠 Form Handling & Validation

All forms are built using:

- React Hook Form
- Zod Validation
- Zod Resolver

Validation Features:

- Real-time validation
- Field-level error messages
- Disabled submit during API calls
- Preserved form state on errors
- Type-safe form handling

---

# ⚡ Optimized API State Management

Powered by:

- TanStack Query v5

Capabilities:

- Query caching
- Background refetching
- Query invalidation
- Optimistic updates
- Automatic synchronization
- Error retry handling

---

# 🎨 Modern UI/UX

The application includes:

- Responsive layout
- Skeleton loading screens
- Empty states
- Retry states
- Smooth animations
- Toast notifications
- Clean and modern interface
- Mobile-friendly experience

---

# 🛠️ Tech Stack

# Frontend Technologies

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animation & scroll detection |
| React Hook Form | Form handling |
| Zod | Schema validation |
| TanStack Query v5 | Server-state management |
| Shadcn/UI | Reusable UI components |
| date-fns | Date formatting |

---

# Backend Technologies

| Technology | Purpose |
|---|---|
| Next.js API Routes | Backend APIs |
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB ODM |

---

# ⚙️ Development Tools

| Tool | Purpose |
|---|---|
| Bun Runtime | Fast package manager/runtime |
| ESLint | Code quality |
| Prettier | Code formatting |

---

# 📂 Folder Structure

```bash
src/
│
├── app/
│   ├── api/
│   │   └── tickets/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   │
│   ├── tickets/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   └── layout.tsx
│
├── components/
├── hooks/
├── services/
├── schemas/
├── types/
├── lib/
└── utils/
```

---

# 📡 API Endpoints

# Get All Tickets

```http
GET /api/tickets
```

Fetch paginated tickets with support for:

- Search
- Filter
- Sorting
- Infinite scrolling

---

# Create Ticket

```http
POST /api/tickets
```

Creates a new support ticket.

---

# Get Single Ticket

```http
GET /api/tickets/:id
```

Fetch detailed information for a specific ticket.

---

# Update Ticket

```http
PATCH /api/tickets/:id
```

Updates ticket information dynamically.

---

# Delete Ticket

```http
DELETE /api/tickets/:id
```

Deletes a ticket permanently.

---

# 🧾 Ticket Data Model

```ts
type TicketStatus = "open" | "in_progress" | "resolved";

type Ticket = {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  updatedAt: string;
  assignee?: string;
};
```

---

# 🧪 Validation Rules

| Field | Validation |
|---|---|
| title | Required, minimum 5, maximum 80 characters |
| description | Required, minimum 20 characters |
| status | Required |
| priority | Required (1–5) |
| assignee | Optional, minimum 2 characters |

---

# ⚙️ Installation Guide

# 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/dhaniya-support-ticket-system.git
```

---

# 2️⃣ Move Into Project Directory

```bash
cd dhaniya-support-ticket-system
```

---

# 3️⃣ Install Dependencies

Using Bun Runtime:

```bash
bun install
```

---

# 4️⃣ Setup Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
```

---

# 5️⃣ Run Development Server

```bash
bun run dev
```

Application will start at:

```bash
http://localhost:3000
```

---

# 🚀 Production Build

```bash
bun run build
```

---

# ☁️ Deployment

Recommended Deployment Platform:

- Vercel

Recommended Database Hosting:

- MongoDB Atlas

---

# 📸 Screenshots

## 🏠 Tickets List Page

_Add screenshot here_

---

## 🎫 Ticket Details Page

_Add screenshot here_

---

## ➕ Create Ticket Form

_Add screenshot here_

---

## ✏️ Edit Ticket Modal

_Add screenshot here_

---

# 🏗️ Architecture Highlights

This project follows modern scalable architecture principles:

## ✔️ Modular Design

- Reusable components
- Separate business logic
- Clean API layer

## ✔️ Type Safety

- Full TypeScript support
- Zod schema validation

## ✔️ State Management

- Efficient server-state handling
- Optimized caching strategy

## ✔️ Scalability

- Organized folder structure
- Separation of concerns
- Maintainable codebase

---

# 🎯 Assignment Requirements Covered

✅ Infinite Scrolling  
✅ Query Pagination  
✅ Search Functionality  
✅ Filtering System  
✅ Sorting System  
✅ CRUD Operations  
✅ Form Validation  
✅ Error Handling  
✅ Loading States  
✅ Empty States  
✅ Backend API Development  
✅ MongoDB Integration  
✅ Responsive UI  
✅ Framer Motion Scroll Detection  
✅ TanStack Query Integration  

---

# 👨‍💻 Author

# Sayantan Pakhira

Frontend & Full Stack Developer

## Skills

- React.js
- Next.js
- TypeScript
- Node.js
- MongoDB
- Tailwind CSS
- TanStack Query

---

# 📬 Contact

📧 Email: shiksayantanpakhira74@gmail.com  
🐙 GitHub: https://github.com/Shiksa

---

# 📄 License

This project is developed for educational and assignment purposes only.

---

# 🙏 Acknowledgements

Special thanks to:

- Next.js
- React
- TanStack Query
- React Hook Form
- Zod
- Framer Motion
- MongoDB Atlas
- Tailwind CSS
- Shadcn/UI

for providing the amazing ecosystem used in this project.
