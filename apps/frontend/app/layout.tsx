import { Toaster } from "sonner";
import "../styles/globals.css";

export const metadata = {
  title: "FoodieShare",
  description: "Discover, share, and collect recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
