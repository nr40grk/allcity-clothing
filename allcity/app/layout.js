import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'ALLCITY — Apparel Born in the Streets',
  description: 'Street apparel. Hood controlling. F*ck the game.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
