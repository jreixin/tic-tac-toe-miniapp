const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjYyNDY4MiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweGVBODNiZTlBRDc5MmFjNTc2YjY1MDVCZjNlN0ZFNWJFMGZjMjE0MWIifQ",
    payload: "eyJkb21haW4iOiJ0aWMtdGFjLXRvZS1taW5pYXBwLXBlYXJsLnZlcmNlbC5hcHAifQ",
    signature: "TsY0q7LeJh5SlJx6QD2vQ/l85lbzk31RY5WuhqtSGuh/Ms5CWKD2siEmTLUxbBEDpZ2exrIlTCmpwnXCRaeYiBs="
  },
  miniapp: {
    version: "1",
    name: "Tic Tac Toe", 
    subtitle: "Classic game of Tic Tac Toe", 
    description: "Play Tic Tac Toe on your phone",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["classic", "game", "puzzle"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`, 
    tagline: "Play Tic Tac Toe",
    ogTitle: "Tic Tac Toe",
    ogDescription: "Play Tic Tac Toe",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
    imageUrl: `${ROOT_URL}/blue-hero.png`,
    noindex: false,
  },
} as const;

