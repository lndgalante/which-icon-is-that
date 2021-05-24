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

Run only once:

```
brew install deno
deno install -qAf --unstable https://deno.land/x/denon/denon.ts
```

```bash
cd server/ && denon run --unstable --allow-env --allow-read --allow-write --allow-net app.ts
```

## Built using

- [Next.js](https://nextjs.org) and [Deno](https://deno.land)
- [Vercel](https://vercel.com) for client deployment
- [Heroku](https://www.heroku.com) for server deployment
- [Plausible](https://plausible.io) for analytics
