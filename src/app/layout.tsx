import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-lora">
      <body className="bg-[url('/images/I3.jpg')] bg-cover bg-fixed bg-center text-white">
        <div className="grid h-[100svh]">
          {/* bg-[url('/images/background.png')] bg-fixed bg-cover */}
          <Header />
          <main>{children}</main>
          <Footer />
          <PrismicPreview repositoryName={repositoryName} />
        </div>
        <Script id="set-vh" strategy="beforeInteractive">
          {`
            function setVh() {
              const vh = window.innerHeight * 0.01;
              document.documentElement.style.setProperty('--vh', \`\${vh}px\`);
            }

            window.addEventListener('resize', setVh);
            window.addEventListener('orientationchange', setVh);
            setVh();
          `}
        </Script>
      </body>
    </html>
  );
}
