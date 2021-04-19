<div align="center">
  <h1>Which Icon Is That? 🤔</h1>
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
cd client/ && yarn && yarn dev
```

Server-side

```bash
deno run --unstable --allow-env --allow-read --allow-write --allow-net ./server/app.ts
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
  - [ ] Heroicons
  - [ ] Phosphoricons

* [ ] Create svg component for React/Vue/Angular, i.e with @svgr/core, @vue-svgicon, @svg-to-ts
  - [ ] Add tabs to pick framework

- [ ] Remove svg parent tag to have more probabilities to find a icon

* [ ] Run preloadData fn on a cron every week

- [ ] Improve and share types and helpers between client/server

* [ ] UI/UX/Writing review

* [ ] Backend and Frontend external code review

- [ ] Beta testers list + exclusive list

* [ ] Publish in developer/design/utilities list

- [ ] Publish in ProductHunt

* [ ] Input SVG by URL or code

- [ ] Same app but as a chrome extension

* [ ] Support using bitmaps

## DONE

- [x] Add Plausible analytics

* [x] Try Preactjs on Next.js build

- [x] Refactorize to download icons instead of having them locally
      [x] Download icons
      [x] Save it to upstash
      [x] Endpoint reads from upstash redis

* [x] Reach 100/100 in Audits

- [x] Buy whichiconisthat.com in NameCheap

* [x] Deploy client to Vercel

- [x] Deploy server to Deno deploy

* [x] Add bottom icon to open footer with Slide transition
  - [x] Display supported icons
  - [x] Display GitHub / Twitter
  - [x] Display code snippets for react/angular/vue-icons

## Built using

- [Next.js](https://nextjs.org) and [Deno](https://deno.land)
- [Vercel](https://vercel.com) for client deployment
- [Heroku](https://www.heroku.com) for server deployment
- [Upstash](https://upstash.com) for serverless redis
- [Plausible](https://plausible.io) for analytics
