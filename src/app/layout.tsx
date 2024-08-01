import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-lora">
      <body className="grid h-[100svh] bg-[url('/images/i3.jpg')] bg-cover bg-fixed bg-center bg-no-repeat text-white">
        {/* bg-[url('/images/background.png')] bg-fixed bg-cover */}
        <Header />
        <main>{children}</main>
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
