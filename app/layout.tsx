import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://temp1mail.com"),
  title: {
    default: "Temp1Mail - Free Temporary Email | Disposable Temp Mail No Signup",
    template: "%s | Temp1Mail",
  },
  description:
    "Free instant temporary email with no registration. Generate disposable temp mail to protect your privacy, block spam, and receive anonymous emails that auto-delete in 10 minutes.",
  keywords: [
    "temporary email",
    "disposable email",
    "temp mail",
    "free temp email",
    "anonymous email",
    "instant temp mail",
    "10 minute mail",
    "throwaway email",
    "fake email generator",
    "temp mail no signup",
  ],
  authors: [{ name: "Temp1Mail", url: "https://temp1mail.com" }],
  creator: "Temp1Mail",
  publisher: "Temp1Mail",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Temp1Mail - Free Temporary Email | Instant Disposable Temp Mail",
    description:
      "Get a free disposable email address instantly. No signup, total privacy. Generate temp mail, receive emails in real-time, auto-delete in 10 minutes.",
    url: "https://temp1mail.com",
    siteName: "Temp1Mail",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://temp1mail.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Temp1Mail - Free Disposable Temporary Email Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Temp1Mail - Free Temporary Email | Disposable Temp Mail",
    description:
      "Instant disposable email. No signup, no tracking, no spam. Generate free temp mail that auto-deletes in 10 minutes.",
    images: ["https://temp1mail.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.svg",
  },
  alternates: {
    canonical: "https://temp1mail.com",
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://temp1mail.com/#website",
      url: "https://temp1mail.com",
      name: "Temp1Mail",
      description:
        "Free instant temporary email service. Generate disposable temp mail with no registration to protect your privacy.",
      publisher: { "@id": "https://temp1mail.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://temp1mail.com/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://temp1mail.com/#organization",
      name: "Temp1Mail",
      url: "https://temp1mail.com",
      logo: "https://temp1mail.com/icon.svg",
    },
    {
      "@type": "WebApplication",
      "@id": "https://temp1mail.com/#app",
      name: "Temp1Mail - Free Temporary Email",
      url: "https://temp1mail.com",
      description:
        "Generate free disposable temporary email addresses instantly. No signup, no tracking. Receive emails in real-time. Auto-delete after 10 minutes.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Instant disposable email generation",
        "No registration required",
        "Real-time email delivery",
        "OTP auto-detection and copy",
        "Auto-delete after 10 minutes",
        "Custom and random email addresses",
        "Zero-logs privacy",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon.svg" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <GoogleAnalytics gaId="G-2R46QD65F3" />
      </body>
    </html>
  );
}
