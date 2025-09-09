# Alma Leads - Immigration Case Management System

A modern Next.js application for managing immigration case leads with a public assessment form and internal admin dashboard.

## 🚀 Features

### Public Features

- **Assessment Form**: Public form for prospects to submit immigration case information
- **File Upload**: Resume/CV upload with validation
- **Form Validation**: Comprehensive client and server-side validation
- **Thank You Page**: Confirmation page after successful submission

### Admin Features

- **Protected Dashboard**: Authentication-protected admin interface
- **Leads Management**: View, search, filter, and manage leads
- **Status Management**: Update lead status (PENDING ↔ REACHED_OUT)
- **File Downloads**: Download submitted resumes
- **Responsive Design**: Works on desktop and mobile devices

### Technical Features

- **Next.js 14**: Latest version with App Router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Modern styling with Shadcn/ui components
- **JsonForms**: Configuration-driven form system
- **Zustand**: Lightweight state management
- **Unit Tests**: Comprehensive test coverage
- **API Routes**: Full CRUD operations for leads

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **State Management**: Zustand
- **Form Management**: JsonForms
- **Testing**: Jest, React Testing Library
- **File Handling**: Next.js API routes with local storage

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd alma-leads
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

````

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
````

## 📁 Project Structure

```
alma-leads/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── assessment/        # Public assessment pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── admin-sidebar.tsx # Admin navigation
│   ├── assessment-form.tsx # Public form
│   ├── leads-table.tsx   # Leads management
│   └── ...
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
├── stores/               # Zustand stores
├── types/                # TypeScript type definitions
├── __tests__/            # Test files
└── docs/                 # Documentation
```

## 🔧 Configuration

### Form Configuration

The assessment form is configured using JsonForms in `lib/form-schema.ts`. You can modify the form structure by updating the schema and UI schema.

## 📊 API Endpoints

### Public Endpoints

- `POST /api/leads` - Submit new lead
- `POST /api/upload` - Upload resume file

### Admin Endpoints

- `GET /api/leads` - Get all leads
- `PUT /api/leads/[id]` - Update lead status
- `GET /api/leads/[id]` - Get specific lead
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current user

## 🔐 Authentication

The application uses a mock authentication system for demonstration purposes:

- **Admin Login**: Use any email/password combination
- **Session Management**: Cookie-based sessions
- **Protected Routes**: Admin pages require authentication

## 📝 Form Fields

The assessment form includes the following required fields:

- First Name
- Last Name
- Email
- Country of Citizenship
- LinkedIn/Personal Website URL
- Visa Categories of Interest (O-1, EB-1, EB-2 NIW, "I don't know")
- Additional Information (open text area)
- Resume/CV Upload

## 🎨 Styling

The application uses:

- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Pre-built component library
- **Custom Gradients**: Sage green theme with subtle gradients
- **Responsive Design**: Mobile-first approach

## 🧪 Testing Strategy

- **Unit Tests**: Component and utility function testing
- **Integration Tests**: API route and form submission testing
- **Test Coverage**: Key components and business logic
- **Mock Data**: In-memory data store for testing

## 🔄 State Management

The application uses Zustand for state management:

- **Leads Store**: Manages leads data, filtering, and pagination
- **Auth Context**: Handles authentication state
- **Form State**: Local component state for forms

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Development

### Code Style

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Conventional commits

### Adding New Features

1. Create feature branch
2. Implement feature with tests
3. Update documentation
4. Submit pull request

## 📚 Documentation

- [System Design Document](docs/SYSTEM_DESIGN.md)
- [API Documentation](docs/API.md)
- [Component Documentation](docs/COMPONENTS.md)

## 🆘 Support

For support or questions:

- Create an issue in the repository
- Email: [shafay11august@gmail.com](mailto:shafay11august@gmail.com)

## 🎯 Future Enhancements

- Real database integration
- Email notifications
- Advanced analytics
- Multi-tenant support
- Mobile app
- Workflow automation

---

**Built using Next.js, TypeScript, and modern web technologies.**
