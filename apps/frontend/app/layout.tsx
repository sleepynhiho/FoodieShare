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
      <body>{children}</body>
    </html>
  );
}
