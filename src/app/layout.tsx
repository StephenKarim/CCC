import "./globals.css";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LenisScroll from "@/components/LenisScroll";
import Carousel from "@/slices/Carousel";
import CarouselP from "@/components/CarouselP";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-lora">
      <body className="grid bg-[#070815] text-gray-200">
        <LenisScroll />
        <SpeedInsights />
        {/* bg-[url('/images/background.png')] bg-fixed bg-cover */}
        <Header />
       
        <main>{children}</main>
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
