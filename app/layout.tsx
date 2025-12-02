
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Tic Tac Toe</title>
        <meta name="description" content="Play Tic Tac Toe inside Base App" />
        <meta
          name="fc:miniapp"
          content='{"version":"next","imageUrl":"https://tic-tac-toe-miniapp-pearl.vercel.app/blue-hero.png","button":{"title":"Open App","action":{"type":"launch_frame","url":"https://tic-tac-toe-miniapp-pearl.vercel.app/"}}}'
        />
        <meta property="og:title" content="Tic Tac Toe" />
        <meta property="og:description" content="Play Tic Tac Toe inside Base App" />
        <meta property="og:image" content="https://tic-tac-toe-miniapp-pearl.vercel.app/blue-hero.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://tic-tac-toe-miniapp-pearl.vercel.app/blue-hero.png" />
      </head>
      <body>
        {/* Uncomment and wrap with MiniKitProvider if using Base features */}
        {/* <MiniKitProvider> */}
          {children}
        {/* </MiniKitProvider> */}
      </body>
    </html>
  );
}
