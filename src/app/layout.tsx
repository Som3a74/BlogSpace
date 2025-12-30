import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "DevJournal - Your Source for Tech & Lifestyle",
    template: "%s | DevJournal",
  },
  description: "Discover the latest insights in technology, lifestyle, and more on DevJournal. Join our community of readers today.",
  keywords: ["blog", "technology", "lifestyle", "nextjs", "web development", "programming"],
  openGraph: {
    title: "DevJournal",
    description: "Discover the latest insights in technology, lifestyle, and more on DevJournal.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="DevJournal" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LayoutWrapper>
            <main>
              {children}
              <Toaster position="top-center" richColors />
            </main>
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
