import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Tic Tac Toe",
  description: "Play Tic Tac Toe inside Base App",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Uncomment and wrap with MiniKitProvider if using Base features */}
        {/* <MiniKitProvider> */}
          {children}
        {/* </MiniKitProvider> */}
      </body>
    </html>
  );
}
