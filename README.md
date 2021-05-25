<div align="center">
  <h1>Which Icon Is That? 🤔</h1>
</div>

## Features

🔎 Find your icon name and icon pack only by dragging and dropping your SVG

🆕 Icon packs always updated with the latest versions

📦 All popular icon packs supported (i.e feather-icons, font-awesome)

📎 Code snippets to import the icon library for your framework (i.e react-icons, vue-feather)

🩳 Easy to remember short URL [wiit.io](https://wiit.io)

✨ Delightful experience + damn fast!

## Development

- Requirements (run only once)

  ```
  brew install node deno
  deno install -qAf --unstable https://deno.land/x/denon/denon.ts
  ```

* Client-side

  ```bash
  cd client/ && yarn && yarn dev
  ```

- Server-side

  ```bash
  cd server/ && denon run --unstable --allow-run --allow-env --allow-read --allow-write --allow-net app.ts
  ```

- Populate Heroku DB (Optionally)

  ```bash
  PGPASSWORD=[PG_PASSWORD] pg_dump -Fc --no-acl --no-owner -h localhost -U [PG_USER] whichiconisthat > mydb.dump
  ```

  ```bash
  heroku pg:backups:restore [BUMP_URL] DATABASE_URL -a which-icon-is-that --confirm which-icon-is-that
  ```

## Built using

- [Deno](https://deno.land) server runtime
- [Next.js](https://nextjs.org) client framework
- [Vercel](https://vercel.com) for client deployment
- [Heroku](https://www.heroku.com) for server deployment
- [Fathom](https://usefathom.com) for analytics

## Links

- [Twitter](https://twitter.com/whichiconisthat)
- [Website](https://www.whichiconisthat.com)
- [Repository](https://github.com/lndgalante/which-icon-is-that)
