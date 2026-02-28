import './globals.css';

export const metadata = {
  title: 'Linqin.ai – Your AI LinkedIn Agent',
  description: 'Grow your reach on autopilot.',
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
      </body>
    </html>
  );
}
