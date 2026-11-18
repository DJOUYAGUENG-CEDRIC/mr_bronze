import './globals.css';

export const metadata = {
  title: 'Lionel PCS ⚽⚽',
  description: 'Assistant Crash — Code promo 24TDF',
  icons: {
    icon: '/pcs.jpg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
