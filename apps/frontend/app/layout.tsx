import "../styles/globals.css";
import { Toaster } from "sonner";

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
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
