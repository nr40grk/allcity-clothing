import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SaleBanner from '@/components/SaleBanner';

export const metadata = {
  title: 'ALLCITY — Apparel Born in the Streets',
  description: 'Street apparel. Worldwide shipping. DM for orders.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar />
          <SaleBanner />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
