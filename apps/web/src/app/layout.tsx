// Root layout wrapper providing HTML structure, fonts, and global styling.
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'School Helpdesk AI',
  description: 'Multi-tenant RAG SaaS for School Parent Inquiries',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased flex flex-col">{children}</body>
    </html>
  );
}
