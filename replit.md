# She Can Foundation Intern Fundraising Dashboard

## Overview

This is a full-stack web application designed for the She Can Foundation's intern fundraising program. The platform enables interns to track their fundraising progress, manage referrals, view leaderboards, and monitor their achievements in a comprehensive dashboard interface. The application focuses on empowering women through technology while providing tools for effective fundraising campaign management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context API for authentication state and TanStack Query for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for REST API endpoints
- **Language**: TypeScript for end-to-end type safety
- **API Design**: RESTful endpoints for interns, activities, and achievements
- **Data Storage**: In-memory storage with interface abstraction for easy database migration
- **Authentication**: Simple email-based authentication (suitable for intern program scope)

### Database Design
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema**: Three main entities - interns, activities, and achievements with proper relationships
- **Migration**: Drizzle Kit for database schema management and migrations

### Styling and Design System
- **CSS Framework**: Tailwind CSS with custom CSS variables for theming
- **Component Library**: Shadcn/ui providing consistent, accessible components
- **Design Tokens**: Custom She Can Foundation brand colors (orange primary, navy secondary)
- **Responsive Design**: Mobile-first approach with responsive breakpoints

### Development and Build Process
- **Development Server**: Vite dev server with Hot Module Replacement
- **Production Build**: Vite for frontend bundling, esbuild for backend compilation
- **Type Checking**: TypeScript compiler for static type analysis
- **Code Quality**: ESNext modules with strict TypeScript configuration

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **TypeScript**: Full TypeScript support across frontend and backend
- **Node.js Runtime**: Express.js for server framework

### Database and ORM
- **Neon Database**: PostgreSQL-compatible serverless database (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database operations (drizzle-orm, drizzle-zod)
- **Database Validation**: Zod for schema validation and type inference

### UI and Styling
- **Radix UI**: Comprehensive accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Lucide React**: Consistent icon library for UI elements
- **Class Variance Authority**: Component variant management

### Development Tools
- **Vite**: Build tool and development server
- **ESBuild**: JavaScript/TypeScript bundler for production
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation

### Third-party Integrations
- **Date Utilities**: date-fns for date manipulation and formatting
- **Session Management**: connect-pg-simple for PostgreSQL session storage
- **Development Enhancement**: Replit-specific plugins for development environment optimization