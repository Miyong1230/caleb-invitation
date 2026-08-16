# PRODUCT.md — Levi's Baptism Invitation

## What this is
A single-page interactive web invitation for the baptism of **Jax Levi**, hosted by parents **Ole & Jenn**. Guests receive a link, open a sealed envelope on screen, and scroll through an animated storybook-style invitation. An admin panel lets the hosts edit every text, photo, and link, and view RSVP responses.

## Audience & scene
Family and friends of Ole & Jenn (Philippines; Calamba City, Laguna). Opened mostly on phones, from a Messenger/SMS link, in bright daylight — light theme is forced by the scene. One-time or few-time viewing per guest: delight-first motion is appropriate (rare-view surface).

## Event facts (initial content — editable in admin)
- Event: Baptism of Jax Levi ("Levi")
- Date: Saturday, August 15, 2026, 2:00 PM
- Ceremony: St. John the Baptist Parish, Calamba City, Laguna
- Reception: Shakey's Pizza Parlor–Halang, Calamba City, Laguna
- RSVP deadline: on or before August 1, 2026
- Dress code: comfortable casual in shades of powder blue / cream / tan
- Reminders: no kissing Levi, sanitize hands before holding, no vaping/smoking, stay home if sick
- Gift guide: Bean Cloud Diaper / Uni-Love AirPro (Medium), Mustela products, monetary gifts for Levi's savings

## Brand commitment (pinned by user's design inspo)
Watercolor baby-blue teddy-bear world: soft blue watercolor washes, cream/tan accents, teddy bears on clouds, hot-air balloons, gold stars, arched panels, polaroid photo strips, gingham frames, wax-sealed envelope, script + hand-printed typography. This is a **pinned aesthetic** — honor it, execute it at high craft.

## Success
- Guest understands who/what/when/where within seconds of the envelope opening.
- Every decorative element is alive (ambient motion) and rewards interaction.
- Hosts can log in at /admin and change any text, photo, or link without touching code, and see RSVPs.

## Constraints
- Deploy target: Vercel + Supabase (free tier). Local file fallback must work with zero config for development.
- Photos: user will upload real baby photos via admin; ship with labeled placeholder art, never fake photos of a real child.
- Mode: Persuade/Experience hybrid — the invitation IS the product; RSVP is the action.

## Assumptions (labeled, made without interview)
- Language: English, matching inspo.
- Admin auth: single shared password (env var), no user accounts needed.
- Map links point to Google Maps searches for the two venues; editable in admin.
