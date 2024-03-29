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

1. Requirements (run only once)

Install node latest LTS, and Deno v1.16.3

```
brew install node deno
deno install -qAf --unstable https://deno.land/x/denon/denon.ts
```

2. Request environment variables needed for each folder, client and server

3. Client-side

```bash
cd client/ && yarn && yarn dev
```

4. Server-side

```bash
cd server/ && denon run --unstable --allow-run --allow-env --allow-read --allow-write --allow-net app.ts
```

## Heroku

- Important for Vercel Build

We need to scale WIIT web Dyno to 20 dynos in order to execute a build, since we've more that 5000+ requests to the API that end ups breaking it

- Buildpacks

  - [heroku/deno](https://github.com/chibat/heroku-buildpack-deno.git)
  - [heroku/nodejs](https://elements.heroku.com/buildpacks/heroku/heroku-buildpack-nodejs)

* Populate Heroku DB

  1. Enter postgres terminal

  ```bash
  docker exec -it postgres12 bash
  ```

  1. Create dump from local database

  ```bash
  PGPASSWORD=[PG_PASSWORD] pg_dump -Fc --no-acl --no-owner -h localhost -U [PG_USER] wiit > mydb.dump
  ```

  2. Copy dump to local machine

  ```bash
  docker cp postgres12:/mydb.dump [YOUR_PATH]
  ```

  3. Upload it to the cloud or through [web](https://transfer.sh)

  ```bash
    curl --upload-file ./mydb.dump https://transfer.sh/mydb.dump
  ```

  4. Upload new dump into Heroku DB

  ```bash
  heroku pg:backups:restore [BUMP_URL] DATABASE_URL -a which-icon-is-that --confirm which-icon-is-that
  ```

* Logs

  ```bash
  heroku logs -t -a which-icon-is-that
  ```

## Built using

- [Deno](https://deno.land) server runtime
- [Next.js](https://nextjs.org) client framework
- [Vercel](https://vercel.com) for client deployment
- [Heroku](https://www.heroku.com) for server deployment
- [Plausible](https://plausible.io) for analytics

## Invest

We're currently having a total investment of ~130usd/month for backend/frontend deploy services.

- [Vercel - PRO](https://www.heroku.com/pricing#containers) - 20usd/month
- [Heroku Dyno - Hobby](https://www.heroku.com/pricing#containers) - 7usd/month
- [Heroku Postgres - Standard 2X - 2 Dynos](https://elements.heroku.com/addons/heroku-postgresql) - 100usd/month

## Links

- [Web](https://www.whichiconisthat.com)
- [Twitter](https://twitter.com/whichiconisthat)
- [Discord](https://discord.gg/xTpegNF9bj)
- [GitHub](https://github.com/lndgalante/which-icon-is-that)
- [Plausible](https://plausible.io/whichiconisthat.com)
