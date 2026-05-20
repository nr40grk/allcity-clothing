import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'ALLCITY — Apparel Born in the Streets',
  description: 'Street apparel. Hood controlling. F*ck the game.',
  metadataBase: new URL('https://www.allcityclothing.com'),
  openGraph: {
    title: 'ALLCITY — Apparel Born in the Streets',
    description: 'Street apparel. Hood controlling. F*ck the game.',
    url: 'https://www.allcityclothing.com',
    siteName: 'ALLCITY',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'ALLCITY' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALLCITY — Apparel Born in the Streets',
    description: 'Street apparel. Hood controlling. F*ck the game.',
    images: ['/logo.png'],
  },
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
