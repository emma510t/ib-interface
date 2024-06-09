import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Interface - Improve Business",
  description: "Interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} text-ibsilver-600 flex flex-col min-h-screen overflow-x-hidden bg-ibsilver-100	`}
      >
        {children} <Toaster />
      </body>
    </html>
  );
}
