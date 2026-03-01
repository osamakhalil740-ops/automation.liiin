import './globals.css';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata = {
  title: 'Nexora – Your AI LinkedIn Presence',
  description: 'Elevate your professional brand with intelligent LinkedIn automation. AI-powered engagement, auto-generated posts, and 24/7 presence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="absolute inset-0 bg-grid-pattern -z-10 pointer-events-none opacity-50"></div>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
