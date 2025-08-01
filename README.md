# 🤝 PeerMatch - Peer Collaboration & Networking Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma)](https://prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

A modern, intelligent peer matching platform that connects students and professionals for collaboration, networking, and project partnerships. Built with Next.js 14, featuring a sophisticated matching algorithm and beautiful UI.

## ✨ Features

### 🔐 **Authentication & Security**

- Google OAuth integration with NextAuth.js
- Secure credential-based authentication
- Protected routes with middleware
- Session management

### 🎯 **Smart Matching Algorithm**

- **College-based matching** (30% weight) - Connect with peers from your institution
- **Academic year alignment** (25% weight) - Find collaborators at similar levels
- **Skills compatibility** (35% weight) - Match based on shared technologies and interests
- **Schedule synchronization** (10% weight) - Connect with available partners

### 👤 **User Management**

- Complete profile onboarding system
- Skills and technology tracking
- Availability scheduling
- LinkedIn profile integration
- Profile completion progress tracking

### 🤝 **Connection & Networking System**

- Real-time connection requests
- Connection status management
- LinkedIn integration for professional networking
- Connection history and management
- Build your professional network

### 🎨 **Modern UI/UX**

- Responsive design with Tailwind CSS
- Beautiful gradient themes and animations
- Loading states and skeleton screens
- Toast notifications with Sonner
- Glassmorphism effects and modern design patterns

## 🛠️ Tech Stack

### **Frontend**

- **Next.js 14** - React framework with App Router
- **React 18** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icon library

### **Backend**

- **Next.js API Routes** - Server-side API endpoints
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Relational database
- **NextAuth.js** - Authentication library

### **Development Tools**

- **TypeScript/JavaScript** - Programming language
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- PostgreSQL database
- Google OAuth credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/peer-match.git
   cd peer-match
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/peermatch"

   # NextAuth
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma db push

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
peer-match/
├── app/                        # Next.js App Router
│   ├── api/                   # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   ├── connections/      # Connection management
│   │   ├── matches/          # Matching algorithm
│   │   ├── onboarding/       # User profile setup
│   │   └── user/             # User data endpoints
│   ├── auth/                 # Authentication pages
│   ├── connections/          # Connections management page
│   ├── dashboard/            # User dashboard
│   ├── matches/              # Peer discovery page
│   ├── onboarding/           # Profile setup flow
│   └── globals.css           # Global styles
├── components/               # Reusable UI components
│   └── ui/                   # Shadcn/ui components
├── lib/                      # Utility libraries
│   ├── prisma.js            # Database client
│   └── auth.js              # NextAuth configuration
├── prisma/                   # Database schema and migrations
│   └── schema.prisma        # Database schema
├── middleware.js             # Route protection
└── package.json             # Dependencies
```

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signout` - User sign out
- `GET /api/auth/session` - Get current session

### User Management

- `GET /api/user/[id]` - Get user profile
- `POST /api/onboarding` - Complete user onboarding

### Networking System

- `POST /api/matches` - Get compatible collaboration partners
- `POST /api/connections` - Create new connection
- `GET /api/connections` - Get user connections
- `DELETE /api/connections` - Remove connection

## 🎯 Matching Algorithm

The intelligent matching system uses a weighted scoring approach to find the best collaboration partners:

```javascript
const matchScore =
  collegeMatch * 0.3 + // Same college/university
  yearMatch * 0.25 + // Similar academic year
  skillsMatch * 0.35 + // Shared skills/technologies
  availabilityMatch * 0.1; // Compatible schedules
```

### Scoring Criteria:

- **Perfect Match**: 85-100% - Ideal collaboration partner
- **Great Match**: 70-84% - Strong potential for partnership
- **Good Match**: 55-69% - Good networking opportunity
- **Fair Match**: 40-54% - Basic compatibility

## 🌟 Use Cases

### **For Students:**

- 🤝 **Project Collaboration** - Find partners for hackathons, assignments, and personal projects
- 💼 **Professional Networking** - Build connections with peers in your field
- 🔄 **Skill Exchange** - Connect with others to share knowledge and learn new technologies
- 🎯 **Career Building** - Expand your professional network early

### **For Professionals:**

- 🚀 **Side Projects** - Find collaborators for innovative side projects
- 📈 **Skill Development** - Connect with peers to learn and grow together
- 🌐 **Industry Networking** - Build meaningful professional relationships
- 💡 **Innovation** - Partner with like-minded individuals for new ventures

## 🎨 Design System

### Color Palette

- **Primary**: Blue to Purple gradient (`from-blue-600 to-purple-600`)
- **Secondary**: Purple to Pink gradient (`from-purple-500 to-pink-500`)
- **Success**: Green (`green-500`)
- **Warning**: Yellow (`yellow-500`)
- **Error**: Red (`red-500`)

### Typography

- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable sans-serif
- **Badges**: Small, colorful indicators

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Prisma](https://prisma.io/) for the excellent ORM
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [NextAuth.js](https://next-auth.js.org/) for authentication

## 📧 Contact

**Your Name** - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/peer-match](https://github.com/yourusername/peer-match)

---

<div align="center">
  <strong>Built for collaboration, networking, and meaningful connections</strong>
</div>
