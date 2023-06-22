import "./globals.css";
import { Inter } from "next/font/google";
import ClientOnly from "@/components/ClientOnly";
import SupabaseProvider from "@/providers/SupabaseProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ad Road",
  description: "Generated Your Income by our Ads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <ClientOnly>{children}</ClientOnly>
        </SupabaseProvider>
      </body>
    </html>
  );
}
