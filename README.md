# Levi's Baptism Invitation 💌

An interactive web invitation: guests click the wax seal, the envelope opens, and a
living watercolor teddy-bear world unfolds — details, countdown, dress code,
reminders, gift guide, and a built-in RSVP form. Everything (text, photos, links)
is editable from a password-protected admin panel.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 — the invitation.
Open http://localhost:3000/admin — the editor (default password `levi-admin` until you set one).

With no configuration, content saves to `data/content.json` and uploaded photos to
`public/uploads/`. RSVPs save to `data/rsvps.json`. That's perfect for local editing
and previewing.

## Deploy to Vercel (free) + Supabase (free)

1. **Supabase** — create a project at supabase.com, open the SQL editor, and run
   everything in [`supabase.sql`](supabase.sql). This creates the `site_content`
   and `rsvps` tables and the public `invitation-photos` storage bucket.
2. **Vercel** — import this repo at vercel.com, then in *Settings → Environment
   Variables* add the three variables from [`.env.example`](.env.example):
   `ADMIN_PASSWORD`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
3. Deploy. Visit `/admin`, sign in, upload Levi's real photos over the placeholders,
   and hit **Save changes**.

The admin banner tells you which storage mode is active and warns if the default
password is still in use.

## What the admin can edit

| Tab | Controls |
| --- | --- |
| Envelope | Title, hint, wax-seal initial |
| Main card | Every line of the invite, baby photo, 3 polaroids |
| Details | Date/time lines, ceremony & reception names, addresses, **map links**, photos, countdown target |
| Dress code | Heading, body, color swatches (add/remove) |
| Reminders | Heading, intro, reminder list with icons (add/remove) |
| Gifts | Photo-filled name letters, intro, gift ideas with photos (add/remove), monetary note |
| Save the date | Headings, message, hosts, RSVP note, photo collage (add/remove) |
| RSVPs | Live list of responses with guest totals |

## Replace-before-sharing checklist

All shipped imagery is labeled placeholder art (no real photos are included):

- [ ] Baby photos: main card photo, 3 polaroids, letter-fill photo, 9 collage photos
- [ ] Ceremony photo (St. John the Baptist Parish)
- [ ] Reception photo (Shakey's Halang)
- [ ] Gift product photos
- [ ] Set a real `ADMIN_PASSWORD`

## Stack

Next.js 15 (App Router) · Tailwind CSS v4 · framer-motion · Supabase (or local
files) · hand-drawn SVG illustration set in `components/decor.tsx`.
