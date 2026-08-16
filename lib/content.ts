// Content model for the invitation. Every field is editable from /admin.

export interface ReminderItem {
  icon: "no-kiss" | "sanitize" | "no-smoke" | "mask";
  text: string;
}

export interface GiftItem {
  name: string;
  photo: string;
}

export interface SiteContent {
  envelope: {
    title: string;
    hint: string;
    sealInitial: string;
  };
  hero: {
    topLine: string;
    eventType: string;
    ofLine: string;
    childName: string;
    dayName: string;
    dayNumber: string;
    monthName: string;
    time: string;
    venueName: string;
    venueAddress: string;
    hint: string;
    babyPhoto: string;
    polaroids: string[];
  };
  details: {
    heading: string;
    dateTimeTitle: string;
    dateLine: string;
    timeLine: string;
    ceremonyTitle: string;
    ceremonyName: string;
    ceremonyAddress: string;
    ceremonyMapUrl: string;
    ceremonyPhoto: string;
    receptionTitle: string;
    receptionName: string;
    receptionAddress: string;
    receptionMapUrl: string;
    receptionPhoto: string;
    countdownTitle: string;
    eventISO: string;
  };
  dressCode: {
    heading: string;
    body: string;
    colors: string[];
    colorNames: string[];
  };
  reminders: {
    heading: string;
    intro: string;
    items: ReminderItem[];
  };
  gifts: {
    nameLetters: string;
    /** Optional pre-cut photo-in-letter images, one per letter, in reading order.
     * When present they replace the single letterPhoto text fill. */
    letterImages: string[];
    letterPhoto: string;
    heading: string;
    intro: string;
    items: GiftItem[];
    monetaryTitle: string;
    outro: string;
  };
  rsvp: {
    heading: string;
    message: string;
    hosts: string;
    rsvpTitle: string;
    rsvpNote: string;
    collage: string[];
  };
}

export interface RsvpEntry {
  id: string;
  name: string;
  attending: "yes" | "no";
  guests: number;
  message: string;
  createdAt: string;
}

export const DEFAULT_CONTENT: SiteContent = {
  envelope: {
    title: "You’re invited!",
    hint: "Click on the envelope.",
    sealInitial: "L",
  },
  hero: {
    topLine: "Join us as we celebrate the",
    eventType: "Baptism",
    ofLine: "of our child",
    childName: "Jax Levi",
    dayName: "Saturday",
    dayNumber: "15",
    monthName: "August",
    time: "2:00 PM",
    venueName: "St. John the Baptist Parish",
    venueAddress: "Calamba City, Laguna",
    hint: "Click the bear for more details.",
    babyPhoto: "/placeholders/baby-hero.svg",
    polaroids: [
      "/placeholders/baby-1.svg",
      "/placeholders/baby-2.svg",
      "/placeholders/baby-3.svg",
    ],
  },
  details: {
    heading: "Details",
    dateTimeTitle: "Date & Time",
    dateLine: "August 15, 2026",
    timeLine: "2:00 PM",
    ceremonyTitle: "Ceremony",
    ceremonyName: "St. John the Baptist Parish",
    ceremonyAddress: "Calamba City, Laguna",
    ceremonyMapUrl:
      "https://www.google.com/maps/search/?api=1&query=St.+John+the+Baptist+Parish+Calamba+City+Laguna",
    ceremonyPhoto: "/placeholders/church.svg",
    receptionTitle: "Reception",
    receptionName: "Shakey’s Pizza Parlor–Halang",
    receptionAddress: "Calamba City, Laguna",
    receptionMapUrl:
      "https://www.google.com/maps/search/?api=1&query=Shakey%27s+Halang+Calamba+City+Laguna",
    receptionPhoto: "/placeholders/reception.svg",
    countdownTitle: "Countdown to Levi’s Day!",
    eventISO: "2026-08-15T14:00:00+08:00",
  },
  dressCode: {
    heading: "Dress Code",
    body:
      "We kindly encourage all guests to come in comfortable casual outfits in the shades of:",
    colors: ["#a8c4e0", "#d7e5f2", "#efe6d8", "#c19a6f"],
    colorNames: ["Powder", "Sky", "Cream", "Tan"],
  },
  reminders: {
    heading: "Reminders",
    intro:
      "As we protect our little one’s developing immune system and for our safety, please be reminded of the following:",
    items: [
      { icon: "no-kiss", text: "Please refrain from kissing Levi." },
      { icon: "sanitize", text: "Sanitize your hands before holding Levi." },
      { icon: "no-smoke", text: "No vaping or smoking." },
      {
        icon: "mask",
        text: "If you’re feeling sick, we understand if you need to stay at home.",
      },
    ],
  },
  gifts: {
    nameLetters: "LEVI",
    letterImages: [],
    letterPhoto: "/placeholders/letters.svg",
    heading: "Gift Guide",
    intro:
      "Your love and prayers are the greatest gift. But if you desire to give nonetheless, practical gifts are warmly appreciated. Here are some ideas:",
    items: [
      {
        name: "Bean Cloud Diaper · Uni-Love AirPro (Medium)",
        photo: "/placeholders/gift-diaper.svg",
      },
      {
        name: "Mustela Products (Barrier Cream, No Rinse Cleansing Water)",
        photo: "/placeholders/gift-mustela.svg",
      },
    ],
    monetaryTitle: "Monetary Gifts for Levi’s Savings",
    outro:
      "Just because we gave ideas doesn’t mean you are obligated to give. Your love, prayers and presence are the most precious gifts you can share with us.",
  },
  rsvp: {
    heading: "Save the date!",
    message: "We hope to see you on Levi’s special day!",
    hosts: "~ Ole & Jenn",
    rsvpTitle: "RSVP",
    rsvpNote: "Kindly confirm your attendance on or before August 1, 2026.",
    collage: [
      "/placeholders/baby-1.svg",
      "/placeholders/baby-2.svg",
      "/placeholders/baby-3.svg",
      "/placeholders/baby-4.svg",
      "/placeholders/baby-5.svg",
      "/placeholders/baby-6.svg",
      "/placeholders/baby-7.svg",
      "/placeholders/baby-8.svg",
      "/placeholders/baby-9.svg",
    ],
  },
};

/** The child's called name, derived from the letters block (e.g. "LEVI" → "Levi"),
 * falling back to the full name — keeps every string admin-driven. */
export function nickname(content: SiteContent): string {
  const letters = content.gifts.nameLetters.trim();
  if (letters) {
    return letters.charAt(0).toUpperCase() + letters.slice(1).toLowerCase();
  }
  return content.hero.childName;
}

/** Hosts line without its decorative prefix (e.g. "~ Ole & Jenn" → "Ole & Jenn"). */
export function hostNames(content: SiteContent): string {
  return content.rsvp.hosts.replace(/^[~\s]+/, "");
}

/** Deep-merge stored content over defaults so new fields never break old data. */
export function mergeContent(stored: unknown): SiteContent {
  if (!stored || typeof stored !== "object") return DEFAULT_CONTENT;
  const merge = (base: unknown, over: unknown): unknown => {
    if (Array.isArray(base)) return Array.isArray(over) ? over : base;
    if (base && typeof base === "object") {
      if (!over || typeof over !== "object") return base;
      const out: Record<string, unknown> = {};
      for (const key of Object.keys(base as Record<string, unknown>)) {
        out[key] = merge(
          (base as Record<string, unknown>)[key],
          (over as Record<string, unknown>)[key]
        );
      }
      return out;
    }
    return over === undefined ? base : over;
  };
  return merge(DEFAULT_CONTENT, stored) as SiteContent;
}
