import { AuthProvider } from "@/context/AuthContext";
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
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
