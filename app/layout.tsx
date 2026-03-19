import type { Metadata } from "next";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pastéis de Nata em Lisboa 🥮",
  description: "Discover the best pastel de nata shops in Lisbon. 25 legendary locations from Pastéis de Belém to hidden neighborhood gems.",
  openGraph: {
    title: "Pastéis de Nata em Lisboa 🥮",
    description: "Discover the best pastel de nata shops in Lisbon. 25 legendary locations from Pastéis de Belém to hidden neighborhood gems.",
    url: "https://lisbon-natas.vercel.app",
    siteName: "Lisbon Pastel de Nata Map",
    images: [
      {
        url: "/nata-og.png",
        width: 1200,
        height: 630,
        alt: "Lisbon Pastel de Nata Map - Best Nata Shops in Lisbon"
      }
    ],
    locale: "pt_PT",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pastéis de Nata em Lisboa 🥮",
    description: "Discover the best pastel de nata shops in Lisbon. 25 legendary locations from Pastéis de Belém to hidden neighborhood gems.",
    images: ["/nata-og.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>{children}</body>
    </html>
  );
}
