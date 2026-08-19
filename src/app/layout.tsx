import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bibin Maharjan | Software Engineer",
  description:
    "Portfolio of Bibin Maharjan, Software Engineer with 4+ years of frontend experience in enterprise applications.",
  openGraph: {
    title: "Bibin Maharjan | Software Engineer",
    description:
      "Building scalable, high-performance web applications with modern frontend technologies.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script id="clarity-analytics" type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "lrdn2504u8");
          `}
        </script>
      </head>
      <body className={inter.className}>
        <GoogleAnalytics gaId="G-D5CHQ0CKEX" />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
