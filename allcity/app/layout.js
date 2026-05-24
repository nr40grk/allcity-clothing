import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'ALLCITY — Apparel Born in the Streets',
  description: 'Street apparel. Hood controlling. F*ck the game.',
  metadataBase: new URL('https://www.allcityclothing.com'),
  openGraph: {
    title: 'ALLCITY — Apparel Born in the Streets',
    description: 'Street apparel. Hood controlling. F*ck the game.',
    url: 'https://www.allcityclothing.com',
    siteName: 'ALLCITY',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ALLCITY' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ALLCITY — Apparel Born in the Streets',
    description: 'Street apparel. Hood controlling. F*ck the game.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wvkd8lxvip");`,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
