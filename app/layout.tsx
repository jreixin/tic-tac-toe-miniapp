import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Tic Tac Toe",
  description: "Play Tic Tac Toe inside Base App",
  other: {
    "fc:miniapp": JSON.stringify({
      version: "next",
      imageUrl: "https://tic-tac-toe-miniapp-pearl.vercel.app/blue-hero.png",
      button: {
        title: "Open App",
        action: {
          type: "launch_frame",
          url: "https://tic-tac-toe-miniapp-pearl.vercel.app/",
        },
      },
    }),
  },
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
