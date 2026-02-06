import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "gaonhae.me - 성장형 메이커의 플랫폼",
    template: "%s | gaonhae.me",
  },
  description:
    "기획-개발-운영-자기관리가 통합된 성장형 메이커의 개인 브랜드 플랫폼. 프로젝트, 블로그, 습관 트래커를 통해 성장의 여정을 기록합니다.",
  keywords: [
    "포트폴리오",
    "개발자",
    "기술 블로그",
    "프로젝트",
    "자기계발",
    "습관 트래커",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "가온해", url: "https://gaonhae.me" }],
  creator: "가온해",
  publisher: "가온해",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://gaonhae.me",
    siteName: "gaonhae.me",
    title: "gaonhae.me - 성장형 메이커의 플랫폼",
    description:
      "기획-개발-운영-자기관리가 통합된 성장형 메이커의 개인 브랜드 플랫폼",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "gaonhae.me",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "gaonhae.me - 성장형 메이커의 플랫폼",
    description:
      "기획-개발-운영-자기관리가 통합된 성장형 메이커의 개인 브랜드 플랫폼",
    images: ["/og-image.png"],
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
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
