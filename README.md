# WhichIconIsThat

> Tired of finding which icon is that?

## Development

Client-side

```bash
cd client/ && yarn dev
```

Server-side

```bash
deno run --allow-read --allow-net ../server/app.ts
```

## Features

- 🔎 Find your icon name and icon pack only by dragging and dropping your SVG
- 📦 All popular icon packs supported (i.e feather icons, font awesome)
- 📎 Code snippets to import the icon library for your framework (i.e react-icons)
- ✨ Delightful experience + damn fast!

## Services

- Vercel
- Upstash
- Plausible
- Deno Deploy
- FeedbackFish

## Roadmap

Release date: Monday 3, May

## TODO

- [ ] Add icon packs:

  - [ ] Ant Design Icons
  - [ ] BoxIcons
  - [ ] Devicons
  - [ ] Flat Color Icons
  - [ ] Game Icons
  - [ ] GiHub Octicons icons
  - [ ] Grommet-icons
  - [ ] Heroicons
  - [ ] IcoMoon Free
  - [ ] Ionicons 4
  - [ ] Ionicons 5
  - [ ] Material Design icons
  - [ ] Remix Icon
  - [ ] Simple Icons
  - [ ] Typicons
  - [ ] VS Code Icons
  - [ ] Weather Icons
  - [ ] css.gg

* [ ] Refactorize to download icons instead of having them locally
  1. Download icons
  2. Save it to upstash
  3. Run it in a cron each day
  4. Endpoint reads from upstash redis

- [ ] Try Preactjs on Next.js build

* [ ] Improve and share types and helpers between client/server

- [ ] Add bottom icon to open footer with Slide transition
  - [ ] Display supported icons
  - [ ] Display GitHub / Twitter
  - [ ] Add FeedbackFish
  - [ ] Display code snippets for react/angular/vue-icons

* [ ] Add Plausible analytics

- [ ] Reach 100/100 in Audits

* [ ] Buy whichiconisthat.com in NameCheap

- [ ] Deploy client to Vercel

* [ ] Deploy server to Deno deploy

- [ ] UI/UX/Writing review

* [ ] Beta testers list + exclusive list

- [ ] Backend and Frontend external code review

* [ ] Publish in ProductHunt
