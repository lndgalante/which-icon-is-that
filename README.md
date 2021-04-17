<div align="center">
  <h1>WhichIconIsThat</h1>
</div>

## Features

🔎 Find your icon name and icon pack only by dragging and dropping your SVG

📦 All popular icon packs supported (i.e feather icons, font awesome)

🆕 Icon packs always updated with the latest versions

📎 Code snippets to import the icon library for your framework (i.e react-icons)

✨ Delightful experience + damn fast!

## Development

Client-side

```bash
cd client/ && yarn dev
```

Server-side

```bash
deno run --unstable --allow-read --allow-write --allow-net app.ts
```

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

- [ ] Remove svg parent tag to have more probabilities to find a icon

* [x] Refactorize to download icons instead of having them locally
      [x] Download icons
      [x] Save it to upstash
      [x] Endpoint reads from upstash redis

- [ ] Run preloadData fn on a cron each day

* [ ] Try Preactjs on Next.js build

- [ ] Improve and share types and helpers between client/server

* [ ] Add bottom icon to open footer with Slide transition
  - [ ] Display supported icons
  - [ ] Display GitHub / Twitter
  - [ ] Add FeedbackFish
  - [ ] Display code snippets for react/angular/vue-icons

- [ ] Add Plausible analytics

* [ ] Reach 100/100 in Audits

- [ ] Buy whichiconisthat.com in NameCheap

* [ ] Deploy client to Vercel

- [ ] Deploy server to Deno deploy

* [ ] UI/UX/Writing review

- [ ] Beta testers list + exclusive list

* [ ] Backend and Frontend external code review

- [ ] Publish in ProductHunt

* [ ] Publish in developer/design/utilities list

## Services

- Vercel
- Deno deploy
- Upstash
- Plausible
- Deno Deploy
- FeedbackFish
