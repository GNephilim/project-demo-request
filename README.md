# DemoHub - Demo Request Management System

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Material-UI](https://img.shields.io/badge/MUI-5.14.0-007fff?logo=mui&logoColor=white)](https://mui.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**A comprehensive admin dashboard for managing demo requests with advanced reporting and user management capabilities.**

[Features](#features) • [Getting Started](#getting-started) • [Architecture](#architecture) • [Tech Stack](#tech-stack)

</div>

---

## 📋 Overview

DemoHub is a full-featured demo request management system built with modern React and TypeScript. It provides an intuitive interface for managing user demos, tracking requests, generating comprehensive reports, and administering system settings.

### ✨ Key Highlights

- 🔐 **Admin Dashboard** with secure login and persistent sessions
- 👥 **Advanced User Management** with bulk operations and inline editing
- 🏢 **Department Management** with multi-select team members and sponsor roles
- 📊 **Comprehensive Reporting** with export to Excel and PDF
- 📋 **Request Configuration** for customizable demo request forms
- ⚙️ **Settings Management** for site and database configuration
- 📱 **Fully Responsive** design for all device sizes
- 🎨 **Professional UI** with Material-UI components and custom theming

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/GNephilim/project-demo-request.git
cd project-demo-request

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5175/`

### Build for Production

```bash
npm run build
```

### Type Checking

```bash
npm run tsc --noEmit
```

---

## 🎯 Features

### Public Features
- 📊 Dashboard with demo request statistics
- 📈 Real-time metrics and analytics
- 📝 Demo request submission
- 📑 Public reporting access

### Admin Features

#### Dashboard & Navigation
- Secure admin login with localStorage persistence
- Responsive navigation with dropdown menus
- Quick access to all admin sections
- Status indicators and highlights

#### User Management
- Create, read, update, delete users
- Selectable table rows with checkboxes
- Inline dropdown editing (Department, Role)
- Bulk operations (change role/department, delete multiple)
- Search and filtering capabilities
- 12+ mock users with varied roles

#### Department Management
- Card-based interface with visual organization
- Multi-select autocomplete for team members
- Sponsor role assignment with special permissions
- Dynamic "+X more" display for large teams
- Add, edit, and delete departments
- 4 pre-configured departments

#### Request Configuration
- Manage form fields and options
- Card-based CRUD interface
- Customize available request types
- Real-time updates

#### Settings Management
- Site-wide configuration
- Database connection settings
- System preferences
- Performance monitoring

#### Reporting
- **Three integrated report types**:
  1. Demo Requests Report - Track all demo requests with details
  2. User Activity Report - Monitor user engagement and statistics
  3. Department Metrics Report - Analyze department performance
- Department-based filtering
- Date range selection
- Export to Excel (CSV format)
- Export to PDF (formatted print layout)

#### System Information
- System statistics and version info
- Environment details
- Database connection status
- API endpoint information

---

## 📊 Mock Data

The application comes with realistic mock data:
- **12 Users** - Various roles (Member/Sponsor) across multiple departments
- **4 Departments** - With team members and different sizes
- **8 Demo Requests** - With status, dates, and attendee info
- **8 User Activity Records** - Login counts and request metrics

---

## 🏗️ Architecture

### Project Structure

```
src/
├── components/
│   ├── TopNavigation.tsx       # Header and navigation menus
│   ├── StatsSection.tsx        # Dashboard statistics
│   ├── DemoTabs.tsx            # Demo request tabs
│   ├── AdminLogin.tsx          # Login modal
│   ├── RequestDemoModal.tsx    # Demo request form
│   └── ...
├── sections/
│   ├── AdminDashboardContent.tsx      # Admin overview
│   ├── AdminSections.tsx              # All admin components
│   ├── SystemInformationSection.tsx   # System info
│   └── ...
├── App.tsx                     # Main router and state management
├── theme.ts                    # Material-UI theme configuration
└── main.tsx                    # Application entry point
```

### State Management
- React hooks (useState, useEffect) for component state
- localStorage for admin login persistence
- Centralized routing in App.tsx
- Modal management for modals

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|---------------|
| **Frontend Framework** | React 19.2.0, TypeScript 5.9.3 |
| **Build Tool** | Vite 7.2.4 |
| **UI Framework** | Material-UI 5.14.0 |
| **Table Library** | TanStack React Table 8.21.3 |
| **Icons** | Material-UI Icons |
| **Styling** | Material-UI sx prop system |
| **Code Quality** | TypeScript (strict mode), ESLint |

---

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
```

---

## 🔐 Security Features

- Secure admin login with session persistence
- Role-based access control
- TypeScript strict mode for type safety
- Input validation on all forms
- XSS protection through React's built-in escaping

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">

Made with ❤️ using React & TypeScript

[⬆ Back to top](#demohub---demo-request-management-system)

</div>
