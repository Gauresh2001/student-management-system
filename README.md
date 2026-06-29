<div align="center">

# 🎓 Student Management System

### A modern, responsive web application for managing student records — built with React 19 & Vite.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Dexie](https://img.shields.io/badge/Dexie.js-IndexedDB-FF6384?style=for-the-badge)](https://dexie.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#-license)

</div>

---

## 📖 Overview

**Student Management System** is a clean, single-page web application that lets schools and institutions manage student records with ease. It supports the full lifecycle of a student record — **create, read, update, and delete (CRUD)** — alongside powerful search, filtering, and pagination.

Data is persisted directly in the browser using **Dexie.js (IndexedDB)**, so records survive page refreshes without needing a separate backend server. The data layer is cleanly abstracted, making it straightforward to swap in a REST API later.

---

## ✨ Features

- 📋 **Complete CRUD** — add, view, edit, and delete student records
- 🔍 **Smart search** — search by name, roll number, email, or ID (with debounced input for performance)
- 🎯 **Multi-filter support** — filter by class, section, and status
- 📄 **Pagination** — clean, paginated lists for large datasets
- ✅ **Robust form validation** — real-time validation for emails, phone numbers, names, and dates
- 💾 **Offline-ready persistence** — data stored locally in the browser via IndexedDB
- 🌙 **Dark mode ready** — styled with Tailwind's dark variants
- 📱 **Fully responsive** — works seamlessly on desktop, tablet, and mobile
- ⚡ **Fast & lightweight** — powered by Vite for instant dev startup and optimized builds

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Routing** | React Router DOM 7 |
| **Styling** | Tailwind CSS 4 |
| **Icons** | Lucide React |
| **Local Database** | Dexie.js (IndexedDB) |
| **Linting** | Oxlint |

---

## 📁 Project Structure

```
student-management/
├── public/                  # Static assets
├── src/
│   ├── api/                 # Data service layer (CRUD operations)
│   │   └── studentService.js
│   ├── components/
│   │   ├── layout/          # App shell: Sidebar, Topbar, Layout
│   │   ├── students/        # Student-specific UI (Table, Form, Filters)
│   │   └── ui/              # Reusable UI primitives (Button, Input, Modal…)
│   ├── data/                # Seed data & dropdown options
│   │   └── mockStudents.js
│   ├── db/                  # Dexie (IndexedDB) configuration
│   ├── hooks/               # Custom hooks (useStudents, useDebouncedValue)
│   ├── pages/               # Route pages (List, Add, Edit, Details, 404)
│   ├── utils/               # Validation helpers
│   ├── App.jsx              # Route definitions
│   └── main.jsx             # App entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/student-management.git

# 2. Move into the project folder
cd student-management

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **`http://localhost:5173`**.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint to check code quality |

---

## 🧭 How It Works

1. **Routing** — `App.jsx` maps each URL to a page (list, add, edit, details).
2. **Data layer** — `studentService.js` exposes `getStudents`, `getStudentById`, `createStudent`, `updateStudent`, and `deleteStudent`, all backed by Dexie/IndexedDB.
3. **Custom hooks** — `useStudents` handles fetching, loading, and error states; `useDebouncedValue` keeps the search responsive without firing on every keystroke.
4. **Validation** — `validateStudent.js` centralizes all form rules and returns clear, field-level error messages.
5. **Persistence** — On first load, the database is seeded with sample records; from then on, all changes are saved in the browser.

---

## 🗺️ Roadmap

- [ ] Connect a real backend (Spring Boot + REST API)
- [ ] User authentication & role-based access
- [ ] Bulk import/export (CSV)
- [ ] Attendance and grade tracking
- [ ] Analytics dashboard

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### ⭐ If you found this project helpful, consider giving it a star!

Made with ❤️ by **[Your Name](https://github.com/your-username)**

</div>
