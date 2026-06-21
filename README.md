# ISA Learn - Educational Platform

Modern, production-ready learning platform UI built with React, Tailwind CSS, TypeScript, and Firebase.

## ✨ Features

### Core Learning Platform
- **Responsive landing page** with hero section, testimonials, and statistics
- **Student dashboard** with progress tracking and achievement badges
- **Authentication flow** with login, registration, and profile management
- **Subject browsing** with 8+ study categories (Mathematics, English, Science, etc.)

### Advanced Resource Management System
- **Subject Details Page** - Browse resources by subject with filtering
- **Global Search System** - Search subjects, notes, and resources with live suggestions
- **Resource Management** - View, download, bookmark, and share study materials
- **PDF Viewer** - Built-in PDF viewer with zoom, fullscreen, and download capabilities
- **Premium Resource Locking** - Protect premium content with upgrade modals
- **Bookmark System** - Save favorite resources to "My Saved Resources" page
- **Resource Types** - Notes, Past Questions, Marking Schemes, Mock Exams, Video Tutorials

### Mobile Experience
- **Responsive design** - Mobile-first approach
- **Bottom navigation** - Mobile-optimized navigation bar
- **Touch-friendly UI** - Optimized buttons and interactions
- **Fast performance** - Optimized loading states

### Admin Features
- **Resource Management** - Upload, edit, delete, and toggle premium status
- **Subject Management** - Add, edit, delete subjects
- **Analytics Dashboard** - View platform statistics and resource performance
- **User Management** - Monitor active users and subscriptions

### UI/UX Enhancements
- **Dark mode** - Full dark mode support
- **Loading states** - Skeleton loaders for better UX
- **Empty states** - Helpful messages when no data available
- **Smooth animations** - Transitions and hover effects throughout
- **Modern cards** - Premium SaaS-style card designs

## 📁 Project Structure

```
src/
├── pages/
│   ├── LandingPage.tsx          # Homepage with hero and featured sections
│   ├── Dashboard.tsx            # Student dashboard
│   ├── Subjects.tsx             # Subject browsing with cards
│   ├── SubjectDetailsPage.tsx   # Individual subject with resources
│   ├── ResourcesListPage.tsx    # Browse all resources with filters
│   ├── SavedResourcesPage.tsx   # Bookmarked resources
│   ├── Auth.tsx                 # Login/registration
│   ├── Profile.tsx              # Student profile
│   ├── Notes.tsx                # Notes browsing
│   ├── PastQuestions.tsx        # Past questions
│   ├── MockExams.tsx            # Mock exams
│   ├── AdminPanel.tsx           # Admin dashboard
│   ├── Premium.tsx              # Premium plans
│   └── NotFound.tsx             # 404 page
├── components/
│   ├── Navbar.tsx               # Top navigation
│   ├── BottomNavigation.tsx     # Mobile bottom nav
│   ├── Footer.tsx               # Footer
│   ├── ResourceCard.tsx         # Resource display card
│   ├── SubjectCard.tsx          # Subject display card
│   ├── SearchBar.tsx            # Global search
│   ├── BookmarkButton.tsx       # Bookmark functionality
│   ├── PDFViewer.tsx            # PDF viewer component
│   ├── PremiumUpgradeModal.tsx  # Premium upgrade prompt
│   ├── SkeletonLoader.tsx       # Loading states
│   ├── EmptyState.tsx           # Empty state messages
│   ├── StatsCard.tsx            # Statistics display
│   ├── DashboardCard.tsx        # Dashboard metric cards
│   ├── CourseCard.tsx           # Course display
│   ├── TestimonialCard.tsx      # Testimonial display
│   └── NotificationList.tsx     # Notifications dropdown
├── App.tsx                      # Main app routing
├── main.tsx                     # React entry point
├── firebase.ts                  # Firebase config
├── types.ts                     # TypeScript types
├── data.ts                      # Sample data & resources
└── index.css                    # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from the example and add your Firebase values:
```bash
cp .env.example .env
```

3. Update the values in `.env`:
```env
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
VITE_USE_FIREBASE_EMULATORS=false
```

4. If you want to use the local Firebase emulators instead of a real Firebase project, set:
```env
VITE_USE_FIREBASE_EMULATORS=true
```

5. Start development server:
```bash
npm run dev
```

6. Open `http://localhost:4170/isa-learn/` in your browser

### Build for Production
```bash
npm run build
```

### Deploy with Firebase Hosting
1. Configure Firebase project in `.firebaserc`.
2. Set environment variables in `.env` from `.env.example`.
3. Run `firebase deploy` after building with `npm run build`.

### CI and monitoring
- A GitHub Actions workflow is included at `.github/workflows/ci.yml`.
- The app initializes optional Firebase Analytics and global error tracking when `VITE_FIREBASE_MEASUREMENT_ID` or `VITE_MONITORING_ENDPOINT` is configured.

## 📚 Key Components

### ResourceCard
Display individual resources with actions:
```tsx
<ResourceCard
  {...resource}
  isPremiumUser={isPremiumUser}
  onViewClick={handleView}
  onDownloadClick={handleDownload}
  onShareClick={handleShare}
/>
```

### SearchBar
Global search with live suggestions:
```tsx
<SearchBar 
  onSearch={(query) => handleSearch(query)}
  onSelectResult={(result) => handleSelectResult(result)}
/>
```

### PDFViewer
Built-in PDF viewer with zoom and fullscreen:
```tsx
<PDFViewer
  pdfUrl="path/to/pdf"
  title="Document Title"
  onClose={() => setShowPDF(false)}
/>
```

## 🎨 Design System

### Colors
- **Primary**: Sky Blue (#1B4DB9, #3B82F6)
- **Success**: Emerald (#10B981)
- **Warning**: Amber (#F59E0B)
- **Danger**: Rose (#EF4444)
- **Neutral**: Slate (various shades)

### Typography
- Headings: Semibold (font-semibold)
- Body: Regular (default)
- Small text: Slate-600 dark:slate-400

### Spacing
- Cards: 24px (rounded-3xl)
- Buttons: 12px (rounded-full)
- Gap standard: 6px (gap-6)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3-4 columns)

## 🔐 Firebase Structure

### Collections

**subjects**
- id, name, description, icon, totalResources

**resources**
- id, title, description, subject, type, year, pdfUrl, premium, downloads, uploadedAt

**bookmarks**
- userId, resourceId

## 🛠️ Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router** - Navigation
- **Firebase** - Auth & database (skeleton)
- **Lucide Icons** - Icons

## 📝 Notes

- Firebase integration is ready - just add your config values
- Mobile Money integration points are in the Premium page
- All components support dark mode
- Animations use Tailwind transitions
- Search is client-side in demo - connect to backend for production

## 📄 License

Created for ISA Learn educational platform.

