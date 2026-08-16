import type { Metadata, Viewport } from "next";
import { Great_Vibes, Patrick_Hand, EB_Garamond } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-patrick-hand",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { getContent } = await import("@/lib/store");
  const content = await getContent();
  const h = content.hero;
  return {
    title: `You’re Invited — ${h.childName}’s ${h.eventType}`,
    description: `${h.topLine} ${h.eventType.toLowerCase()} of ${h.childName} — open your invitation.`,
  };
}

export const viewport: Viewport = {
  themeColor: "#e3eff9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${greatVibes.variable} ${patrickHand.variable} ${garamond.variable}`}
    >
      <body className="antialiased">
        <span
          hidden
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: A sealed envelope that opens into a living watercolor nursery-sky —
the invitation is a kept keepsake, not a scrolling flyer; refuses the
static card-image-in-a-page default.
OWN-WORLD: Powder-blue watercolor washes, cream + tan gingham, hand-drawn
teddy bears / clouds / hot-air balloons / gold stars as SVG, arched panels,
polaroid strips with tape, Great Vibes script + Patrick Hand print +
Garamond small caps. Recognizable with all content removed.
STORY: Guest clicks the wax seal, the envelope opens, the card rises;
they learn who/when/where, play with the floating world, and RSVP.
FIRST VIEWPORT: Centered white envelope with blue wax seal on a drifting
watercolor sky; "You're invited!" script above; primary action = the seal.
FORM: Envelope-keepsake (pinned by user's inspo; no tournament run).
FINISH: unreviewed and undocumented is unfinished; this build ends with
the finish review, the verdict, and DESIGN.md.
-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
