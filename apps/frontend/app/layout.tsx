import { Navbar } from "@/components/NavBar";
import RandomRecipeBox from "@/components/RandomRecipeBox";
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
      <body className="min-h-screen bg-white antialiased">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
        <RandomRecipeBox />
      </body>
    </html>
  );
}
