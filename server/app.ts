import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';
import { Application } from 'https://deno.land/x/oak/mod.ts';

// lib
import { isDevelopment } from './lib/env.ts';
// import { saveIconsInDB } from './lib/icons.ts';

// routes
import { router } from './routes.ts';

// initial load
// await saveIconsInDB();

// env
const origin = isDevelopment() ? 'http://localhost:3002' : 'https://www.whichiconisthat.com';

// port
const DEFAULT_PORT = 8000;
const argPort = parse(Deno.args).port;

// app
const app = new Application();

// add middlewares
app.use(oakCors({ origin }));
app.use(router.routes());
app.use(router.allowedMethods());

// serve our app
await app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT });
