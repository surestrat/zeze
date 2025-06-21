import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ErrorBoundary from "@/components/providers/ErrorBoundary";
import AnalyticsTracker from "@/components/shared/AnalyticsTracker";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Happy Birthday Zizipho 🎂",
  description: "A special birthday surprise for Zizipho made with love",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <ErrorBoundary>
            <AnalyticsTracker />
            {children}
            <Toaster 
              position="top-center"
              richColors
              closeButton
            />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
