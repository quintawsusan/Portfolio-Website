import "./globals.css";

export const metadata = {
  title: "Quinta Susan | Software Engineer",
  description:
    "Quinta Susan:  Software Engineer, Digital Problem Solver and Technology Enthusiast based in Nairobi, Kenya.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
