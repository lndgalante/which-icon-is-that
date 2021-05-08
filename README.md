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

Release date: Tuesday 1, June

## TODO

- [ ] Add icon packs:

  - [x] Heroicons
  - [x] Ant Design Icons
  - [x] BoxIcons
  - [ ] Devicons
  - [ ] Flat Color Icons
  - [ ] Game Icons
  - [ ] GiHub Octicons icons
  - [ ] Grommet-icons
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
  - [ ] Phosphoricons

* [ ] Run preloadData fn on a cron every week

- [ ] Improve and share types and helpers between client/server

* [ ] UI/UX/Writing review

- [ ] Backend and Frontend external code review

* [ ] Publish in developer/design/utilities list

- [ ] Publish in ProductHunt

* [ ] Publish in AwesomeSVGs/AwesomeIcons

- [ ] Add E2E tests to run all user flows

* [ ] Prefetch icon page when hash is created

* [ ] Fix react-icons imports that doesn't work properly

- [ ] Detect image through computer vision

* [ ] Buy wiit.io to redirect to whichiconisthat.com

- [ ] Add web component CDN to unpkg + template

* [ ] Split Figma links in Community and Plugins

- [ ] Pro version:
  - [ ] Support for Pro icons
  - [ ] Email support 24/7

* [ ] Add [Swagger](https://github.com/asad-mlbd/deno-api-starter-oak) documentation for Deno API

- [ ] Add Docker support to get up and running client and server quickly

* [ ] Add icon stats, found N times

- [ ] Add package stats, total downloads, total stars, total icons

**Users Feedback**

- [ ] Landing like https://www.remove.bg

* [ ] Add Why and How to the site

- [ ] Add example icon to try it on the fly

* [ ] Display optimized SVG using SVGO

- [ ] Onboarding walkthrough video

* [ ] Add responsive support

- [ ] Display icons in several sizes 100px, 60px, 48px, 24px, 16px

* [ ] Display icons in a playground to change the color and the background color

* [ ] Support using bitmaps

- [ ] Display similar icons i.e if I drop a feather alert, show me the alert for the other packages

* [ ] Display supported icons directly without being hidden

- [ ] Add code to install npm package, to use from Skypack/Unpkg

* [ ] Same app but as a VSCode extension

- [ ] Same app but as a Chrome extension

## DONE

**Users Feedback**

- [x] Improve error message when icon is not found

* [x] Add links to Figma/Sketch

- [x] Change back arrow for center button to find again

* [x] Display snippets directly without button to open it

- [x] Input SVG by URL or code

---

- [] Improve URL from /:hash to /:packName/:iconType/:packId

* [x] Create svg component for Vue with @vue-svgicon

- [x] Create svg component for HTML with @svgr/core

* [x] Create svg component for React with @svgr/core

- [x] Check if we are handling icon packs with solid and outline versions

* [x] Display if icon supports solid or outline version

- [x] Migrate DB from Redis to PostgreSQL

* [x] Add Plausible analytics

- [x] Try Preactjs on Next.js build

* [x] Refactorize to download icons instead of having them locally
      [x] Download icons
      [x] Save it to upstash
      [x] Endpoint reads from upstash redis

- [x] Reach 100/100 in Audits

* [x] Buy whichiconisthat.com in NameCheap

- [x] Deploy client to Vercel

* [x] Deploy server to Deno deploy

- [x] Add bottom icon to open footer with Slide transition
  - [x] Display supported icons
  - [x] Display GitHub / Twitter
  - [x] Display code snippets for react/angular/vue-icons

* [x] Remove svg parent tag to have more probabilities to find a icon

- [x] Beta testers list + exclusive list

## Built using

- [Next.js](https://nextjs.org) and [Deno](https://deno.land)
- [Vercel](https://vercel.com) for client deployment
- [Heroku](https://www.heroku.com) for server deployment
- [Plausible](https://plausible.io) for analytics
