# Hidden Content

Content that stays in the codebase but that visitors can neither see nor reach (see **Hidden** in `GLOSSARY.md`). Each entry says what the item is, why it's Hidden, where it lives and exactly how to bring it back.

## Services page

**What it is:** the `/services` page, which lists the owner's freelance Services (productized Services, Services in batches, retainer plans and custom projects), and its Services item in the desktop and mobile navigation.

**Why it's Hidden:** the owner isn't freelancing yet, so the site shouldn't advertise an offering they can't take on. It stays Hidden until they start a freelance business.

**Where it lives:**

- The switch: `features.services` in `src/constants/features.ts`. It's `false` while the page is Hidden.
- The route: `src/routes.ts` registers the `services` route only while the switch is on. While it's off, `/services` matches no route and shows React Router's default error screen, the same as any unknown URL.
- The nav link: `navigationLinks` in `src/pages/Layout.tsx` includes Services only while the switch is on.
- Still in place and still tested, so nothing else needs restoring:
  - the page, `src/pages/Services.tsx` (tested by `test/Services.test.tsx`);
  - the card, `src/components/features/ServiceCard.tsx`;
  - the data, `src/data/services.tsx`;
  - the `/services` entry in the Layout's active-section mapping, in `src/pages/Layout.tsx`;
  - the Services nav icon in `iconMap`, in `src/components/layout/Navigation.tsx`.

**How to restore it:**

1. Set `services: true` in `src/constants/features.ts`.
2. Add `https://justinreynoso.dev/services` to `public/sitemap.xml`.
3. Update the two tests that pin Services as Hidden. Both fail once the switch is on, on purpose:
   - `test/Layout.test.tsx`, "does not render a Services link while Services is Hidden": change it to expect the Services link, with `href="/services"`.
   - `test/routes.test.ts`, "does not resolve the Services URL while Services is Hidden": change it to expect `/services` to match.
4. Run `npm run test:coverage` and `npm run build`.

**Note:** the page already has two commented-out blocks of its own in `src/pages/Services.tsx`: the "How I Work" process section (`id="process"`) and the "Ready to Build Something?" call to action (`id="cta"`). Restoring the page doesn't need them. If you uncomment either one, also import what it uses: `steps` from `src/data/services.tsx`, `motion` from `framer-motion`, and `WarmCard` and `WarmButton` from `src/components`.
