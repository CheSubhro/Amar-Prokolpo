Amar Prokolpo: Government Schemes Information Portal
"Amar Prokolpo" is a comprehensive multi-platform ecosystem designed to aggregate, manage, and distribute information about Central and State government schemes. This project consists of a robust backend, two distinct web frontends (User & Admin), and a native mobile application.

🛠️ Tech Stack & Architecture
1. Backend (Amar Prokolpo Server)
The core service layer powering all frontends.

Runtime: Node.js, Express

Database: MongoDB, Mongoose

Security: JWT, Bcrypt, Cookie-Parser, CORS

Storage/Services: Cloudinary (Media), Firebase Admin, Nodemailer (Email), Multer

Utilities: Winston (Logging), Node-Cron (Scheduling), Express-Validator

2. Website Frontend (User)
The primary user-facing interface for citizens.

Core: React 19, Vite, Redux Toolkit

UI/Styling: Chakra UI, Sass

Navigation: React Router

Data Fetching: Axios, TanStack-like patterns

3. Admin Panel Frontend
The dedicated management dashboard for administrators.

Core: React 19, Vite, Redux Toolkit

Form Management: React Hook Form, Zod, Shadcn UI

Styling: Tailwind CSS, Framer Motion (via tw-animate)

Utilities: Lucide React, Sonner (Toasts)

4. Mobile App
Native experience built for mobile users.

Framework: Expo (React Native)

Navigation: Expo Router, React Navigation

State/Storage: Async Storage

UI Elements: Expo Vector Icons, Reanimated, Gesture Handler

🚀 Key Features
Unified Scheme Management: Centralized data management for government schemes.

Role-Based Access: Secure dashboards for administrative control.

Responsive UI/UX: Optimized experiences across desktop and mobile devices.

Secure Authentication: Token-based security across all platforms.

Media Handling: Efficient image uploads and management using Cloudinary.


⚙️ Setup Instructions
Backend
cd backend

npm install

Create .env (add DB_URI, JWT_SECRET, CLOUDINARY_KEYS)

npm start

Web Frontends & Mobile
cd <directory_name>

npm install

npm run dev (for web) or npx expo start (for mobile)






