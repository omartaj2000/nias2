import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Community Crowdfunding Platform",
  description: "A modern decentralised platform for funding creative projects, causes, and innovation.",
  keywords: "crowdfunding, creative projects, blockchain, web3, fundraising",
};

export const viewport = {
  themeColor: "#00b4d8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {/* Background decoration */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30 z-0">
            <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-secondary-200 dark:bg-secondary-900/20 rounded-full blur-3xl" />
          </div>

          <div className="relative min-h-screen bg-gray-50 dark:bg-dark-900 flex flex-col">
            <Navbar />
            <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
