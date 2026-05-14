import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import SuspenseLoadingPage from "@/components/suspense-loading-page";
import ReactQueryClientProvider from "@/components/client/react-query-provider";
import { Orbitron } from 'next/font/google';
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron', // Optional: for CSS variable
  display: 'swap',
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const avenir = localFont({
  src: [
    { path: "../../public/fonts/avenir/AvenirLTStd-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/fonts/avenir/AvenirLTStd-Book.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/avenir/AvenirLTStd-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/avenir/AvenirLTStd-Heavy.otf", weight: "700", style: "normal" },
    { path: "../../public/fonts/avenir/AvenirLTStd-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-avenir",
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${orbitron.variable} ${geistSans.variable} ${geistMono.variable} ${avenir.variable}`}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextTopLoader
            color="#2563eb"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow={false}
          />
          <Suspense fallback={<SuspenseLoadingPage />}>
            <ReactQueryClientProvider>
              {children}
            </ReactQueryClientProvider>
          </Suspense>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
