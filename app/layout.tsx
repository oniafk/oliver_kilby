import type { Metadata } from "next";
import "./globals.css";
import WebGLProvider from "@/components/webgl/WebGLProvider";

export const metadata: Metadata = {
  title: "Oliver Kilby — Photography",
  description: "Photography portfolio of Oliver Kilby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Stick+No+Bills:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Do not move <WebGLProvider> below any route boundary: a re-parent
            would unmount the canvas and drop the WebGL context. */}
        <WebGLProvider>{children}</WebGLProvider>
      </body>
    </html>
  );
}
